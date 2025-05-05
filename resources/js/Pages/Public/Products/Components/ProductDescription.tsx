import { useState } from "react"

import { Button } from "@/components/ui/button"

interface ProductDescriptionProps {
    description: string
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
    const [expanded, setExpanded] = useState(false)

    // If description is short, don't show the "Read More" button
    if (description.length < 300) {
        return (
            <div className="mb-6">
                <p className="text-muted-foreground">{description}</p>
            </div>
        )
    }

    return (
        <div className="mb-6">
            <div className={`text-muted-foreground ${!expanded ? "line-clamp-3" : ""}`}>{description}</div>
            <Button variant="link" className="px-0 mt-2" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Read Less" : "Read More"}
            </Button>
        </div>
    )
}
