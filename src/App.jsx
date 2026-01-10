import './App.css';
import Header from './components/header'
import Hero from './components/hero'

function App() {
  return (
    <div>
      <Header title= "ExploreBDG"/>
        <main style={{ paddingTop: "64px" }}>
            <Hero />
        </main>
    </div>
  )
}

export default App

