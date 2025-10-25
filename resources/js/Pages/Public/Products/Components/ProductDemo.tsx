import React from "react";

interface ProductDemoProps {
    videoUrl: string;
    title?: string;
    description?: string;
    responsive?: boolean;
    /** For untrusted video sources, adds sandbox restrictions */
    sandbox?: boolean;
    /** Heading level for proper document hierarchy (default: h2) */
    headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
}

export default function ProductDemo({
                                        videoUrl,
                                        title = "Product Demo",
                                        description,
                                        responsive = true,
                                        sandbox = false,
                                        headingLevel = 'h2',
                                    }: ProductDemoProps) {
    // Validate URL format
    const isValidUrl = /^https?:\/\/.+/.test(videoUrl);

    if (!isValidUrl) {
        return (
            <div
                className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4 text-center"
                role="alert"
            >
                <strong>Error:</strong> Invalid or missing video URL.
            </div>
        );
    }

    // Dynamic heading component based on level
    const Heading = headingLevel;

    // Build sandbox attribute value if needed
    const sandboxAttr = sandbox
        ? "allow-scripts allow-same-origin allow-presentation"
        : undefined;

    return (
        <section
            className="mb-12 mt-16"
            aria-labelledby="product-demo-title"
        >
            <div className="text-center mb-6">
                <Heading
                    id="product-demo-title"
                    className="flex text-2xl font-bold text-gray-800 mb-2"
                >
                    {title}
                </Heading>
                {description && (
                    <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                        {description}
                    </p>
                )}
            </div>

            {/* Full width video container */}
            <div
                className={`
                    ${responsive ? "aspect-video" : ""}
                    w-full rounded-lg overflow-hidden
                    shadow-lg bg-gray-100
                `}
            >
                <iframe
                    src={videoUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="w-full h-full border-0"
                    loading="lazy"
                    sandbox={sandboxAttr}
                />
            </div>
        </section>
    );
}
