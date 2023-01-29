let adminOpen = document.getElementById('admin-open')
let adminContent = document.getElementById('admin-content')
adminOpen.addEventListener('click', () => {
    adminContent.classList.toggle('focus')

})


function deleteList(id){
    let getBlogValue = JSON.parse(localStorage.getItem('blogValues'))
    console.log(getBlogValue)
    const index = getBlogValue.findIndex((obj) => obj.id === id)
    
    getBlogValue.splice(index, 1)

    localStorage.setItem('blogValues', JSON.stringify(getBlogValue))

    window.location.reload()
}

function editBlog(id){
    let blogValues = JSON.parse(localStorage.getItem('blogValues'))
    
    const index = blogValues.findIndex((obj) => obj.id === id)

    
    blogValues[index]

    localStorage.setItem('editableBlog', JSON.stringify(blogValues[index]))

   window.location.href='edit.html' 
}




function getValue(){
    let messageTable = document.getElementById('message-table')
    let getBlogValue = JSON.parse(localStorage.getItem('blogValues'))
    
    console.log('hello')

    for (const value of getBlogValue) {
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `<td> ${value.blogTitleInputValue}</td>
        <td> ${value.blogDate}</td>
        
        <td>
        <button onclick ="editBlog(${value.id})">Edit</button>
        <button onclick ="deleteList(${value.id})">Delete</button>
        </td>
       
        `
        messageTable.appendChild(tableRow)

    }  
  }
  getValue()