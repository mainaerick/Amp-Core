import { useState } from "react"
import { Menu, X, Search, ShoppingBag, Moon } from 'lucide-react';
import { Button, Drawer, Input, Grid, Space } from "antd"
import { Link } from "@inertiajs/react"



const { useBreakpoint } = Grid

export default function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    const navLinks = [
        { label: "Speakers", href: "/speakers" },
        { label: "Subwoofers", href: "/subwoofers" },
        { label: "Amplifiers", href: "/amplifiers" },
        { label: "Accessories", href: "/accessories" },
        { label: "Car Audio & Video", href: "/car-audio" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-black/80 dark:border-gray-800 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-xl text-primary" onClick={closeMenu}>
                        AMPCORE
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="text"
                        icon={<Search className="h-5 w-5" />}
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Search"
                    />

                    <Button
                        type="text"
                        icon={<Moon className="h-5 w-5" />}
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Search"
                    />

                </div>
            </div>



            {/* Top Search Drawer */}
            <Drawer
                placement="top"
                closable={false}
                onClose={() => setIsSearchOpen(false)}
                open={isSearchOpen}
                height={100}
            >
                <div className="mx-auto max-w-xl pt-4">
                    <Input.Search
                        placeholder="Search for products..."
                        size="large"
                        enterButton
                        autoFocus
                        onSearch={() => setIsSearchOpen(false)}
                    />
                </div>
            </Drawer>
        </header>
    )
}
