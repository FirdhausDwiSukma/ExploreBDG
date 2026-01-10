import './App.css';
import Header from './components/header'
import Hero from './components/hero'
import WisataSection from './components/wisata'

function App() {
  return (
    <div>
      <Header title="ExploreBDG" />
      <main>
        <Hero />
        <WisataSection />
      </main>
    </div>
  )
}

export default App


