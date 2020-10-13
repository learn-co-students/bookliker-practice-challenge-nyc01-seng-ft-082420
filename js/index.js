document.addEventListener("DOMContentLoaded", function() {

BOOKS_URL = 'http://localhost:3000/books/'
USERS_URL = 'http://localhost:3000/users/'
EXAMPLE_USER = {id:1, username:"pouros"}



//RUNNING FUNCTIONS
getBooks()
clickHandler()






function getBooks() {
    fetch(BOOKS_URL).then(function(response) {
        return response.json()
    }).then(function(data) {
        bookList(data)
    })
        
    
}

function bookList(dataObj) {
    const listPanel = document.getElementById('list')
    
    for (const element of dataObj) {
        const li = document.createElement('li')
        listPanel.append(li)
        li.textContent = `${element.title}`
        li.dataset.bookid = element.id
    }

}



function clickHandler() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('li')) {
            const panel = document.getElementById('show-panel')
            panel.innerHTML = ''
            const bookLi = e.target
            const pageID = bookLi.dataset.bookid
            getBookPage(pageID)

        } else if (e.target.matches('.like')) {
            const button = e.target
            const list = document.querySelector('.book-page-list')
            const bookID = list.dataset.id
            //console.log(bookID)
            if (button) {
                addLike(bookID)
            }
            

        }
    
    
    
    
    
    
    
    })
}



function getBookPage(bookid) {
    
    fetch(BOOKS_URL + bookid).then(function(response) {
        return response.json()
    }).then(function(data) {
        renderBookPage(data)
    })
    
    
     
}

function renderBookPage(data) {
    
    const bookDiv = document.createElement('div')
    const bookPanel = document.getElementById('show-panel')
    const innerList = data.users
    bookPanel.append(bookDiv)
    bookDiv.innerHTML = `<img src= ${data.img_url}/>
                            <h3>${data.title}</h3>
                            <h3>${data.subtitle}</h3>
                            <h3>${data.author}</h3>
                            <p>${data.description}</p>
                            <ul data-id=${data.id} class="book-page-list">
                            </ul>
                            <button class="like"> Like </button>`
    for (const element of data.users) {
        boo_user_arr = []
        const nameList = document.createElement('li')
        const ul = document.querySelector('.book-page-list')
        ul.appendChild(nameList)
        nameList.textContent = `${element.username}`
        nameList.dataset.userno = `${element.id}`
        boo_user_arr.push(element)
        console.log(boo_user_arr)
    }
    
                    
                            
}



function addLike(id) {
    //you are user pouros
    
    // const userList = data.users
    options = {
        method: "PATCH",
        headers: {
            "content-type" : "application/json",
            "accept" : "application/json"
        },
        body: JSON.stringify(
            {
                "users": [
                    {"id":2, "username":"auer"},
                    {"id":8, "username":"maverick"},
                    {"id":1, "username":"pouros"}
                  ]
                
            })    
    }

    fetch(BOOKS_URL + id, options).then(function(response) {
        return response.json()
    }).then(function(data) {
        for (const element of data.users) {

            const ul = document.querySelector(".book-page-list")
            const li = document.createElement('li')
            ul.appendChild(li)
            li.innerHTML = `${element.username}`
        }
    })


}









});
