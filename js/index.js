document.addEventListener("DOMContentLoaded", function() {
  const baseBookUrl = 'http://localhost:3000/books/'
  const currentUser = {"id":1, "username":"pouros"}

  const getBooks = () => {
    fetch(baseBookUrl)
      .then(response => response.json())
      .then(books => {
        for(const book of books) {
          renderBook(book)
        } 
      })
  }

  const renderBook = bookObj => {
    const listUl = document.querySelector('#list')
    const bookLi = document.createElement('li')

    bookLi.textContent = bookObj.title
    bookLi.dataset.bookId = bookObj.id
    listUl.append(bookLi)
  }


  const clickHandler = () => {
    const listDiv = document.querySelector('#list-panel')
    listDiv.addEventListener('click', e => {
      const bookId = e.target.dataset.bookId
      if (bookId) getBookDetail(bookId)
    })
  }

  const getBookDetail = book => {
    fetch(baseBookUrl + book)
      .then(response => response.json())
      .then(book => renderBookDetail(book))
  }
  

  const renderBookDetail = bookObj => {
    const showPanel = document.querySelector('#show-panel')
    const usersLikes = bookObj.users
    const alreadyLiked = usersLikes.find( user => user.username === currentUser.username)

    showPanel.dataset.bookId = bookObj.id

    showPanel.innerHTML = `
      <img src=${bookObj.img_url}>
      <h2>${bookObj.title}</h2>
      <h2>${bookObj.subtitle}</h2>
      <h2>${bookObj.author}</h2>
      <p>${bookObj.description}</p>
      <h4>Likes</h4>
      <ul id='likes-list'></ul>
    `
    usersLikes.forEach(user => {
      const li = document.createElement('li')
      li.textContent = user.username
      document.querySelector('#likes-list').append(li)
    });

    const likeBtn = document.createElement('button')
    likeBtn.id = 'like-btn'
    showPanel.append(likeBtn)
    
    if(!alreadyLiked) {
      likeBtn.textContent = 'LIKE'
    } else {
      likeBtn.textContent = 'UNLIKE'
    }
  }
  
  const likeHandler = () => {
    document.addEventListener('click', e => {
      if(e.target.id === 'like-btn') {
        const likeBtn = e.target
        const bookId = likeBtn.parentElement.dataset.bookId
        getLikes(bookId)
      }
    })
  }

  
  const getLikes = (book) => {
    
    fetch(baseBookUrl + book)
    .then(response => response.json())
    .then(book => {
      const currentLikes = book.users
      const alreadyLiked = currentLikes.find( user => user.username === currentUser.username)
      
      if(!alreadyLiked) {
        currentLikes.push(currentUser)
        addLike(currentLikes, book.id)
      } else {
        currentLikes.pop(currentUser)
        addLike(currentLikes, book.id)
      }
    })
    
  }
  
  const addLike = (currentLikes, book) => {
  
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      }, 
      body: JSON.stringify({
        users: currentLikes
        })
      }
  
      fetch(baseBookUrl + book, options)
        .then(response => response.json())
        .then(book => renderBookDetail(book))
    
  }
  
  getBooks()
  clickHandler()
  likeHandler()
});
