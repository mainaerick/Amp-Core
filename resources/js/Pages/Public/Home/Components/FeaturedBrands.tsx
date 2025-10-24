import { Card, Image } from 'antd'

type Props = { brands: any[] }

export default function FeaturedBrands({ brands }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
                <Card
                    key={brand.id}
                    className="flex items-center justify-center bg-gray-100 h-28 text-center shadow-none"
                >
                    <div className="flex items-center justify-center h-28 w-full p-2">
                        <img
                            src={
                                brand.logo && brand.logo.includes("brand_images")
                                    ? `/${brand.logo}`
                                    : brand.logo
                                        ? `/storage/${brand.logo}`
                                        : "/placeholder.svg"
                            }
                            alt={brand.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                </Card>


            ))}
        </div>
    )
}
