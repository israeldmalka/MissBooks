import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"

const { useState, useEffect } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([])

    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()

    }, [bookId])

    function loadBook() {
        const receivedBook = bookService.getBook(bookId)
        setBook(receivedBook)
        setReviews(receivedBook.reviews)
    }

    function onRemoveBook(bookId) {
        bookService.deleteBook(bookId)
        navigate('/book')
    }

    function getPriceSpan() {
        const price = book.listPrice.amount
        if (price > 150) {
            return <span className="price-high">{price}</span>
        }
        if (price < 20) {
            return <span className="price-low">{price}</span>
        }
        return <span>{price}</span>
    }

    function getTagsLine() {
        var tags = []

        // tag based on page length (serious / decent / light reading)
        if (book && book.pageCount) {
            if (book.pageCount > 500) {
                tags.push('Serious Reading')

            } else if (book.pageCount > 200) {
                tags.push('Decent Reading')

            } else if (book.pageCount < 100) {
                tags.push('Light Reading')
            }
        }

        // tag based on book published year (new / vintage)
        const currentYear = new Date().getFullYear()

        if (book && book.publishedDate) {
            const publishedYear = Number(book.publishedDate)
            const difference = currentYear - publishedYear

            if (difference < 1) {
                tags.push('New')

            } else if (difference > 10) {
                tags.push('Vintage')
            }
        }

        // tage based on is book on sale (on Sale!)
        if (book.listPrice.isOnSale) {
            tags.push('On Sale!')
        }

        return tags.join(' | ')
    }

    function onReviewAdded(review) {
        setReviews(prevReviews => [...prevReviews, review])
    }

    function onDeleteReview(bookId, reviewId) {
        bookService.deleteReview(bookId, reviewId)
        setReviews(prevItems => prevItems.filter(item => item.id !== reviewId))
    }

    function onNextBook() {
        const nextBookId = bookService.getNextBookId(book.id)
        navigate(`/book/${nextBookId}`)
    }

    function onPrevBook() {
        const prevBookId = bookService.getPrevBookId(book.id)
        navigate(`/book/${prevBookId}`)
    }

    if (!book) return 'Loading...'
    return (
        <section className="book-details">

            <div>
                <h1>Book Details</h1>
                <p>Title: {book.title}</p>
                <p>Price: {getPriceSpan()} {book.listPrice.currencyCode}</p>
                <p>{getTagsLine()}</p>
                <LongTxt txt={book.description} length={20} />
                <img src={book.thumbnail} />


            </div>

            <section className="reviews-list">
                <p>Reviews:</p>
                {(!reviews.length) && (<p>No reviews to show</p>)}
                {reviews.map(review => (
                    <p key={review.id}>
                        name: {review.fullname}, rating: {review.rating}, read at: {review.readAt}
                        <button onClick={() => { onDeleteReview(book.id, review.id) }}>Delete</button>
                    </p>
                ))}
                <AddReview book={book} onReviewAdded={onReviewAdded} />
            </section>

            {/* <div>
                <button onClick={onPrevBook}>Prev</button>
                <button onClick={onNextBook}>Next</button>
            </div> */}

            <div className="action-buttons">
                <button onClick={onPrevBook}>Previous Book</button>
                <button onClick={() => onRemoveBook(book.id)}>Delete Book</button>
                <button><Link to={`/book/edit/${book.id}`}>Edit Book</Link></button>
                <button><Link to="/book">All Books</Link></button>
                <button onClick={onNextBook}>Next Book</button>
            </div>
        </section>
    )
}


