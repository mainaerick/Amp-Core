import { Phone, Mail, MessageSquare, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { useContactInfo } from '@/hooks/useContactInfo';

interface WhereToBuyProps {
    productName?: string;
}

export default function WhereToBuy({ productName }: WhereToBuyProps) {
    const { name, description, phone, email, address, mapEmbed, productMessage } = useContactInfo();
    const messageLinks = productMessage(productName);

    return (
        <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardContent className="pt-6 space-y-3">
                <h3 className="text-lg font-semibold mb-4">Where to Buy</h3>

                {phone && (
                    <>
                        <Button asChild variant="outline" className="w-full justify-start">
                            <a href={`tel:${phone}`}>
                                <Phone className="mr-2 h-4 w-4" /> Call: {phone}
                            </a>
                        </Button>

                        <Button asChild variant="outline" className="w-full justify-start">
                            <a href={messageLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                                <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp: {phone}
                            </a>
                        </Button>
                    </>
                )}

                {email && (
                    <Button asChild variant="outline" className="w-full justify-start">
                        <a href={messageLinks.mail}>
                            <Mail className="mr-2 h-4 w-4" /> Email: {email}
                        </a>
                    </Button>
                )}

                {/*<Button asChild className="w-full justify-start">*/}
                {/*    <Store className="mr-2 h-4 w-4" /> Our Location*/}
                {/*</Button>*/}

                {address && (
                    <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                        <p className="font-medium">Address:</p>
                        <p>{address}</p>
                    </div>
                )}

                {mapEmbed && (
                    <iframe
                        src={mapEmbed}
                        style={{ border: 0 }}
                        width="100%" height="450" allowFullScreen loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                )}
            </CardContent>
        </Card>
    );
}
