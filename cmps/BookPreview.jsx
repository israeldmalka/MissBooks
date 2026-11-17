import { bookService } from "../services/book.service.js"

export function BookPreview({ book, onSetSelectedBookId, onBookRemoved }) {

    function onRemoveBook(bookId) {
        console.log('onRemoveBook(), bookId:', bookId)

        const removedItem = bookService.deleteBook(bookId)
        onBookRemoved(removedItem)
    }

    if (!book) return 'Loading...'
    return (
        <section className="book-preview">
            <p className="title">{book.title}</p>
            <img src={book.thumbnail} />
            <p className="price">{book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <button className="select-button" onClick={() => onSetSelectedBookId(book.id)}>Select</button>
            <button className="delete-button" onClick={() => onRemoveBook(book.id)}>Delete</button>
        </section>
    )
}