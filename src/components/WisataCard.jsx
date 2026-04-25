import PropTypes from 'prop-types'
import { useState } from 'react'
import { IconPin, IconStar } from './icons'

function WisataCard({ name, location, rating, image, imageWebp, comingSoon, onClick }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={`wisata-card ${isHovered ? 'hovered' : ''}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            aria-label={`Lihat detail ${name}`}
        >
            <div className="card-image-wrapper">
                <picture>
                    {imageWebp && <source srcSet={imageWebp} type="image/webp" />}
                    <img
                        src={image}
                        alt={name}
                        width="800"
                        height="600"
                        loading="lazy"
                        onLoad={() => setIsLoaded(true)}
                        style={{
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out'
                        }}
                    />
                </picture>
                {!isLoaded && (
                    <div
                        className="skeleton-loader"
                        style={{ position: 'absolute', inset: 0, background: '#f0f0f0' }}
                        aria-hidden="true"
                    />
                )}
                <div className="rating-badge" aria-label={`Rating ${rating}`}>
                    <IconStar size={16} />
                    <span className="rating-value">{rating}</span>
                </div>
                {comingSoon && (
                    <div className="coming-soon-badge" aria-label="Segera hadir">
                        Segera Hadir
                    </div>
                )}
            </div>
            <div className="card-content">
                <h3 className="card-title">{name}</h3>
                <p className="card-location">
                    <IconPin size={14} />
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
    image: PropTypes.string.isRequired,
    imageWebp: PropTypes.string,
    comingSoon: PropTypes.bool,
    onClick: PropTypes.func,
}

export default WisataCard
