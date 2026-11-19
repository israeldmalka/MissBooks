import { bookService } from "../services/book.service.js"

const { useState } = React

export function AddReview({ book, onReviewAdded }) {

    const [fullname, setFullname] = useState('')
    const [rating, setRating] = useState(1)
    const [readAt, setReadAt] = useState('')

    function onSubmit(e) {
        e.preventDefault()

        // add a new review in the book service
        const review = bookService.addReview(book.id, fullname, rating, readAt)

        // change input fields back to their default values
        setFullname('')
        setRating(1)
        setReadAt('')

        // inform the parent element to update the list of reviews
        onReviewAdded(review)
    }

    return (
        <React.Fragment>
            <form className="add-review">
                <span className="text"> Add Review:</span>

                <div className="line">
                    <label htmlFor="fullname"></label>
                    <input type="text" name="fullname" id="fullname" placeholder="Your name" value={fullname} onChange={(e) => { setFullname(e.target.value) }} />

                    <label htmlFor="rating-select">Rating:</label>
                    <select name="rating-select" id="rating-select" value={rating} onChange={(e) => { setRating(e.target.value) }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <label htmlFor="read-at">Read at:</label>
                    <input type="date" name="read-at" id="read-at" value={readAt} onChange={(e) => { setReadAt(e.target.value) }} />

                    <button onClick={onSubmit}>Submit</button>
                </div>
            </form>
        </React.Fragment>
    )
}