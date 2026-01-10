import { useEffect, useState } from 'react'

function Header({ title }) {
    
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    // handle scroll
    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={scrolled ? "header scrolled" : "header"}>
            <div className="brand">
                <h1>{title}</h1>
            </div>
        
            <button 
                className="hamburger" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        
            <nav className={mobileMenuOpen ? "nav-open" : ""}>
                <ul>
                    <li onClick={() => setMobileMenuOpen(false)}>Home</li>
                    <li onClick={() => setMobileMenuOpen(false)}>About</li>
                    <li onClick={() => setMobileMenuOpen(false)}>Help</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header