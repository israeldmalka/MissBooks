const { Link } = ReactRouterDOM

export function BookPreview({ book, onRemoveBook }) {

    if (!book) return 'Loading...'
    return (
        <section className="book-preview">
            <p className="title">{book.title}</p>
            <img src={book.thumbnail} />
            <p className="price">{book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <button className="select-button"><Link to={ `/book/${book.id}`}>Select</Link></button>
            <button className="delete-button" onClick={() => onRemoveBook(book.id)}>Delete</button>
        </section>
    )
}