import PropTypes from 'prop-types'

function WisataCard({ name, location, rating, image }) {
    return (
        <div className="wisata-card">
            <div className="card-image-wrapper">
                <img src={image} alt={name} loading="lazy" />
                <div className="rating-badge">
                    <span className="star">⭐</span>
                    <span className="rating-value">{rating}</span>
                </div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{name}</h3>
                <p className="card-location">
                    <span className="location-icon">📍</span>
                    {location}
                </p>
            </div>
        </div>
    )
}

WisataCard.propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
}

export default WisataCard
