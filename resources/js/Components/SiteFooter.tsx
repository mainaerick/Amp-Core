import SocialLinks from '@/Components/SocialLinks';
import { Link } from '@inertiajs/react';


export default function SiteFooter() {
    return (
        <footer className=" w-full border-t bg-background ">
            <div className="container py-10 mx-auto px-4">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">AMPCORE</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Your premier destination for high-quality audio equipment since 2005.
                        </p>
                        <SocialLinks />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Products</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/speakers" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Speakers
                                </Link>
                            </li>
                            <li>
                                <Link href="/subwoofers" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Subwoofers
                                </Link>
                            </li>
                            <li>
                                <Link href="/amplifiers" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Amplifiers
                                </Link>
                            </li>
                            <li>
                                <Link href="/accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Accessories
                                </Link>
                            </li>
                            <li>
                                <Link href="/car-audio" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Car Audio & Video
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/where-to-buy" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Where to Buy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <address className="not-italic text-sm text-muted-foreground space-y-2">
                            <p>123 Audio Street</p>
                            <p>Nairobi, Dandora Phase II</p>
                            <p>Kenya</p>
                            <p className="pt-2">
                                <Link href="tel:+1234567890" className="hover:text-foreground transition-colors">
                                    (123) 456-7890
                                </Link>
                            </p>
                            <p>
                                <Link href="mailto:info@soundwaveaudio.com" className="hover:text-foreground transition-colors">
                                    info@ampcore.com
                                </Link>
                            </p>
                        </address>
                    </div>
                </div>

                <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AMPCORE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
