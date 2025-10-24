import { Phone, Mail, MessageSquare, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@inertiajs/react"

interface WhereToBuyProps {
    productName?: string
}

export default function WhereToBuy({ productName }: WhereToBuyProps) {
    const whatsappNumber = "1234567890"
    const email = "sales@soundwaveaudio.com"

    // Encode safely for URLs
    const encodedProduct = encodeURIComponent(productName || "your product")
    const emailSubject = encodeURIComponent(`Product Inquiry - ${productName || "Soundwave Audio"}`)
    const emailBody = encodeURIComponent(`Hello Soundwave Audio Team,\n\nI'm interested in ${productName || "your products"}.\nCould you please share more details?\n\nThanks!`)

    const whatsappMessage = encodeURIComponent(
        `Hello Soundwave Audio Team, I'm interested in ${productName || "your products"}.`
    )

    return (
        <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Where to Buy</h3>

                <div className="space-y-3">
                    {/* Phone */}
                    <Button asChild variant="outline" className="w-full justify-start">
                        <a href={`tel:+${whatsappNumber}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call: (+{whatsappNumber})
                        </a>
                    </Button>

                    {/* WhatsApp */}
                    <Button asChild variant="outline" className="w-full justify-start">
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            WhatsApp: (+{whatsappNumber})
                        </a>
                    </Button>

                    {/* Email */}
                    <Button asChild variant="outline" className="w-full justify-start">
                        <a
                            href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Email: {email}
                        </a>
                    </Button>

                    {/* Dealers Page */}
                    <Button asChild className="w-full justify-start">
                        <Link href="/where-to-buy">
                            <Store className="mr-2 h-4 w-4" />
                            Find Authorized Dealers
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
