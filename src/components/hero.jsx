import { useEffect, useState, useRef } from 'react'

function Hero() {
    // Define image paths as strings (not imported yet)
    const imagePaths = [
        new URL('../assets/images/optimized/bdg1.jpg', import.meta.url).href,
        new URL('../assets/images/optimized/bdg2.jpg', import.meta.url).href,
        new URL('../assets/images/optimized/bdg3.jpg', import.meta.url).href
    ]

    const [current, setCurrent] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [loadedImages, setLoadedImages] = useState({})
    const loadingRef = useRef({}) // Track which images are currently loading

    // Load current image and preload next image
    useEffect(() => {
        setIsLoaded(false) // Start fade out for previous image

        // Function to load an image (only if not already loaded or loading)
        const loadImage = (index, isCurrent = false) => {
            // Skip if already loaded or currently loading
            if (loadedImages[index] || loadingRef.current[index]) {
                if (isCurrent && loadedImages[index]) {
                    setIsLoaded(true) // If already loaded, just trigger fade in
                }
                return
            }

            // Mark as loading
            loadingRef.current[index] = true

            const img = new Image()
            img.onload = () => {
                setLoadedImages(prev => ({ ...prev, [index]: imagePaths[index] }))
                loadingRef.current[index] = false
                if (isCurrent) {
                    setIsLoaded(true) // Trigger fade in for current image
                }
            }
            img.src = imagePaths[index]
        }

        // Load current image
        loadImage(current, true)

        // Preload next image in background
        const nextIndex = (current + 1) % imagePaths.length
        loadImage(nextIndex)

    }, [current]) // Only depend on 'current', not 'loadedImages'

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % imagePaths.length)
            }, 300) // Match CSS transition duration
        }, 4000)

        return () => clearInterval(interval)
    }, [imagePaths.length])

    return (
        <section className="hero">
            {loadedImages[current] && (
                <img
                    src={loadedImages[current]}
                    alt={`Bandung scenery ${current + 1}`}
                    className={`hero-image ${isLoaded ? 'loaded' : ''}`}
                    loading="lazy"
                />
            )}
            <div className='hero-overlay'>
                <div className="hero-glass">
                    {/* KIRI */}
                    <div className="hero-left">
                        <h1>Explore Bandung</h1>
                        <p>
                            Jelajahi keindahan wisata, kuliner legendaris,
                            dan tempat nongkrong terbaik di Kota Bandung
                        </p>

                        {/* LOCATION - show on mobile above buttons */}
                        <div className="hero-location-mobile">
                            <span>📍 Bandung, Jawa Barat</span>
                        </div>

                        <div className="hero-actions">
                            <button className="btn-primary">Wisata</button>
                            <button className="btn-secondary">Kuliner</button>
                            <button className="btn-secondary">Cafe</button>
                        </div>
                    </div>

                    {/* KANAN - desktop only */}
                    <div className="hero-right">
                        <span>📍 Bandung, Jawa Barat</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero