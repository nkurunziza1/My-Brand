let adminOpen = document.getElementById('admin-open')
let adminContent = document.getElementById('admin-content')   
adminOpen.addEventListener('click',(e)=>{
    adminContent.classList.toggle('focus')
    e.preventDefault()   
   })


   function deleteComment(id){
      let  getStore= JSON.parse(localStorage.getItem('blogValues'))
         
      let index1 = getStore.commentWords.findIndex((obj) => obj.id === id)
      
      getStore.commentWords.splice(index1, 1)
  
      localStorage.setItem('blogValues', JSON.stringify(getStore))
  
      window.location.reload()  
   }

   
 function showComment(){
    let params = (new URL(document.location)).searchParams;
    let name = params.get('id')
    
    let getStore =JSON.parse(localStorage.getItem('blogValues'))
   
    let blogCont = getStore.find(x => x.id == name)

    let filteredComments = getStore.commentWords.filter(value => value.articleId === name)
    let commentAppend = document.getElementById('comment-message')
    

  for(let valu of filteredComments) {
   let div = document.createElement('div')

       div.innerHTML = `
       <h3>${blogCont.blogTitleInputValue}</h3>
       <p>${valu.commentvalue}</p>
        <button onclick=deleteComment(${valu.id})>Delete</button> 
        
   `
    commentAppend.appendChild(div)
  } 
    


 }

showComment()
