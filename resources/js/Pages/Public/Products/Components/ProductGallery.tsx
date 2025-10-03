
import { useState } from "react"
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
    images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [zoomOpen, setZoomOpen] = useState(false)

    const handleThumbnailClick = (image: string, index: number) => {
        setMainImage(image)
        setCurrentIndex(index)
    }

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % images.length
        setMainImage(images[newIndex])
        setCurrentIndex(newIndex)
    }

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length
        setMainImage(images[newIndex])
        setCurrentIndex(newIndex)
    }

    return (
        <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border group">
                <img
                    src={mainImage || "/placeholder.svg"}
                    alt="Product image"
                    style={{height:600,width:600}}
                    className="object-cover transition-transform group-hover:scale-105"

                />
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setZoomOpen(true)}
                >
                    <Maximize2 className="h-4 w-4" />
                    <span className="sr-only">Zoom image</span>
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={cn(
                            "relative aspect-square overflow-hidden rounded-md border transition-all",
                            mainImage === image ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50",
                        )}
                        onClick={() => handleThumbnailClick(image, index)}
                    >
                        <img
                            src={image || "/placeholder.svg"}
                            alt={`Product thumbnail ${index + 1}`}

                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
                <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur">
                    <div className="relative aspect-square w-full">
                        <img
                            src={mainImage || "/placeholder.svg"}
                            alt="Product image"
                            className="object-contain w-full h-full"
                        />
                        {/*<Image src={mainImage || "/placeholder.svg"} alt="Product image" fill className="object-contain" priority />*/}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-background/80"
                            onClick={(e) => {
                                e.stopPropagation()
                                prevImage()
                            }}
                        >
                            <ChevronLeft className="h-6 w-6" />
                            <span className="sr-only">Previous image</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-background/80"
                            onClick={(e) => {
                                e.stopPropagation()
                                nextImage()
                            }}
                        >
                            <ChevronRight className="h-6 w-6" />
                            <span className="sr-only">Next image</span>
                        </Button>
                    </div>
                    <div className="p-4 flex justify-center">
                        <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className={cn(
                                        "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all",
                                        currentIndex === index ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50",
                                    )}
                                    onClick={() => handleThumbnailClick(image, index)}
                                >
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Product thumbnail ${index + 1}`}

                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
