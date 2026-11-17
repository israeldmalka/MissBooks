const { useState, useEffect, useRef } = React
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/AboutPage.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"

export function App() {

    const [page, setPage] = useState('book')

    return (
        <section className="app">
            {/* <header className="app-header main-layout">
                <h1>My App</h1>
            </header> */}
            <main className="main-layout">
                { page === 'home' && <HomePage />}
                { page === 'about' && <About /> }
                { page === 'book' && <BookIndex /> }
                
            </main>
        </section>
    )
}