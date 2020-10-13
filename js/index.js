document.addEventListener("DOMContentLoaded", function() {


  const renderbooks = bookobj =>{
      for(const book of bookobj){
          renderbook(book)
      }
    }

   const clickhandler = () =>{
    const ul = document.getElementById("list")

    ul.addEventListener("click" ,e =>{
        const li = e.target
        const bookid = li.dataset.bookid
        renderBookInfo(bookid)
    })

   }

   function getusers(bookuser){
       for(const book of bookuser.users ){
         const p = document.getElementById('user')
         const li = document.createElement('li')
          li.innerHTML = book.username
          console.log(li)
          p.appendChild(li)
       }
   }
   
   const renderBookInfo = (bookid) =>{
       const panel = document.getElementById("show-panel")
       const ul = document.createElement("ul")
       panel.appendChild(ul)
       fetch("http://localhost:3000/books")
        .then(res => res.json())
        .then(books =>{
         for(const book of books){
             if(book.id == bookid){
                 
                panel.innerHTML = `
                 <img alt="" src="${book.img_url}" />
                 <h2>${book.title}</h4>
                 <h3> ${book.subtitle}</h3>
                 <p>${book.description}</p>
                 <ul id="user"></ul>
                 `
                 getusers(book)
             }
         }
        
   })
}
   
   
    const renderbook = (bookobj)=>{
       const ul = document.getElementById("list")

       const li = document.createElement("li")

       li.dataset.bookid = bookobj.id

       li.innerHTML = `
       ${bookobj.title}`

       ul.appendChild(li)

   }
    
    
    const getBooks = ()=>{
        fetch("http://localhost:3000/books")
        .then(res => res.json())
        .then(data => renderbooks(data))
    }
    // data[0].users[0].username
    clickhandler()
    getBooks()
});
