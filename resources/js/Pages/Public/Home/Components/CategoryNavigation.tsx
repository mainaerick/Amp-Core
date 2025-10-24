import { Link } from '@inertiajs/react'
import { Image } from 'antd'
import { ArrowRight } from 'lucide-react'

type Props = { categories: Category[] }

export default function CategoryNavigation({ categories }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group relative overflow-hidden rounded-lg h-60 flex items-end bg-black p-6 no-underline"
                >
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={category.logo ? category.logo.toString().includes("category_images")?`${category.logo}`:`/storage/${category.logo}` : "/placeholder.svg"}
                            alt={category.name}
                            preview={false}
                            className="object-cover opacity-70 transition-transform group-hover:scale-110 group-hover:opacity-50"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-200 mb-2">{category.description}</p>
                        <span className="inline-flex items-center text-sm font-medium text-primary">
              Explore
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
