import { bookService } from "../services/book.service.js"

import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React

const { useParams, Link, useNavigate } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)

    const { bookId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        const retrievedBook = bookService.getBook(bookId)
        setBook(retrievedBook)
    }

    function onRemoveBook(bookId) {
        bookService.deleteBook(bookId)
        navigate('/book')
    }

    function getPaceCountDesc() {
        if (book && book.pageCount) {
            if (book.pageCount > 500) {
                return <p>{'Serious Reading'}</p>
            } else if (book.pageCount > 200) {
                return <p>{'Decent Reading'}</p>
            } else if (book.pageCount < 100) {
                return <p>{'Light Reading'}</p>
            }
        }
        return ''
    }

    function getPublishedDateDesc() {
        const currentYear = new Date().getFullYear()

        if (book && book.publishedDate) {
            const publishedYear = Number(book.publishedDate)
            const difference = currentYear - publishedYear

            if (difference < 1) {
                return <p>{'New'}</p>
            }

            if (difference > 10) {
                return <p>{'Vintage'}</p>
            }
        }

        return ''
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

    if (!book) return 'Loading...'
    return (
        <section className="book-details">
            <div className="text">
                <p>Book Details</p>
                <p>title: {book.title}</p>
                <p>price: { getPriceSpan() } {book.listPrice.currencyCode}</p>
                {(book.listPrice.isOnSale) && (<p>{ 'On Sale!' }</p>)}
                { getPaceCountDesc() }
                { getPublishedDateDesc() }
                <LongTxt txt={ book.description } length={ 20 } />
            </div>
            <img src={book.thumbnail} />
            <div className="buttons">
                <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                <button><Link to={"/book/edit/" + book.id}>Edit</Link></button>
                <button><Link to="/book">Back</Link></button>
            </div>
        </section>
    )
}


