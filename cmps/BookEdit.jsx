import { bookService } from "../services/book.service.js"

const { useState, useEffect, useRef } = React

export function BookEdit({ selectedBookId, onBookCreated, onBookUpdated, onCanceled }) {

    // The component serves for two functions
    // 1. to edit an existing book, if it receives a prop selectedBookId
    // 2. to create a new book, if there is no selected book
    
    const [book, setBook] = useState(null)

    // the input fields book title, price, currency code and is it on sale or not
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [currency, setCurrency] = useState('')
    const [isOnSale, setIsOnSale] = useState(false)

    useEffect(() => {

        if (selectedBookId) {
            // case 1: we edit an existing book
            const retrievedBook = bookService.getBook(selectedBookId)
            setBook(retrievedBook)

            // the inputs will have the current values from the item
            setTitle(retrievedBook.title)
            setPrice(retrievedBook.listPrice.amount || '')
            setCurrency(retrievedBook.listPrice.currencyCode)
            setIsOnSale(retrievedBook.listPrice.isOnSale)

        } else {
            // case 2: we are creating a new book
            // nothing needs to be done here
            // the input fields are already initiated with empty strings
        }

    }, [])

    function onSubmitForm(ev) {
        ev.preventDefault()

        if (selectedBookId) {
            // update the book with the new details from the input fields
            let updatedItem = bookService.setBookTitle(selectedBookId, title)
            updatedItem = bookService.setBookListPrice(selectedBookId, price, currency, isOnSale)
            onBookUpdated(updatedItem)

        } else {
            // create a new item with the details from the input fields
            const newItem = bookService.createBook(title, price, currency, isOnSale)
            onBookCreated(newItem)
        }

    }

    function onCancel() {
        // if (mode === 'update') {
        //     // case 1: we are editting an existing item and clicking cancel
        //     // we set the selected book id to null and it sends us back to the main component
        //     onSetSelectedBookId(null)

        // } else if (mode === 'create') {
        //     // case 2: we were creating a new item and then clicking cancel
        //     // we call the callback function onCanceled which sets the flag isEdit and sends us back
        //     // to understand better, see the conditional rendering in the component BookIndex
        //     onCanceled()
        // }

        onCanceled()
    }

    return (
        <section className="book-edit">            

            <form onSubmit={onSubmitForm}>
                <h2>{ (selectedBookId ? 'Edit the Book' : 'Add a New Book')}</h2>

                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="price">Price:</label>
                <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

                <label htmlFor="currency">Currency Code</label>
                <input type="text" name="currency" id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />

                <label htmlFor="isOnSale">is On Sale?</label>
                <input type="checkbox" name="isOnSale" id="isOnSale" checked={isOnSale} onChange={(e) => setIsOnSale(e.target.checked)} />

                <button onClick={onSubmitForm}>Submit</button>
                <button onClick={onCancel}>Cancel</button>
            </form>
        </section>
    )
}