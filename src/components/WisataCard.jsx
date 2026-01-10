import PropTypes from 'prop-types'
import { useState } from 'react'

function WisataCard({ name, location, rating, image, onClick }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div 
            className={`wisata-card ${isHovered ? 'hovered' : ''}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card-image-wrapper">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out'
                    }}
                />
                {!isLoaded && <div className="skeleton-loader" style={{ position: 'absolute', inset: 0, background: '#f0f0f0' }} />}
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
