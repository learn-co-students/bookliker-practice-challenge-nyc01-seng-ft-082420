document.addEventListener("DOMContentLoaded", function() {

  const booksUrl = "http://localhost:3000/books/"


	const getBooks = () => {
		fetch(booksUrl)
		.then(response => response.json())
		.then(books => renderBooks(books))

	}

	const renderBooks = books => {
		const booksUl = document.getElementById('list')

		for (const book of books) {
			const bookLi = document.createElement('li')
			bookLi.classList.add('book-list')
			bookLi.textContent = (book.title)
			bookLi.dataset.bookId = book.id
			booksUl.append(bookLi)
		}

	}

	const renderBook = book => {
		
		const bookShow = document.getElementById("show-panel")
		bookShow.innerHTML = `
		<img src="${book.img_url}">
		<h4>${book.title}</h4>
		<h4>${book.subtitle}</h4>
		<h4>${book.author}</h4>
		<p>${book.description}</p>
		<ul id="users"></ul>
		<button data-book-like-id="${book.id}">Like</button>
		`
			const usersUl = document.getElementById('users')
			for (const user of book.users) {
				const usersLi = document.createElement('li')
				usersLi.textContent = user.username
				usersUl.append(usersLi)
			}
	}

	const clickHandler = () => {
		document.addEventListener('click', e => {
			if (e.target.matches(".book-list")) {
				
				const book = e.target.dataset.bookId
				
				fetch(booksUrl + book)
				.then(response => response.json())
				.then(book => renderBook(book))
			}

		})

	}


	clickHandler()
	getBooks()
});
