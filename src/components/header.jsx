import { useEffect, useState } from 'react'

function Header({ title }) {
    
    const [scrolled, setScrolled] = useState(false)
    // handle scroll
    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className= {scrolled ? "header scrolled" : "header"}>
            <div className="brand">
                <h1> {title} </h1>
            </div>
        
        <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Help</li>
        </ul>
      </nav>
        </header>
    )
}

export default Header