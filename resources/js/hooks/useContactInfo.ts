import { usePage } from '@inertiajs/react';

export function useContactInfo() {
    const { app } = usePage().props as any;
    const contact = app?.contact || {};

    const name = app?.name || 'Soundwave Audio';
    const description = app.description || '';
    const phone = contact.phone || '';
    const email = contact.email || '';
    const address = contact.address || '';
    const mapEmbed = app?.mapEmbed || '';
    const whatsappNumber = phone.replace(/\D/g, ''); // digits only

    // Pre-encoded messages
    const productMessage = (productName?: string) => {
        const product = encodeURIComponent(productName || 'your product');
        const text = `Hello ${name} Team, I'm interested in ${productName || 'your products'}.`;
        return {
            whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
            mail: `mailto:${email}?subject=${encodeURIComponent(`Product Inquiry - ${product}`)}&body=${encodeURIComponent(text)}`
        };
    };

    return { name,description, phone, email, address, mapEmbed, whatsappNumber, productMessage };
}
