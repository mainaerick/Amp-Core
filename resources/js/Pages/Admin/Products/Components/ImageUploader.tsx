
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"

type ImageUploaderProps = {
    value?: (File | string)[] // can be File objects or existing URLs
    onChange?: (files: (File | string)[]) => void
    multiple?: boolean
    maxFiles?: number
}

export function ImageUploader({value = [],
                                  onChange,
                                  multiple = true,
                                  maxFiles,
                              }: ImageUploaderProps) {
    const [images, setImages] = useState<(File | string)[]>([])

    useEffect(() => {
        setImages(value as any)
    }, [value])

    const addFiles = (files: FileList) => {
        let newFiles = Array.from(files)

        if (!multiple) {
            newFiles = [newFiles[0]]
        }

        if (maxFiles) {
            newFiles = newFiles.slice(0, maxFiles - images.length)
        }

        const updated = [...images, ...newFiles]
        setImages(updated)
        onChange?.(updated)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addFiles(e.target.files)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (e.dataTransfer.files) {
            addFiles(e.dataTransfer.files)
        }
    }

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index)
        setImages(updated)

        onChange?.(updated)
    }

    const renderPreview = (img: File | string, i: number) => {
        const src = typeof img === "string" ? img : URL.createObjectURL(img)
        return (
            <div key={i} className="relative group">
                <div className="overflow-hidden rounded-md border aspect-square">
                    <img
                        src={src}
                        alt={`Uploaded image ${i + 1}`}
                        className="object-cover w-full h-full"
                    />
                </div>
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(i)}
                >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove image</span>
                </Button>
                {i === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Thumbnail
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Dropzone */}
            <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Drag and drop images here</h3>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                    <div className="mt-4">
                        <Button variant="outline" className="relative">
                            <input
                                type="file"
                                multiple={multiple}
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            Browse Files
                        </Button>
                    </div>
                </div>
            </div>

            {/* Previews */}
            {images.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Uploaded Images</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {images.map((img, i) => renderPreview(img, i))}
                        {(!maxFiles || images.length < maxFiles) && (
                            <div className="flex items-center justify-center border border-dashed rounded-md aspect-square">
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                    <span className="mt-2 text-sm text-muted-foreground">Add</span>
                                    <input
                                        type="file"
                                        multiple={multiple}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
