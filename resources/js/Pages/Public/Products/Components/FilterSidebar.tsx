
import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getCategoryFilters } from '@/Pages/Public/lib/filters';

interface FilterSidebarProps {
    category: string
}

export default function FilterSidebar({ category }: FilterSidebarProps) {
    // const router = useRouter()
    // const searchParams = useSearchParams()
    const filterGroups = getCategoryFilters(category)

    const [priceRange, setPriceRange] = useState([0, 2000])

    const handleReset = () => {
        // router.push(`/${category}`)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                    Reset
                </Button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <Slider
                        defaultValue={[0, 2000]}
                        max={2000}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}</span>
                    </div>
                </div>

                <Accordion type="multiple" defaultValue={filterGroups.map((group) => group.id)} className="space-y-4">
                    {filterGroups.map((filterGroup) => (
                        <AccordionItem key={filterGroup.id} value={filterGroup.id} className="border-b-0">
                            <AccordionTrigger className="text-sm font-medium py-2 px-4 bg-secondary rounded-md hover:bg-secondary/80">
                                {filterGroup.name}
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 pb-2 px-1">
                                {filterGroup.type === "checkbox" && (
                                    <div className="space-y-2">
                                        {filterGroup.options.map((option) => (
                                            <div key={option.value} className="flex items-center space-x-2">
                                                <Checkbox id={`${filterGroup.id}-${option.value}`} />
                                                <Label
                                                    htmlFor={`${filterGroup.id}-${option.value}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {filterGroup.type === "radio" && (
                                    <RadioGroup defaultValue={filterGroup.options[0]?.value}>
                                        <div className="space-y-2">
                                            {filterGroup.options.map((option) => (
                                                <div key={option.value} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={option.value} id={`${filterGroup.id}-${option.value}`} />
                                                    <Label
                                                        htmlFor={`${filterGroup.id}-${option.value}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {option.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">Apply Filters</Button>
        </div>
    )
}
