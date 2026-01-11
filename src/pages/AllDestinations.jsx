import { useEffect } from 'react'
import WisataCard from '../components/WisataCard'
import places from '../data/places'
import Header from '../components/header'

function AllDestinations() {
    // Filter only wisata category
    const wisataPlaces = places.filter(place => place.category === 'wisata')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className="wisata-section" style={{ paddingTop: '60px' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Semua Destinasi</h2>
                    <p className="section-desc">
                        Daftar lengkap destinasi wisata menarik di Kota Bandung
                    </p>
                </div>

                <div className="destinations-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem'
                }}>
                    {wisataPlaces.map(place => (
                        <div key={place.id}>
                            <WisataCard
                                name={place.name}
                                location={place.location}
                                rating={place.rating}
                                image={place.image}
                                imageWebp={place.imageWebp}
                                onClick={() => alert(`Mengunjungi ${place.name}... (Fitur Detail Segera Hadir!)`)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AllDestinations
