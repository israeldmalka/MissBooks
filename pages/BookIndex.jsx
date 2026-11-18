import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"

const { useState, useEffect } = React

const { Routes, Route, Link } = ReactRouterDOM

export function BookIndex() {

    // the list of books
    const [books, setBooks] = useState(null)

    // the filters (for instance { title: 'little prince', maxPrice: 200 })
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    // runs at start and at every change of filterBy
    useEffect(() => {
        loadBooks()
    }, [filterBy])

    // fetch the list of books from the service
    function loadBooks() {
        const retrievedBooks = bookService.query(filterBy)
        setBooks(retrievedBooks)
    }

    // change the filterBy with the new filters and their values
    // that would trigger re fetch and re render of the list of books
    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    // after a book was deleted, update the UI with a new list of books, without the deleted item
    function onRemoveBook(bookId) {
        bookService.deleteBook(bookId)
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
    }

    if (!books) return 'Loading...'
    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <BookList books={books} onRemoveBook={onRemoveBook}/>

            {/* for debugging purposes, show the books data at the bottom of the page */}
            <pre>
                {JSON.stringify(books, null, 2)}
            </pre>

        </section>
    )
}