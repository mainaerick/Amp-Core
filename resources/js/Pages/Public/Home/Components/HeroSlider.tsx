import React from "react"
import { Carousel, Image, Button, Row, Col } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Link } from "@inertiajs/react"

const slides = [
    {
        id: 1,
        title: "Experience Sound Perfection",
        description: "Discover our new line of premium speakers designed for audiophiles",
        image: "https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZmVyfGVufDB8fDB8fHww",
        link: "/categories/speakers",
        buttonText: "Shop Speakers",
    },
    {
        id: 2,
        title: "Feel the Bass",
        description: "Powerful subwoofers that deliver deep, accurate bass response",
        image: "https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZmVyfGVufDB8fDB8fHww",
        link: "/categories/subwoofers",
        buttonText: "Shop Subwoofers",
    },
    {
        id: 3,
        title: "Drive with Premium Sound",
        description: "Transform your vehicle with our car audio solutions",
        image: "https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZmVyfGVufDB8fDB8fHww",
        link: "/categories/car-audio",
        buttonText: "Explore Car Audio",
    },
]

const contentStyle: React.CSSProperties = {
    height: "700px",
    position: "relative",
    color: "#fff",
    overflow: "hidden",
}

const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
    zIndex: 1,
}

const HeroSlider: React.FC = () => {
    return (

            <Carousel autoplay autoplaySpeed={3000} dots>
                {slides.map((slide) => (
                    <div key={slide.id}>
                        <div style={contentStyle}>
                            {/* ✅ Wrapper fills parent */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    preview={false}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>

                            <div style={overlayStyle} />

                            <Row
                                className={"container mx-auto px-4 items-center justify-between"}
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                    height: "100%",
                                }}
                            >
                                <Col xs={24} md={12}>
                                    <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "#fff" }}>{slide.title}</h1>
                                    <p style={{
                                        fontSize: "1.25rem",
                                        color: "#ddd",
                                        marginBottom: 24
                                    }}>{slide.description}</p>
                                    <Link href={slide.link}>
                                        <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                                            {slide.buttonText}
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    </div>

                ))}
            </Carousel>


    )
}

export default HeroSlider
