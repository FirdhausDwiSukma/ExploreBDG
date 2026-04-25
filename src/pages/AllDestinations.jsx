import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WisataCard from '../components/WisataCard'
import DestinationModal from '../components/DestinationModal'
import { IconPin, IconStar } from '../components/icons'
import places from '../data/places'

const SORT_OPTIONS = [
    { value: 'default', label: 'Urutan Default' },
    { value: 'rating-desc', label: 'Rating Tertinggi' },
    { value: 'rating-asc', label: 'Rating Terendah' },
    { value: 'name-asc', label: 'Nama A–Z' },
    { value: 'name-desc', label: 'Nama Z–A' },
]

const FILTER_OPTIONS = [
    { value: 'all', label: 'Semua' },
    { value: 'available', label: 'Tersedia' },
    { value: 'coming-soon', label: 'Segera Hadir' },
]

function AllDestinations() {
    const wisataPlaces = places.filter(place => place.category === 'wisata')

    const [selectedPlace, setSelectedPlace] = useState(null)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('default')
    const [filterBy, setFilterBy] = useState('all')

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [])

    const filtered = useMemo(() => {
        let result = [...wisataPlaces]

        // Filter by availability
        if (filterBy === 'available') result = result.filter(p => !p.comingSoon)
        if (filterBy === 'coming-soon') result = result.filter(p => p.comingSoon)

        // Search by name or location
        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q)
            )
        }

        // Sort
        if (sortBy === 'rating-desc') result.sort((a, b) => b.rating - a.rating)
        if (sortBy === 'rating-asc') result.sort((a, b) => a.rating - b.rating)
        if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))
        if (sortBy === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name))

        return result
    }, [wisataPlaces, search, sortBy, filterBy])

    const hasActiveFilter = search.trim() || sortBy !== 'default' || filterBy !== 'all'

    const handleReset = () => {
        setSearch('')
        setSortBy('default')
        setFilterBy('all')
    }

    return (
        <>
            {/* ── PAGE HERO ── */}
            <div className="dest-hero">
                <div className="dest-hero-overlay" />
                <div className="dest-hero-content">
                    <nav className="dest-breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Beranda</Link>
                        <span aria-hidden="true">›</span>
                        <span>Destinasi Wisata</span>
                    </nav>
                    <h1 className="dest-hero-title">Destinasi Wisata Bandung</h1>
                    <p className="dest-hero-subtitle">
                        {wisataPlaces.length} destinasi pilihan menanti untuk dijelajahi
                    </p>

                    {/* Stats row */}
                    <div className="dest-stats">
                        <div className="dest-stat">
                            <span className="dest-stat-value">
                                {wisataPlaces.filter(p => !p.comingSoon).length}
                            </span>
                            <span className="dest-stat-label">Tersedia</span>
                        </div>
                        <div className="dest-stat-divider" />
                        <div className="dest-stat">
                            <span className="dest-stat-value">
                                {(wisataPlaces.reduce((s, p) => s + p.rating, 0) / wisataPlaces.length).toFixed(1)}
                            </span>
                            <span className="dest-stat-label">Rata-rata Rating</span>
                        </div>
                        <div className="dest-stat-divider" />
                        <div className="dest-stat">
                            <span className="dest-stat-value">
                                {wisataPlaces.filter(p => p.comingSoon).length}
                            </span>
                            <span className="dest-stat-label">Segera Hadir</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <section className="dest-page">
                <div className="container">

                    {/* ── TOOLBAR ── */}
                    <div className="dest-toolbar">
                        {/* Search */}
                        <div className="dest-search-wrapper">
                            <svg className="dest-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                className="dest-search"
                                type="search"
                                placeholder="Cari nama atau lokasi..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                aria-label="Cari destinasi"
                            />
                            {search && (
                                <button
                                    className="dest-search-clear"
                                    onClick={() => setSearch('')}
                                    aria-label="Hapus pencarian"
                                >✕</button>
                            )}
                        </div>

                        {/* Filter chips */}
                        <div className="dest-filter-chips" role="group" aria-label="Filter ketersediaan">
                            {FILTER_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    className={`dest-chip ${filterBy === opt.value ? 'active' : ''}`}
                                    onClick={() => setFilterBy(opt.value)}
                                    aria-pressed={filterBy === opt.value}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <div className="dest-sort-wrapper">
                            <label htmlFor="sort-select" className="dest-sort-label">Urutkan:</label>
                            <select
                                id="sort-select"
                                className="dest-sort"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ── RESULT COUNT + RESET ── */}
                    <div className="dest-result-bar">
                        <p className="dest-result-count">
                            Menampilkan <strong>{filtered.length}</strong> dari {wisataPlaces.length} destinasi
                        </p>
                        {hasActiveFilter && (
                            <button className="dest-reset" onClick={handleReset}>
                                Reset filter
                            </button>
                        )}
                    </div>

                    {/* ── GRID ── */}
                    {filtered.length === 0 ? (
                        <div className="dest-empty">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <p>Tidak ada destinasi yang cocok.</p>
                            <button className="btn-primary" onClick={handleReset}>Reset Filter</button>
                        </div>
                    ) : (
                        <div className="dest-grid">
                            {filtered.map(place => (
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

                    {/* ── TOP PICKS ── */}
                    {!hasActiveFilter && (
                        <div className="dest-top-picks">
                            <h2 className="dest-top-title">Destinasi Terpopuler</h2>
                            <div className="dest-top-list">
                                {[...wisataPlaces]
                                    .filter(p => !p.comingSoon)
                                    .sort((a, b) => b.rating - a.rating)
                                    .slice(0, 3)
                                    .map((place, i) => (
                                        <button
                                            key={place.id}
                                            className="dest-top-item"
                                            onClick={() => setSelectedPlace(place)}
                                            aria-label={`Lihat detail ${place.name}`}
                                        >
                                            <span className="dest-top-rank">#{i + 1}</span>
                                            <picture>
                                                {place.imageWebp && <source srcSet={place.imageWebp} type="image/webp" />}
                                                <img src={place.image} alt={place.name} />
                                            </picture>
                                            <div className="dest-top-info">
                                                <span className="dest-top-name">{place.name}</span>
                                                <span className="dest-top-loc">
                                                    <IconPin size={12} /> {place.location}
                                                </span>
                                            </div>
                                            <div className="dest-top-rating">
                                                <IconStar size={14} />
                                                <span>{place.rating}</span>
                                            </div>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {selectedPlace && (
                <DestinationModal
                    place={selectedPlace}
                    onClose={() => setSelectedPlace(null)}
                />
            )}
        </>
    )
}

export default AllDestinations
