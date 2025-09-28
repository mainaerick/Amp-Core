import { Card, Image } from 'antd'

type Props = { brands: any[] }

export default function FeaturedBrands({ brands }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
                <Card
                    key={brand.id}
                    className="bg-gray-200"
                    style={{ boxShadow: "none", textAlign: "center" }}
                >

                    <div style={{ width: "100%", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                            src={brand.logo ? `/storage/${brand.logo}` : "/placeholder.svg"}
                            alt={brand.name}
                            style={{ maxHeight: "48px", maxWidth: "100%", objectFit: "fill" }}
                        />
                    </div>
                </Card>
            ))}
        </div>
    )
}
