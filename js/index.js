document.addEventListener("DOMContentLoaded", ()=>{

  const url = "http://localhost:3000/books/"

  const clickHandler = () =>{
    const list = document.querySelector('#list')

    list.addEventListener('click', e=>{
      const bookId = e.target.dataset.bookId

      fetch(url + bookId)
      .then(res =>res.json())
      .then(book=>{
        showBook(book)
      })
    })


    const showPanel = document.querySelector('#show-panel')
    showPanel.addEventListener('click', e=>{
      const bookId = e.target.dataset.bookId

      const newUser = { id: 100, username: "ZHENGJIAN LIU"}
      const options = {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({"users":[0].push(newUser)})
      }
      fetch(url+bookId,options)
      .then(res => res.json())
    })
  }

  const showBook = (book)=>{
    const showPanel = document.querySelector('#show-panel')
    showPanel.innerHTML = `
    <img src="${book.img_url}">
    <h4>${book.title}</h4>
    <h4>${book.subtitle}</h4>
    <h4>${book.author}</h4>
    <p>${book.description}</p>
    <ul id="users"></ul>
    <button data-book-id="${book.id}">Like</button>
    `
    const userUl = document.querySelector('ul#users')
    for(const user of book.users){
      const userLi = document.createElement('li')
      userLi.textContent = user.username
      userUl.append(userLi)
    }
  }

  const renderData = (books) =>{
    for(const book of books){
      const bookList = document.querySelector('#list')
      const bookLi = document.createElement('li')
      bookLi.textContent = book.title
      bookLi.setAttribute("data-book-id",`${book.id}`)
      bookList.append(bookLi)
    }
  }

  const getData = () =>{
    fetch(url)
    .then(res => res.json())
    .then(books =>{
      renderData(books)
    })
  }

  /*-------------- Section ---------------*/
  getData()
  clickHandler()
});
