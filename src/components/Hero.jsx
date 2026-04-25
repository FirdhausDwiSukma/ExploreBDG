import { useEffect, useRef, useState } from 'react'
import { IconPin } from './icons'

// Stable image paths — defined outside component to avoid re-creation
const IMAGE_PATHS = [
    new URL('../assets/images/optimized/bdg1.jpg', import.meta.url).href,
    new URL('../assets/images/optimized/bdg2.jpg', import.meta.url).href,
    new URL('../assets/images/optimized/bdg3.jpg', import.meta.url).href,
]

const SLIDE_INTERVAL_MS = 4000
const SLIDE_TRANSITION_MS = 300

function Hero() {
    const [current, setCurrent] = useState(0)
    // loadedImages[index] = true once that image has finished loading
    const [loadedImages, setLoadedImages] = useState({})
    const loadingRef = useRef({}) // track in-flight loads to avoid duplicates

    // Preload an image by index
    useEffect(() => {
        const preload = (index) => {
            if (loadedImages[index] || loadingRef.current[index]) return
            loadingRef.current[index] = true
            const img = new Image()
            img.onload = () => {
                setLoadedImages(prev => ({ ...prev, [index]: true }))
                loadingRef.current[index] = false
            }
            img.src = IMAGE_PATHS[index]
        }

        // Load current slide + preload next
        preload(current)
        preload((current + 1) % IMAGE_PATHS.length)
    }, [current]) // eslint-disable-line react-hooks/exhaustive-deps
    // Note: loadedImages intentionally excluded — we only want to re-run when slide changes

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % IMAGE_PATHS.length)
            }, SLIDE_TRANSITION_MS)
        }, SLIDE_INTERVAL_MS)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="hero">
            {IMAGE_PATHS.map((src, index) => (
                loadedImages[index] && (
                    <img
                        key={src}
                        src={src}
                        alt={`Pemandangan Bandung ${index + 1}`}
                        className={`hero-image ${index === current ? 'loaded' : ''}`}
                    />
                )
            ))}
            <div className="hero-overlay">
                <div className="hero-glass">
                    {/* Left column */}
                    <div className="hero-left">
                        <h1>Explore Bandung</h1>
                        <p>
                            Jelajahi keindahan wisata, kuliner legendaris,
                            dan tempat nongkrong terbaik di Kota Bandung
                        </p>

                        {/* Location label — mobile only */}
                        <div className="hero-location-mobile">
                            <IconPin size={16} />
                            <span>Bandung, Jawa Barat</span>
                        </div>

                        <div className="hero-actions">
                            <button className="btn-primary">Wisata</button>
                            <button className="btn-secondary">Kuliner</button>
                            <button className="btn-secondary">Cafe</button>
                        </div>
                    </div>

                    {/* Right column — desktop only */}
                    <div className="hero-right">
                        <IconPin size={20} />
                        <span>Bandung, Jawa Barat</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
