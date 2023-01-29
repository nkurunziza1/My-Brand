
// (,heightMax)
// .editor.html.set('')

// const froala_editorMin = require("froala-editor")

// let editor = new FroalaEditor('#content',{
//     heightMax:2
// }
// )




let adminOpen = document.getElementById('admin-open')
let adminContent = document.getElementById('admin-content')
adminOpen.addEventListener('click', () => {
    adminContent.classList.toggle('focus')

})
let adminBlogMessage = document.getElementById('admin-blog-message')
let uploadImageBtn = document.getElementById('blog-upload-btn')
let blogSubmitBtn = document.getElementById('admin-submit-button')
let blogSummary = document.getElementById('blog-summaryInput')
blogSubmitBtn.addEventListener('click', updateBlog)

let blogImageChooseInput = document.getElementById('blog-imageChoose-input')
let blogTitleInput = document.getElementById('blog-titleInput')
let blogContent = document.getElementById('content')



const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function updateBlog() {
    //    let blogImageChooseInputValue = blogImageChooseInput.value;
    let blogTitleInputValue = blogTitleInput.value;
    let blogContentValue = blogContent.value;
    let blogSummaryValue = blogSummary.value
    var uploadedImage = document.getElementById('blog-imageChoose-input').files[0]


    if (blogTitleInputValue === '') {
        adminBlogMessage.innerHTML = '** you have forgot to fill Blog Title'
        adminBlogMessage.style.color = 'red'
        blogTitleInput.style.borderColor = 'red';
    } else {

        blogTitleInput.style.borderColor = 'black';
        adminBlogMessage.innerHTML = ''
    }
    if (blogSummaryValue === '') {
        adminBlogMessage.innerHTML = '** you have forgot to fill Blog Title'
        adminBlogMessage.style.color = 'red'
        blogTitleInput.style.borderColor = 'red';
    } else {

        blogTitleInput.style.borderColor = 'black';
        adminBlogMessage.innerHTML = ''
    }
    if (blogContentValue === '') {
        adminBlogMessage.innerHTML = ' ** you have forgot to fill Blog content '
        adminBlogMessage.style.color = 'red'
        blogContent.style.borderColor = 'red';
    } else {
        blogContent.style.borderColor = 'black';
        adminBlogMessage.innerHTML = '';
    }


    if (!uploadedImage) {

        adminBlogMessage.innerHTML = "** please upload image the space"
    }

    if (blogTitleInputValue === '' ||
        !uploadedImage || blogContentValue === ''|| blogSummaryValue === '')    {
        adminBlogMessage.innerHTML = "** please fill the space"
    } else {

        blogTitleInput.style.borderColor = 'black';
        blogContent.style.borderColor = 'black';
        blogTitleInput.value = "";
        blogSummary.value="";
        blogContent.value = "";
        blogImageChooseInput.value = "";
        editor.html.set('')

        let storage = JSON.parse(localStorage.getItem('blogValues')) || [];

        let params = (new URL(document.location)).searchParams;
        let name = params.get('id')
        storage.push({
            id:storage.length +1,
            blogTitleInputValue: blogTitleInputValue,
            blogSummary:blogSummaryValue,
            blogImageTitle: await toBase64(uploadedImage),
            blogContentValue: blogContentValue,
            blogDate: new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}),
            likes:0,
            comments:0,
            commentWords:[],  
        })
        
        console.log(storage)
        adminBlogMessage.innerHTML = 'You already create blog'
        adminBlogMessage.style.color = 'green'
        setTimeout(function blogMessage() {
            adminBlogMessage.innerHTML = ''
        }, 3000)
        let storageValue = localStorage.setItem('blogValues', JSON.stringify(storage))
    }
}