// This is a mock product database
// In a real application, this would be fetched from a database or API

interface Product {
    id: number
    name: string
    slug: string
    category: string
    shortDescription: string
    description: string
    price?: number
    images: string[]
    specs: {
        name: string
        value: string
    }[]
    features?: string[]
    demoVideo?: string
    isNew?: boolean
}

const products: Product[] = [
    {
        id: 1,
        name: "Pro Series 500W Speaker",
        slug: "pro-series-500w-speaker",
        category: "speakers",
        shortDescription: "Professional-grade 500W speaker with exceptional clarity and powerful bass response.",
        description:
            "Professional-grade 500W speaker with exceptional clarity and powerful bass response. Perfect for live performances and large venues. The Pro Series 500W Speaker delivers crystal-clear sound across the entire frequency spectrum, with particular attention to vocal clarity and mid-range definition. Its robust construction ensures durability for touring and regular use, while the lightweight design makes transportation easy. The speaker features advanced thermal management to prevent overheating during extended use, and the proprietary waveguide design ensures even sound distribution throughout the venue.",
        price: 599,
        images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
        ],
        specs: [
            { name: "Power", value: "500W" },
            { name: "Frequency Response", value: "45Hz - 20kHz" },
            { name: "Sensitivity", value: "98dB" },
            { name: "Dimensions", value: '24" x 15" x 12"' },
            { name: "Weight", value: "35 lbs" },
            { name: "Inputs", value: 'XLR, 1/4" TRS' },
            { name: "Dispersion", value: "90° H x 60° V" },
            { name: "Enclosure Material", value: "Polypropylene" },
        ],
        features: [
            "500W of clean, powerful output for medium to large venues",
            "Advanced thermal management prevents overheating during extended use",
            "Proprietary waveguide design for even sound distribution",
            "Lightweight yet durable construction for easy transportation",
            "Multiple input options for versatile connectivity",
            "Built-in protection circuits to prevent damage",
        ],
        demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isNew: true,
    },
    {
        id: 2,
        name: "Studio Master Amplifier",
        slug: "studio-master-amplifier",
        category: "amplifiers",
        shortDescription: "High-fidelity amplifier designed for studio environments with minimal distortion.",
        description:
            "High-fidelity amplifier designed for studio environments. Delivers clean, transparent sound with minimal distortion. The Studio Master Amplifier is engineered for audio professionals who demand the utmost in sound quality and reliability. Its advanced circuitry provides exceptional headroom and dynamic range, ensuring your audio is reproduced with absolute fidelity. The amplifier features multiple protection circuits to safeguard both itself and connected speakers, including thermal protection, short circuit protection, and DC offset protection. The high-quality components used throughout the signal path ensure minimal noise and maximum transparency.",
        price: 899,
        images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
        ],
        specs: [
            { name: "Power Output", value: "200W per channel" },
            { name: "THD", value: "<0.01%" },
            { name: "Inputs", value: 'XLR, 1/4", RCA' },
            { name: "Dimensions", value: '19" x 3.5" x 15"' },
            { name: "Weight", value: "28 lbs" },
            { name: "Signal-to-Noise Ratio", value: ">100dB" },
            { name: "Frequency Response", value: "20Hz - 20kHz ±0.1dB" },
            { name: "Damping Factor", value: ">400" },
        ],
        features: [
            "200W per channel of clean, transparent power",
            "Exceptional headroom and dynamic range",
            "Multiple protection circuits for reliability",
            "High-quality components throughout the signal path",
            "Versatile connectivity options",
            "Rack-mountable design for studio integration",
        ],
        isNew: false,
    },
    {
        id: 3,
        name: "Deep Bass Subwoofer",
        slug: "deep-bass-subwoofer",
        category: "subwoofers",
        shortDescription: "Premium subwoofer with exceptional low-frequency response for home theaters and studios.",
        description:
            "Premium subwoofer with exceptional low-frequency response. Ideal for home theaters, recording studios, and audiophile listening rooms. The Deep Bass Subwoofer extends your system's bass response down to the lowest octaves, reproducing even the most demanding low-frequency effects with authority and precision. Its advanced DSP processing ensures tight, musical bass without bloat or overhang. The sealed cabinet design provides accurate transient response and prevents port noise, while the high-excursion driver handles extreme dynamics without distortion. Multiple connectivity options allow for easy integration with any audio system.",
        price: 749,
        images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
        ],
        specs: [
            { name: "Driver Size", value: '12"' },
            { name: "Power Handling", value: "500W RMS, 1000W Peak" },
            { name: "Frequency Response", value: "18Hz - 200Hz" },
            { name: "Enclosure Type", value: "Sealed" },
            { name: "Dimensions", value: '18" x 18" x 18"' },
            { name: "Weight", value: "55 lbs" },
            { name: "Inputs", value: "RCA, XLR, Speaker Level" },
            { name: "Phase Control", value: "0-180 degrees, variable" },
        ],
        features: [
            "12-inch high-excursion driver for deep, powerful bass",
            "Advanced DSP processing for tight, musical bass response",
            "Sealed cabinet design for accurate transient response",
            "Multiple connectivity options for easy system integration",
            "Variable phase control for optimal alignment with main speakers",
            "Auto-on function for energy efficiency",
        ],
        demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isNew: true,
    },
    {
        id: 4,
        name: "Premium XLR Cable Set",
        slug: "premium-xlr-cable-set",
        category: "accessories",
        shortDescription: "Professional-grade XLR cable set with gold-plated connectors for superior signal transfer.",
        description:
            "Professional-grade XLR cable set with gold-plated connectors for superior signal transfer and durability. These premium cables feature oxygen-free copper conductors for maximum signal integrity and minimal loss. The multi-layer shielding effectively rejects EMI and RFI interference, ensuring clean, noise-free audio transmission even in challenging environments with high electromagnetic interference. The robust strain relief and flexible jacket provide excellent durability while maintaining easy handling and coiling. Each cable undergoes individual testing to guarantee consistent performance and reliability.",
        price: 79,
        images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
        ],
        specs: [
            { name: "Length", value: "10ft, 15ft, 25ft" },
            { name: "Connector", value: "Gold-plated XLR" },
            { name: "Shielding", value: "Oxygen-free copper" },
            { name: "Jacket", value: "Braided nylon" },
            { name: "Conductor", value: "24 AWG OFC" },
            { name: "Capacitance", value: "<30pF/ft" },
            { name: "Resistance", value: "<0.05 Ohms/ft" },
            { name: "Warranty", value: "Lifetime" },
        ],
        features: [
            "Gold-plated connectors for superior signal transfer",
            "Oxygen-free copper conductors for maximum signal integrity",
            "Multi-layer shielding for rejection of EMI and RFI interference",
            "Robust strain relief for excellent durability",
            "Flexible jacket for easy handling and coiling",
            "Individually tested for consistent performance",
            "Lifetime warranty",
        ],
        isNew: false,
    },
    {
        id: 5,
        name: "Car Audio Amplifier",
        slug: "car-audio-amplifier",
        category: "car-audio",
        shortDescription: "High-performance car audio amplifier with advanced thermal management.",
        description:
            "High-performance car audio amplifier designed specifically for automotive environments. Features advanced thermal management, efficient power delivery, and compact design for flexible installation options. This amplifier delivers exceptional sound quality with minimal distortion, even at high volume levels. The Class D design ensures efficient power usage with minimal heat generation, while the robust protection circuits safeguard your audio system from potential damage due to overheating, short circuits, or voltage fluctuations. The amplifier's small footprint allows for installation in tight spaces without compromising performance.",
        price: 349,
        images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
        ],
        specs: [
            { name: "Power Output", value: "100W x 4 @ 4 ohms" },
            { name: "THD", value: "<0.05%" },
            { name: "Frequency Response", value: "10Hz - 30kHz" },
            { name: "Signal-to-Noise Ratio", value: ">95dB" },
            { name: "Dimensions", value: '10" x 7" x 2"' },
            { name: "Weight", value: "5.5 lbs" },
            { name: "Input Sensitivity", value: "0.2V - 6V" },
            { name: "Protection", value: "Thermal, Short Circuit, Overload" },
        ],
        features: [
            "Class D design for efficient power usage and minimal heat generation",
            "100W x 4 channels @ 4 ohms for powerful, clean sound",
            "Advanced thermal management for reliable operation",
            "Compact design for flexible installation options",
            "Robust protection circuits to safeguard your audio system",
            "Variable crossover for precise system tuning",
            "Bass boost for enhanced low-frequency response",
        ],
        demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isNew: true,
    },
    {
        id: 6,
        name: "Compact Monitor Speaker",
        slug: "compact-monitor-speaker",
        category: "speakers",
        shortDescription: "Compact studio monitor with flat frequency response for accurate mixing and mastering.",
        description:
            "Compact studio monitor with flat frequency response for accurate mixing and mastering. These monitors provide an honest representation of your audio material, allowing you to make informed decisions during the production process. The bi-amped design features separate amplifiers for the woofer and tweeter, ensuring optimal performance across the frequency spectrum. The custom-designed waveguide improves stereo imaging and expands the sweet spot, while the acoustic tuning controls allow you to adjust the response to suit your room acoustics. The robust construction minimizes cabinet resonance for cleaner sound reproduction.",
        price: 349,
        images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
        ],
        specs: [
            { name: "Power", value: "150W" },
            { name: "Frequency Response", value: "50Hz - 22kHz" },
            { name: "Inputs", value: 'XLR, 1/4", RCA' },
            { name: "Dimensions", value: '10" x 7" x 8"' },
            { name: "Weight", value: "12 lbs" },
            { name: "Woofer", value: '5.25"' },
            { name: "Tweeter", value: '1" silk dome' },
            { name: "Crossover", value: "2.5kHz" },
        ],
        features: [
            "Bi-amped design with separate amplifiers for woofer and tweeter",
            "Custom-designed waveguide for improved stereo imaging",
            "Acoustic tuning controls to adjust response for your room",
            "Robust construction to minimize cabinet resonance",
            "Multiple input options for versatile connectivity",
            "Compact size ideal for small studios and desktop setups",
        ],
        isNew: false,
    },
]

export function getAllProducts() {
    return products
}

export function getProductBySlug(slug: string) {
    return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(category: string, sortOption = "featured") {
    const filteredProducts = products.filter((product) => product.category === category)

    switch (sortOption) {
        case "name-asc":
            return filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        case "name-desc":
            return filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        case "newest":
            return filteredProducts.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        case "featured":
        default:
            return filteredProducts
    }
}

export function getFeaturedProducts(limit = 4) {
    return products.slice(0, limit)
}

export function getRelatedProducts(category: string, currentProductId: number, limit = 4) {
    return products.filter((product) => product.category === category && product.id !== currentProductId).slice(0, limit)
}
