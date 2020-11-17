const BASE_URL = "http://localhost:3000/books/"

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
    clickHandler()
});


function fetchBooks() {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(books => renderBooks(books))
}

function renderBooks(array) {
    for (book of array) {
        renderBook(book)
    }
}

function renderBook(book) {
    const bookUl = document.querySelector("#list")
    const bookLi = document.createElement("li")
    bookLi.classList.add("book")
    bookLi.dataset.id = book.id
    bookLi.innerHTML = book.title
    bookUl.append(bookLi)
}

let currentBook;

function clickHandler() {
    document.addEventListener("click", e => {
        if (e.target.matches(".book")) {
            fetchBookDetails(e.target)
        } else if (e.target.matches(".like")) {
            addLike(e.target)
        }
    })
}

function fetchBookDetails(book) {
    fetch(BASE_URL + book.dataset.id)
    .then(res => res.json())
    .then(book => {
        renderBookDetails(book)
        currentBook = book})
}

function renderBookDetails(bookObj) {
    const showDiv = document.querySelector("#show-panel")
    showDiv.innerHTML = ""
    const bookDiv = document.createElement("div")
    bookDiv.classList.add("book-info")
    bookDiv.innerHTML = `
        <img src=${bookObj.img_url}>
        <h5>${bookObj.title}</h5>
        <h5>${bookObj.subtitle}</h5>
        <h5>${bookObj.author}</h5>
        <p>${bookObj.description}</p>
    `
    const likersUl = document.createElement("ul")
    likersUl.textContent = "Likers:"
    let liked;
    for (user of bookObj.users) {
        const userLi = document.createElement("li")
        userLi.innerHTML = user.username
        likersUl.append(userLi)
        if (user.id === 1) {
            liked = true
        }
    }
    bookDiv.append(likersUl)
    const likeBtn = document.createElement("button")
    likeBtn.classList.add("like")
    likeBtn.dataset.id = bookObj.id
    likeBtn.textContent = "Like"
    if (liked) {
        likeBtn.disabled = true
    }
    bookDiv.append(likeBtn)
    showDiv.append(bookDiv)
}


function addLike(like) {
    const bookId = like.dataset.id
    const body = currentBook
    body.users.push( {
        "id": 1,
        "username": "pouros"
    })
    const options = {
        method: "PATCH",
        headers: {
            "content-type" : "application/json",
            accept: "application/json"
        },
        body : JSON.stringify(body)
    }
    fetch(BASE_URL+bookId, options)
    .then(res=>res.json())
    .then(res => {
        like.disabled = true
        const likesUl = like.previousElementSibling
        console.log(likesUl)
        const likeLi = document.createElement("li")
        likeLi.textContent = "pouros"
        likesUl.append(likeLi)
    })
}