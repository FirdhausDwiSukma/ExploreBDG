import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import WisataSection from './components/Wisata'
import AllDestinations from './pages/AllDestinations'
import ErrorBoundary from './components/ErrorBoundary'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div>
            <Header title="ExploreBDG" />
            <main id="main-content">
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Hero />
                                <WisataSection />
                            </>
                        } />
                        <Route path="/destinasi" element={<AllDestinations />} />
                    </Routes>
                </ErrorBoundary>
            </main>
        </div>
    )
}

export default App
