interface ProductDemoProps {
    videoUrl: string
}

export default function ProductDemo({ videoUrl }: ProductDemoProps) {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Product Demo</h2>
            <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden">
                <iframe
                    src={videoUrl}
                    title="Product Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        </div>
    )
}
