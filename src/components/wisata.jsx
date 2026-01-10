import WisataCard from './WisataCard'
import places from '../data/places'
import { useState, useEffect, useRef } from 'react'

function WisataSection() {
    // Filter only wisata category
    const wisataPlaces = places.filter(place => place.category === 'wisata')

    // Carousel State
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsPerSlide, setItemsPerSlide] = useState(3)
    const [isMobile, setIsMobile] = useState(false)
    const viewportRef = useRef(null)
    const isScrollingRef = useRef(false)

    // Responsive items per slide
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 640) {
                setItemsPerSlide(1)
                setIsMobile(true)
            } else if (width < 1024) {
                setItemsPerSlide(2)
                setIsMobile(false)
            } else {
                setItemsPerSlide(3)
                setIsMobile(false)
            }
        }

        handleResize() // Init
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Handle scroll on mobile to update dots
    useEffect(() => {
        const viewport = viewportRef.current
        if (!viewport || !isMobile) return

        const handleScroll = () => {
            isScrollingRef.current = true
            
            const scrollLeft = viewport.scrollLeft
            const scrollWidth = viewport.scrollWidth
            const clientWidth = viewport.clientWidth
            const totalScrollWidth = scrollWidth - clientWidth
            
            // Calculate index based on scroll position ratio
            let newIndex = 0
            if (totalScrollWidth > 0) {
                const scrollRatio = scrollLeft / totalScrollWidth
                newIndex = Math.round(scrollRatio * (wisataPlaces.length - 1))
            }
            
            newIndex = Math.max(0, Math.min(newIndex, wisataPlaces.length - itemsPerSlide))
            setCurrentIndex(newIndex)

            // Clear flag after a delay
            setTimeout(() => {
                isScrollingRef.current = false
            }, 150)
        }

        viewport.addEventListener('scroll', handleScroll, { passive: true })
        return () => viewport.removeEventListener('scroll', handleScroll)
    }, [isMobile, wisataPlaces.length, itemsPerSlide])

    // Handle dots click to scroll on desktop only
    useEffect(() => {
        const viewport = viewportRef.current
        if (!viewport || isMobile) return  // Only for desktop, not mobile

        // For desktop, no scroll effect needed - carousel uses transform
        // Dots click is handled by onClick handler
    }, [isMobile])

    const nextSlide = () => {
        setCurrentIndex(prev =>
            prev + itemsPerSlide >= wisataPlaces.length ? 0 : prev + 1
        )
    }

    const prevSlide = () => {
        setCurrentIndex(prev =>
            prev === 0 ? Math.max(0, wisataPlaces.length - itemsPerSlide) : prev - 1
        )
    }

    // Calculate translation percentage for desktop
    const translateX = -(currentIndex * (100 / itemsPerSlide))

    return (
        <section className="wisata-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Destinasi Wisata</h2>
                    <p className="section-desc">
                        Jelajahi tempat-tempat menarik dan destinasi wisata terbaik di Kota Bandung
                    </p>
                </div>

                <div className="carousel-container">
                    <div className="carousel-viewport" ref={viewportRef}>
                        <div className="carousel-track" style={{
                            transform: `translateX(${translateX}%)`,
                            gridTemplateColumns: `repeat(${wisataPlaces.length}, ${100 / itemsPerSlide}%)`
                        }}>
                            {wisataPlaces.map(place => (
                                <div className="carousel-item" key={place.id} style={{ width: `${100 / itemsPerSlide}%` }}>
                                    <WisataCard
                                        name={place.name}
                                        location={place.location}
                                        rating={place.rating}
                                        image={place.image}
                                        onClick={() => alert(`Mengunjungi ${place.name}... (Fitur Detail Segera Hadir!)`)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        className="nav-button prev"
                        onClick={prevSlide}
                        aria-label="Previous slide"
                        disabled={currentIndex === 0}
                    >
                        ←
                    </button>
                    <button
                        className="nav-button next"
                        onClick={nextSlide}
                        aria-label="Next slide"
                        disabled={currentIndex + itemsPerSlide >= wisataPlaces.length}
                    >
                        →
                    </button>

                    {/* Dots Indicator */}
                    <div className="carousel-dots">
                        {Array.from({ length: Math.ceil((wisataPlaces.length - itemsPerSlide) + 1) }).map((_, idx) => (
                            <button
                                key={idx}
                                className={`dot ${currentIndex === idx ? 'active' : ''}`}
                                onClick={() => !isMobile && setCurrentIndex(idx)}
                                disabled={isMobile}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WisataSection
