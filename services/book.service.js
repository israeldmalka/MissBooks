import { storageService } from "./storage.service.js"
import { utilService } from "./util.service.js"

export const bookService = {
    query,
    getBook,
    createBook,
    deleteBook,
    setBookTitle,
    setBookListPrice,
    getDefaultFilter,
    addReview,
    deleteReview,
    getNextBookId,
    getPrevBookId
}

const STORAGE_KEY = 'BOOK_DB_123'

let gBooks = []

// Create
function createBook(title, price, currencyCode, isOnSale) {
    const book = {
        id: utilService.makeId(),
        title: title,
        listPrice: {
            amount: price,
            currencyCode: currencyCode,
            isOnSale: isOnSale
        },
        reviews: [],

        // every new book will come with this default image (a default generic book cover)
        thumbnail: 'https://coding-academy.org/books-photos/6.jpg',

        publishedDate: new Date().getFullYear()
    }

    gBooks = [...gBooks, book]
    storageService.saveToStorage(STORAGE_KEY, gBooks)
    return book
}

// Read
function getBook(bookId) {
    let found = gBooks.find(book => book.id === bookId)

    if (!found) {
        console.error('Could not find a book with id:', bookId)
        return null
    }

    return found
}

// Update
function setBookTitle(bookId, newTitle) {
    let book = gBooks.find(book => book.id === bookId)

    if (!book) {
        console.error('Could not find a book with id:', bookId)
        return null
    }

    book.title = newTitle
    storageService.saveToStorage(STORAGE_KEY, gBooks)

    return book
}

function setBookListPrice(bookId, price, currencyCode, isOnSale) {
    let book = gBooks.find(book => book.id === bookId)

    if (!book) {
        console.error('Could not find a book with id:', bookId)
        return null
    }

    book.listPrice.amount = price
    book.listPrice.currencyCode = currencyCode
    book.listPrice.isOnSale = isOnSale

    storageService.saveToStorage(STORAGE_KEY, gBooks)

    return book
}

// Delete
function deleteBook(bookId) {
    let found = gBooks.find(book => book.id === bookId)

    if (!found) {
        console.error('Could not find a book with id:', bookId)
        return null
    }

    gBooks = gBooks.filter(book => book.id !== bookId)

    storageService.saveToStorage(STORAGE_KEY, gBooks)

    return found
}

// List
function query(filterBy) {

    if (!gBooks || gBooks.length === 0) {
        // init gBooks with stored data or demo data
        _initBooks()
    }

    let books = [...gBooks]

    if (filterBy.maxPrice) {
        books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
    }

    if (filterBy.title) {
        books = books.filter(book => book.title.toLowerCase().includes(filterBy.title.toLowerCase()))
    }

    return books
}

function getDefaultFilter() {
    const filterBy = { title: '', maxPrice: '' }
    return filterBy
}

function _initBooks() {
    // load books from cache
    let storedData = storageService.loadFromStorage(STORAGE_KEY)

    if (!storedData || storedData.length === 0) {

        // no books stored in cache, so create demo data instead
        // gBooks = _getDemoData()
        gBooks = _createBooks()

        // save the books to the local storage
        storageService.saveToStorage(STORAGE_KEY, gBooks)

    } else {
        // take the books that we found in the local storage
        gBooks = storedData
    }
}

function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            },
            reviews: []
        }
        books.push(book)
    }
    console.log('_createBooks() generated books:', books)
    return books
}

function addReview(bookId, fullname, rating, readAt) {
    const book = gBooks.find(book => book.id === bookId)

    const review = {
        id: utilService.makeId(),
        fullname: fullname,
        rating: rating,
        readAt: readAt
    }

    book.reviews = [...book.reviews, review]

    // save the books to the local storage
    storageService.saveToStorage(STORAGE_KEY, gBooks)

    return review
}

function deleteReview(bookId, reviewId) {
    const book = gBooks.find(book => book.id === bookId)

    // delete the review
    book.reviews = book.reviews.filter(review => review.id !== reviewId)

    // save the books to the local storage
    storageService.saveToStorage(STORAGE_KEY, gBooks)
}

function getNextBookId(bookId) {
    let index = gBooks.findIndex(book => book.id === bookId)
    let nextIndex = index + 1
    if (nextIndex === gBooks.length) {
        nextIndex = 0
    }
    const nextBook = gBooks[nextIndex]
    return nextBook.id
}

function getPrevBookId(bookId) {
    let index = gBooks.findIndex(book => book.id === bookId)
    let prevIndex = index - 1
    if (prevIndex < 0) {
        prevIndex = gBooks.length - 1
    }
    const prevBook = gBooks[prevIndex]
    return prevBook.id
}