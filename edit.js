 function getEditableBlog(){
 const editableBlog=  JSON.parse(localStorage.getItem('editableBlog'))
 document.getElementById('blog-title').value= editableBlog.blogTitleInputValue;
 document.getElementById('blog-summary').value= editableBlog.blogSummary;
 editor.html.set(editableBlog.blogContentValue);   
}


function saveBlog(){

    let editableBlog = JSON.parse(localStorage.getItem('editableBlog'))

    let blogValues = JSON.parse(localStorage.getItem('blogValues'))
    let blogIndex = blogValues.findIndex(x => x.id == editableBlog.id)
    
    console.log(blogIndex)

    
  blogValues[blogIndex].blogTitleInputValue=document.getElementById('blog-title').value 
  blogValues[blogIndex].blogSummary=document.getElementById('blog-summary').value
  blogValues[blogIndex].blogContentValue = document.getElementById('blog-content').value


 localStorage.setItem('blogValues', JSON.stringify(blogValues)) 

 document.getElementById('blog-title').value =''
 document.getElementById('blog-summary').value =''
// editor.html.set('')


//     let params = (new URL(document.location)).searchParams;
//     let name = params.get('id')

// let getStorage =JSON.parse(localStorage.getItem('blogValues'));
// // remeber that getStorage is an array
// let blogContent = getStorage.find(x => x.id == name) 
  

// const blogIndex = getStorage.findIndex(x => x.id == name)


// getStorage[blogIndex] = blogContent;
// console.log(getStorage[blogIndex])


}
getEditableBlog()



 





