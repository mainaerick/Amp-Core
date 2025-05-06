"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"

export function ImageUploader() {
    const [images, setImages] = useState<string[]>([])
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newImages: string[] = []

            Array.from(e.dataTransfer.files).forEach((file) => {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                        if (event.target && typeof event.target.result === "string") {
                            newImages.push(event.target.result)
                            if (newImages.length === e.dataTransfer.files.length) {
                                setImages((prev) => [...prev, ...newImages])
                            }
                        }
                    }
                    reader.readAsDataURL(file)
                }
            })
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages: string[] = []

            Array.from(e.target.files).forEach((file) => {
                const reader = new FileReader()
                reader.onload = (event) => {
                    if (event.target && typeof event.target.result === "string") {
                        newImages.push(event.target.result)
                        if (newImages.length === e.target.files!.length) {
                            setImages((prev) => [...prev, ...newImages])
                        }
                    }
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-4">
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging ? "border-primary bg-primary/10" : "border-border"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Drag and drop your images here</h3>
                    <p className="text-sm text-muted-foreground">or click the button below to browse files</p>
                    <div className="mt-4">
                        <Button variant="outline" className="relative">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            Browse Files
                        </Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Supported formats: JPEG, PNG, GIF, WebP</p>
                </div>
            </div>

            {images.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Uploaded Images</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <div className="overflow-hidden rounded-md border aspect-square">
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Uploaded image ${index + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">Remove image</span>
                                </Button>
                                {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                        Thumbnail
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="flex items-center justify-center border border-dashed rounded-md aspect-square">
                            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                <span className="mt-2 text-sm text-muted-foreground">Add Image</span>
                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
