import { bookService } from "../services/book.service.js"

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"
import { BookList } from "../cmps/BookList.jsx"

const { useState, useEffect, useRef } = React

export function BookIndex() {

    // the list of books
    const [books, setBooks] = useState(null)

    // the filters (for instance { title: 'little prince', maxPrice: 200 })
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    // the id of the currently selected book, if none select is null
    // if null it tells the UI to show the list of books, and not the book details page of a specific book
    const [selectedBookId, setSelectedBookId] = useState(null)

    // whether we're on edit mode or not
    // to switch between viewing the list of books, to adding a new book
    // and to switch between viewing book details of a selected book, or editting its details
    const [isEdit, setIsEdit] = useState(false)

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

    // change the currently selected book id 
    // (for showing the book details of the selected book, or for editting the selected book)
    function onSetSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    // after a new book was added, update the UI with a new list of books, with the new item
    function onBookCreated(savedBook) {
        setBooks([...books, savedBook])
        setIsEdit(false)
    }

    // after a book was removed, update the UI with a new list of books, without the removed item
    function onBookRemoved(removedBook) {
        console.log('BookIndex onBookRemoved() removedBook:', removedBook)
        setBooks(prevBooks => prevBooks.filter(book => book.id !== removedBook.id))
    }

    // after a book was editted with new details, update the UI with a new list of books, with the updated item
    function onBookUpdated(updatedItem) {
        setBooks(prevBooks => prevBooks.map(book => (book.id === updatedItem.id) ? updatedItem : book))
        setSelectedBookId(null)
        setIsEdit(false)
    }

    if (!books) return 'Loading...'
    return (
        <section className="book-index">

            {(selectedBookId && !isEdit) && (
                // show book details of the selected book
                <BookDetails selectedBookId={selectedBookId} onSetSelectedBookId={onSetSelectedBookId} />
            )}

            {(selectedBookId && isEdit) && (
                // edit the selected book
                <BookEdit selectedBookId={selectedBookId} onBookUpdated={onBookUpdated} onCanceled={() => { setIsEdit(false) }} />
            )}

            {(!selectedBookId && !isEdit) && (
                // show the list of books and the filter section, no book is selected
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList books={books} onSetSelectedBookId={onSetSelectedBookId} onBookRemoved={onBookRemoved} />
                </React.Fragment>
            )}

            {(!selectedBookId && isEdit) && (
                // show the page to create a new book, when no specific book is selected, and edit mode is turned on
                <BookEdit onBookCreated={onBookCreated} onCanceled={() => { setIsEdit(false) }} />
            )}

            {/* toggle between edit mode or not */}
            <div>
                <label htmlFor="edit-mode">Edit mode?</label>
                <input type="checkbox" name="edit-mode" id="edit-mode" checked={isEdit} onChange={(e) => setIsEdit(e.target.checked)} />
            </div>

            {/* for debugging purposes, show the books data at the bottom of the page */}
            <pre>
                {JSON.stringify(books, null, 2)}
            </pre>

        </section>
    )
}