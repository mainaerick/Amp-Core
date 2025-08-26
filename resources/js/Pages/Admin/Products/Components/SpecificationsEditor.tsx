"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
type Specification = {
    id: string
    name: string
    value: string
}

type Props = {
    specifications: Specification[]
    onChange: (specs: Specification[]) => void
}

export function SpecificationsEditor({ specifications, onChange }: Props) {
    const addSpecification = () => {
        const newId = `spec-${specifications.length + 1}-${Date.now()}`
        onChange([...specifications, { id: newId, name: "", value: "" }])
    }

    const removeSpecification = (id: string) => {
        onChange(specifications.filter((spec) => spec.id !== id))
    }

    const updateSpecification = (id: string, field: "name" | "value", value: string) => {
        onChange(specifications.map((spec) => (spec.id === id ? { ...spec, [field]: value } : spec)))
    }

    const handleDragEnd = (result: DropResult|any) => {
        if (!result.destination) return
        const items = Array.from(specifications)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        onChange(items)
    }

    return (
        <div className="space-y-4">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="specifications">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {specifications.map((spec, index) => (
                                <Draggable key={spec.id} draggableId={spec.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="flex items-center gap-4 p-4 border rounded-md"
                                        >
                                            <div {...provided.dragHandleProps} className="cursor-grab">
                                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 flex-1 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label>Name</Label>
                                                    <Input
                                                        value={spec.name}
                                                        onChange={(e) => updateSpecification(spec.id, "name", e.target.value)}
                                                        placeholder="e.g. Power Output"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Value</Label>
                                                    <Input
                                                        value={spec.value}
                                                        onChange={(e) => updateSpecification(spec.id, "value", e.target.value)}
                                                        placeholder="e.g. 100W RMS"
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeSpecification(spec.id)}
                                                className="text-destructive"
                                            >
                                                <Trash className="h-4 w-4" />
                                                <span className="sr-only">Remove specification</span>
                                            </Button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <Button type="button" variant="outline" onClick={addSpecification} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Specification
            </Button>
        </div>
    )
}
