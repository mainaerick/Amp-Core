import { Card,Image } from 'antd';


const brands = [
    {
        name: "AudioTech",
        logo: "/placeholder.svg?height=100&width=200",
    },
    {
        name: "SoundMaster",
        logo: "/placeholder.svg?height=100&width=200",
    },
    {
        name: "BassKing",
        logo: "/placeholder.svg?height=100&width=200",
    },
    {
        name: "PrecisionAudio",
        logo: "/placeholder.svg?height=100&width=200",
    },
    {
        name: "EliteSound",
        logo: "/placeholder.svg?height=100&width=200",
    },
    {
        name: "AcousticPro",
        logo: "/placeholder.svg?height=100&width=200",
    },
]

export default function FeaturedBrands() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
                <Card
                    className={"bg-gray-200"}
                    key={brand.name}
                    style={{
                        // background: "transparent",
                        boxShadow: "none",
                        padding: 0,
                        textAlign: "center",
                    }}

                >
                    <div style={{ position: "relative", width: "100%", height: "48px" }}>
                        <Image
                            src={brand.logo || "/placeholder.svg"}
                            alt={brand.name}
                            preview={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                position: "absolute",
                                inset: 0,
                            }}
                        />
                    </div>
                </Card>
    ))}
    </div>
)
}
