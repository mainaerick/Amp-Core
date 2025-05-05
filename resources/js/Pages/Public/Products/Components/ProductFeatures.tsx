import { Check } from "lucide-react"

interface ProductFeaturesProps {
    features: string[]
}

export default function ProductFeatures({ features }: ProductFeaturesProps) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
