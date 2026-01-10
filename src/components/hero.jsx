import { useEffect, useState } from 'react'
import img1 from '../assets/images/bdg1.jpg'
import img2 from '../assets/images/bdg2.jpg'
import img3 from '../assets/images/bdg3.jpg'

function Hero() {
    const images = [img1, img2, img3]
    const [current, setCurrent] = useState(0)

    //auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [])


    return (
        <section className="hero" style={{ backgroundImage: `url(${images[current]})` }}>
            <div className='hero-overlay'>
                <div className="hero-glass">
                {/* KIRI */}
                <div className="hero-left">
                <h1>Explore Bandung</h1>
                    <p>
                        Jelajahi keindahan wisata, kuliner legendaris,
                        dan tempat nongkrong terbaik di Kota Bandung
                    </p>

                    <div className="hero-actions">
                        <button className="btn-primary">Wisata</button>
                        <button className="btn-secondary">Kuliner</button>
                        <button className="btn-secondary">Cafe</button>
                    </div>
                </div>

                    {/* KANAN */}
                    <div className="hero-right">
                        <span>📍 Bandung, Jawa Barat</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero