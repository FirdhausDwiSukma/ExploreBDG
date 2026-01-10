import WisataCard from './WisataCard'
import places from '../data/places'

function WisataSection() {
    // Filter only wisata category
    const wisataPlaces = places.filter(place => place.category === 'wisata')

    return (
        <section className="wisata-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Destinasi Wisata Populer</h2>
                    <p className="section-desc">
                        Jelajahi tempat-tempat menarik dan destinasi wisata terbaik di Kota Bandung
                    </p>
                </div>
                <div className="wisata-grid">
                    {wisataPlaces.map(place => (
                        <WisataCard
                            key={place.id}
                            name={place.name}
                            location={place.location}
                            rating={place.rating}
                            image={place.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WisataSection
