import { useState } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import WisataCard from '../components/WisataCard'
import DestinationModal from '../components/DestinationModal'
import places from '../data/places'

function AllDestinations() {
    const wisataPlaces = places.filter(place => place.category === 'wisata')
    const [selectedPlace, setSelectedPlace] = useState(null)

    return (
        <section className="wisata-section" style={{ paddingTop: '60px' }}>
            <ScrollRestoration />
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Semua Destinasi</h2>
                    <p className="section-desc">
                        Daftar lengkap destinasi wisata menarik di Kota Bandung
                    </p>
                </div>

                {wisataPlaces.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#64748b', marginTop: '2rem' }}>
                        Belum ada destinasi tersedia.
                    </p>
                ) : (
                    <div className="destinations-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginTop: '2rem'
                    }}>
                        {wisataPlaces.map(place => (
                            <WisataCard
                                key={place.id}
                                name={place.name}
                                location={place.location}
                                rating={place.rating}
                                image={place.image}
                                imageWebp={place.imageWebp}
                                comingSoon={place.comingSoon}
                                onClick={() => setSelectedPlace(place)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedPlace && (
                <DestinationModal
                    place={selectedPlace}
                    onClose={() => setSelectedPlace(null)}
                />
            )}
        </section>
    )
}

export default AllDestinations
