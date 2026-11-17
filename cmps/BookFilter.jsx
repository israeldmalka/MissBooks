const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange(ev) {
        let { value, type, name: field } = ev.target

        if (type === 'number') {
            if (value == 0) {
                // so that the input will habe empty string instead of '0'
                value = ''
            } else {
                // from string to number (eg. from '12' to 12)
                value = Number(value) 
            }
        }
        setFilterByToEdit(prevFilterBy => ({...prevFilterBy, [field]: value}))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()

        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className="book-filter">
            <h2>Filter Books</h2>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="title">Book Title</label>
                <input type="text" name="title" id="title" value={filterByToEdit.bookTitle} onChange={onHandleChange} />

                <label htmlFor="maxPrice">Max Price</label>
                <input type="number" name="maxPrice" id="maxPrice" value={filterByToEdit.maxPrice} onChange={onHandleChange} />

                <button>Filter Results</button>
            </form>
        </section>
    )
}