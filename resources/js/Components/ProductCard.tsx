import React from "react"
import { Card, Image, Tag, Button } from "antd"
import { Link } from "@inertiajs/react"
import { Product } from '@/Pages/Admin/Products/Core/_models';

const { Meta } = Card
interface Props{
    product:Product
}
const ProductCard = ({ product }:Props) => {
    return (
        <Card
            key={product.id}
            hoverable
            className="w-full"
            cover={
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        alt={product.name}
                        src={product.images[0] || "/placeholder.svg"}
                        preview={false}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        className="transition-transform duration-300 hover:scale-105"
                    />
                    {product.is_new && (
                        <Tag color="green" style={{ position: "absolute", top: 8, right: 8 }}>
                            New
                        </Tag>
                    )}
                </div>
            }
        >
            <Meta
                title={<h3 className="font-semibold text-lg">{product.name}</h3>}
                description={<p className="text-sm text-gray-500 capitalize">{product.category_id}</p>}
            />
            <div className="pt-4">
                <Link href={`/products/${product.slug}`}>
                    <Button block>View Details</Button>
                </Link>
            </div>
        </Card>
    )
}

export default ProductCard
