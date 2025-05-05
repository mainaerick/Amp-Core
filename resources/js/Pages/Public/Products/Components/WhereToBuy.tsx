import { Phone, Mail, MessageSquare, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from '@inertiajs/react';

export default function WhereToBuy() {
    return (
        <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Where to Buy</h3>
                <div className="space-y-3">
                    <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="tel:+1234567890">
                            <Phone className="mr-2 h-4 w-4" />
                            Call: (123) 456-7890
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="https://wa.me/1234567890">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            WhatsApp: (123) 456-7890
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                        <Link href="mailto:sales@soundwaveaudio.com">
                            <Mail className="mr-2 h-4 w-4" />
                            Email: sales@soundwaveaudio.com
                        </Link>
                    </Button>
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
