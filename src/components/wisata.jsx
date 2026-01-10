import WisataCard from './WisataCard'
import places from '../data/places'
import { useState, useEffect } from 'react'

function WisataSection() {
    // Filter only wisata category
    const wisataPlaces = places.filter(place => place.category === 'wisata')

    // Carousel State
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsPerSlide, setItemsPerSlide] = useState(3)

    // Responsive items per slide
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerSlide(1)
            } else if (window.innerWidth < 1024) {
                setItemsPerSlide(2)
            } else {
                setItemsPerSlide(3)
            }
        }

        handleResize() // Init
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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

    // Calculate translation percentage
    // 100% / itemsPerSlide calculates the width of one item in percent
    // currentIndex * (100 / itemsPerSlide) calculates how much to shift
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
                    <div className="carousel-viewport">
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
                            /* Show dots only for possible starting positions if we want, or simplify */
                            <button
                                key={idx}
                                className={`dot ${currentIndex === idx ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(idx)}
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
