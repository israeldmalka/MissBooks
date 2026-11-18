const Router = ReactRouterDOM.HashRouter
const { Routes, Route, NavLink } = ReactRouterDOM

import { BookEdit } from "./cmps/BookEdit.jsx"
import { About } from "./pages/AboutPage.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"

export function App() {

    return (
        <Router>
            <section className="app">
                <header className="app-header main-layout">
                    <h1>My Book Store</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Explore Books</NavLink>
                </header>
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={ <BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}