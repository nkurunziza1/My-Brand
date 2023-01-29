let openMenu = document.getElementById('open')
let menu = document.getElementById('menu') 

openMenu.addEventListener('click',function(){
    menu.classList.toggle('active')  
})


  let params = (new URL(document.location)).searchParams;
  let name = params.get('id')
  
  

  const getStorage =JSON.parse(localStorage.getItem('blogValues')) ;

// wibuke ko getStorage is an array
const blogContent = getStorage.find(x => x.id == name)

function takeBlogView(){
    let blogDisplay = document.getElementById('blog-display')
    
        blogDisplay.innerHTML = `
        <div class="single-blog" id="blog-display">
      
        <h1><a href="">${blogContent.blogTitleInputValue}</a></h1>
        <img src="${blogContent.blogImageTitle}"></img>
       <p>
       ${blogContent.blogContentValue}
       </p>
      <div style='display:flex;'>
       <i><img src="/imge&icon/heart like.png" alt="" onclick ="like()"></i>
       <p style="display:flex" ><span style="color: red; margin-right: 5px; " >${blogContent.likes}</span>Likes</p>
       <i><img src="/imge&icon/chat comment.png" alt="" onclick ="like()"></i>
       <p id="comments-number"><span style="color: red; margin-right: 5px;">${blogContent.comments}</span>Comments</p>
       </div>
       <input type="text" placeholder="Enter a name" id="comment-name" 
       class="comment-input"> <br>
       <input type="text" placeholder="Leave comment here" id="comment-input" 
       class="comment-input">
       <input type="submit" name="" value="submit" 
       onclick='comment()' class="comment-submit" >
        <div class="hold-comment" id="hold-comment">
      <h3>Review comments</h3>
     
    </div>
        `
       
    } 
 
  takeBlogView()
let commentInput = document.getElementById('comment-input')
let commentName = document.getElementById('comment-name')
let commentSubmit = document.getElementById('comment-submit')

 function like(){
    let params = (new URL(document.location)).searchParams;
    let name = params.get('id')

    let getStorage =JSON.parse(localStorage.getItem('blogValues')) ;
// wibuke ko getStorage is an array
let blogContent = getStorage.find(x => x.id == name) 
blogContent.likes +=1

const blogIndex = getStorage.findIndex(x => x.id == name)

getStorage[blogIndex] = blogContent;

localStorage.setItem('blogValues', JSON.stringify(getStorage)) 

window.location.reload()
}


function comment(){
let commentInputValue = commentInput.value;
let nameInputValue = commentName.value
  if(commentInputValue === '' || nameInputValue==="")  {
    commentInput.style.borderColor = 'red'
    commentName.style.borderColor = 'red'
  }else{
    let params = (new URL(document.location)).searchParams;
    let name = params.get('id')
    let commentValue = document.getElementById('comment-input').value;
    let nameValue = document.getElementById('comment-name').value;
    
   
    let getStorage =JSON.parse(localStorage.getItem('blogValues'))
   
    let blogContent = getStorage.find(x => x.id == name) 

    blogContent.commentWords.push({
        id:blogContent.commentWords.length +1,
        articleId:name,
        commentvalue:commentValue,
        nameValue:nameValue,
    })
    
    blogContent.comments +=1
    const blogIndex = getStorage.findIndex(x => x.id == name)

    getStorage[blogIndex] = blogContent;
    
    localStorage.setItem('blogValues', JSON.stringify(getStorage))
    
    commentInput.value="";
    commentName.value="";
    commentInput.style.borderColor = 'black'
    commentName.style.borderColor='black'

    window.location.reload()
  }
  

}

  function displayComment(){
    let params = (new URL(document.location)).searchParams;
    let name = params.get('id')
    
    let getStore =JSON.parse(localStorage.getItem('blogValues'))
    let blogCont = getStore.find(x => x.id == name)

    const filteredComments = blogCont.commentWords.filter(value => value.articleId === name)

    let commentAppend = document.getElementById('hold-comment')


  for(let val of filteredComments){
    let div = document.createElement('div')
   
        div.innerHTML = `${val.id}.<span style="color:#000090; font-size:20px;">${val.nameValue}:</span>   <span style="opacity:70%; 
         font-family:  Geneva, Verdana, sans-serif;">${val.commentvalue}</span>`
         commentAppend.appendChild(div)
  }  
    
  //   for(let valu of getStore){
  
  //     for(let val of valu.commentWords){
       
  //      
   
  //     }    
  //  }

    }
  
displayComment()