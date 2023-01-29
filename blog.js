let openMenu = document.getElementById('open')
let menu = document.getElementById('menu') 

openMenu.addEventListener('click',function(){
    menu.classList.toggle('active')  
})


function takeBlogView(){
    let blogBlock = document.getElementById('all-blogs-content')
    let getBlogValue = JSON.parse(localStorage.getItem('blogValues'))
    
    // console.log('hello')

    for(const value of getBlogValue){
        let blogHold = document.createElement('div')
        blogHold.style.width = "200px";
        
        blogHold.innerHTML = `

        <div class="music-img"> 
        <a href="/alborton.html?id=${value.id}">${value.blogTitleInputValue}</a>
        <img src="${value.blogImageTitle}">
        <p>${value.blogSummary}</p>
      </div>
        <div class="like-comment-share">
                <img src="/imge&icon/hand like.png" alt="">
                <img src="/imge&icon/chat comment.png" alt="" id="comment-btn">
                <!-- <img src="/imge&icon/share icon.png" alt=""> -->
            </div>
            <div class="like-share-comment-p">
            <p><span style="color: red; margin-right: 5px;">${value.likes}</span>Likes</p>
            <p><span style="color: red; margin-right: 5px;">${value.comments}</span>Comment</p>
            <!-- <p><span style="color: red; margin-right: 5px;">12</span>Share</p> -->
        </div>   
        `
        
        blogBlock.appendChild(blogHold)
       
  
 
    }  

    localStorage.setItem('blogValues', JSON.stringify(getBlogValue ))
  }
 
  takeBlogView()

// let params = (new URL(document.location)).searchParams;
// let name = params.get('id')

// console.log(name)