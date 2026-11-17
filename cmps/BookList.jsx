import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onSetSelectedBookId, onBookRemoved }) {

    if (!books) return 'Loading...'
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} onSetSelectedBookId={onSetSelectedBookId} onBookRemoved={onBookRemoved} />
                </li>
            ))}
        </ul>
    )
}