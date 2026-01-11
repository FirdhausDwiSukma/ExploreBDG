import './App.css';
import Header from './components/header'
import Hero from './components/hero'
import WisataSection from './components/wisata'
import AllDestinations from './pages/AllDestinations'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header title="ExploreBDG" />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <WisataSection />
            </>
          } />
          <Route path="/destinasi" element={<AllDestinations />} />
        </Routes>
      </main>
    </div>
  )
}

export default App


