import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ selectedBookId, onSetSelectedBookId }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        const retrievedBook = bookService.getBook(selectedBookId)
        setBook(retrievedBook)
    }

    if (!book) return 'Loading...'
    return (
        <section className="book-details">
            <p>Book Details:</p>
            <p>Title: {book.title}</p>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <p>{ (book.listPrice.isOnSale) ? 'On Sale!' : 'not on sale'}</p>
            <button onClick={() => onSetSelectedBookId(null)}>Back</button>
        </section>
    )
}