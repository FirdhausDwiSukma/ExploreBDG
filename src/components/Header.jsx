import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

function Header({ title }) {

    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const hamburgerRef = useRef(null)

    // handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuOpen &&
                menuRef.current &&
                hamburgerRef.current &&
                !menuRef.current.contains(event.target) &&
                !hamburgerRef.current.contains(event.target)) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [mobileMenuOpen])

    return (
        <header className={scrolled ? "header scrolled" : "header"}>
            <div className="brand">
                <h1>{title}</h1>
            </div>

            <button
                ref={hamburgerRef}
                className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav ref={menuRef} className={mobileMenuOpen ? "nav-open" : ""}>
                <ul>
                    <li onClick={() => setMobileMenuOpen(false)}>
                        <Link to="/">Home</Link>
                    </li>
                    <li onClick={() => setMobileMenuOpen(false)}>About</li>
                    <li onClick={() => setMobileMenuOpen(false)}>Help</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header