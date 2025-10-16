import { useState, useEffect } from "react"
import { Search, Moon, Sun } from "lucide-react"
import { Button, Drawer, Input, Grid } from "antd"
import { Link, usePage } from '@inertiajs/react';

const { useBreakpoint } = Grid

export default function SiteHeader() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const screens = useBreakpoint()
    const { app } = usePage().props as any;
    const navLinks = [
        { label: "Speakers", href: "/categories/speakers" },
        { label: "Subwoofers", href: "/categories/subwoofers" },
        { label: "Amplifiers", href: "/categories/amplifiers" },
        { label: "Accessories", href: "/categories/accessories" },
        { label: "Car Audio & Video", href: "/categories/car-audio" },
    ]

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newMode = !isDark
        setIsDark(newMode)
        document.documentElement.classList.toggle("dark", newMode)
        localStorage.setItem("theme", newMode ? "dark" : "light")
    }

    // Load persisted theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark") {
            setIsDark(true)
            document.documentElement.classList.add("dark")
        }
    }, [])

    useEffect(() => {
        console.log(app)
    }, [app]);
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-black/80 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-bold text-xl text-indigo-600 dark:text-indigo-400 tracking-tight"
                    aria-label="Home"
                >
                    {app.name}
                </Link>

                {/* Desktop Navigation */}
                {screens.md && (
                    <nav className="flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    {/* Search Button */}
                    <Button
                        type="text"
                        className="!text-gray-700 dark:!text-gray-200 hover:!text-indigo-600 dark:hover:!text-indigo-400"
                        icon={<Search className="h-5 w-5" />}
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Search products"
                    />

                    {/* Dark Mode Toggle */}
                    <Button
                        type="text"
                        className="!text-gray-700 dark:!text-gray-200 hover:!text-indigo-600 dark:hover:!text-indigo-400"
                        icon={
                            isDark ? (
                                <Sun className="h-5 w-5 text-yellow-400" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )
                        }
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                    />
                </div>
            </div>

            {/* Search Drawer */}
            <Drawer
                placement="top"
                closable={false}
                onClose={() => setIsSearchOpen(false)}
                open={isSearchOpen}
                height={100}
                bodyStyle={{
                    backgroundColor: isDark ? "#0a0a0a" : "#fff",
                    paddingTop: "1rem",
                }}
            >
                <div className="mx-auto max-w-xl">
                    <Input.Search
                        placeholder="Search for products..."
                        size="large"
                        enterButton
                        autoFocus
                        onSearch={() => setIsSearchOpen(false)}
                        className="dark:[&_input]:bg-gray-900 dark:[&_input]:text-gray-100 dark:[&_input]:border-gray-700"
                    />
                </div>
            </Drawer>
        </header>
    )
}
