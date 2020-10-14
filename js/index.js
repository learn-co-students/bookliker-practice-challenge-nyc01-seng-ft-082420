document.addEventListener("DOMContentLoaded", function() {
const bookUrl = 'http://localhost:3000/books/'

  const getBooks = () => {
    fetch(bookUrl)
    .then(response => response.json())
    .then(bookObj => {
      let listPanel = document.getElementById('list-panel')
      let bookList = document.createElement('ul')
      listPanel.append(bookList)
      for (book of bookObj) {
        bookLi = document.createElement('li')
        bookLi.textContent = book.title
        bookLi.classList.add('book-item')
        bookLi.id = book.id
        bookList.append(bookLi)
      }
    })
  }

  const renderBook = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('.book-item')){
        const showPanel = document.getElementById('show-panel')
        showPanel.innerHTML = ""
        fetch(bookUrl + e.target.id)
        .then(response => response.json())
        .then(bookObj => {
          const bookCard = document.createElement('div')
          showPanel.append(bookCard)
          bookCard.innerHTML = `
            <img src = ${bookObj.img_url} width = 200 >
            <h3> ${bookObj.title} </h3>
            <h4> ${bookObj.subtitle} </h4>
            <h4> ${bookObj.author} </h4>
            <p> ${bookObj.description} </p>
          `
          })
        }
      })

  }

  getBooks()
  renderBook()
});
