import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { IconPin, IconStar } from './icons'

function DestinationModal({ place, onClose }) {
    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        // Prevent body scroll while modal is open
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    if (!place) return null

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Detail ${place.name}`}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Tutup"
                >
                    ✕
                </button>

                {/* Image */}
                <div className="modal-image-wrapper">
                    <picture>
                        {place.imageWebp && (
                            <source srcSet={place.imageWebp} type="image/webp" />
                        )}
                        <img
                            src={place.image}
                            alt={place.name}
                            className="modal-image"
                        />
                    </picture>
                    {place.comingSoon && (
                        <div className="modal-coming-soon-badge">Segera Hadir</div>
                    )}
                </div>

                {/* Info */}
                <div className="modal-body">
                    <div className="modal-rating">
                        <IconStar size={18} />
                        <span className="modal-rating-value">{place.rating}</span>
                    </div>
                    <h2 className="modal-title">{place.name}</h2>
                    <p className="modal-location">
                        <IconPin size={14} /> {place.location}
                    </p>

                    {place.comingSoon ? (
                        <p className="modal-coming-soon-text">
                            Informasi lengkap untuk destinasi ini sedang kami siapkan. Pantau terus!
                        </p>
                    ) : (
                        <p className="modal-desc">
                            {place.description || `${place.name} adalah salah satu destinasi wisata populer di Bandung yang wajib dikunjungi.`}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

DestinationModal.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        imageWebp: PropTypes.string,
        description: PropTypes.string,
        comingSoon: PropTypes.bool,
    }),
    onClose: PropTypes.func.isRequired,
}

export default DestinationModal
