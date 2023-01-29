let openMenu = document.getElementById('open')
let menu = document.getElementById('menu') 

openMenu.addEventListener('click',function(){
    menu.classList.toggle('active')  
})



//on contact 
let  contactEmailInput = document.getElementById('contact-emailInput')
  let  contactNameInput = document.getElementById('contact-nameInput')
    let contactTextareaInput = document.getElementById('contact-textarea')  
let contactBtn = document.getElementById ('contact-btn')
let emailCheck = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-z]{3}$/
let nameCheck = /^[aA-zZ ]{5,20}$/;
let textareaCheck =/^[aA-zZ ]$/

let contactNameError= document.getElementById('signup-name-error')
let contactEmailError= document.getElementById('signup-email-error')
let textareaError= document.getElementById('signup-textarea-error')

contactBtn.addEventListener('click', ()=>{

  let  contactEmailInputValue = contactEmailInput.value
  let  contactNameInputValue= contactNameInput.value
    let contactTextareaInputValue = contactTextareaInput.value  
 
    
    if(nameCheck.test(contactNameInput.value) && contactNameInputValue!==""){
      contactNameInput.style.borderColor = 'black';
      contactNameError.innerHTML= ''; 
     }else{
      contactNameError.innerHTML ='** Write full name please! and character\n must be less than 20'
      contactNameError.style.color = 'red' 
  } 
  if(contactNameInputValue  ===""){
      contactNameInput.style.borderColor = 'red';  
      }else{
      contactNameInput.style.borderColor = 'black';
      }
  
  
  
      if(emailCheck.test(contactEmailInput.value) && contactEmailInputValue!==""){
        contactNameInput.style.borderColor = 'black';
      contactEmailError.innerHTML= ''; 
     }else{
      contactEmailError.innerHTML ='**Your email is invalid, hint:"Alexandre@gmail.com"'
      contactEmailError.style.color = 'red' 
  } 
  if(contactEmailInputValue  ===""){
    contactEmailInput.style.borderColor = 'red';  
      }else{
        contactEmailInput.style.borderColor = 'black';
      }
  if(contactTextareaInputValue  ===""){
    contactTextareaInput.style.borderColor = 'red';  
    textareaError.innerHTML ='** please fill this place';
    textareaError.style.color = 'red'
      }else{
        contactTextareaInput.style.borderColor = 'black';
        
      }
  
      
  if(emailCheck.test(contactEmailInput.value) && contactEmailInputValue!==""&&
     nameCheck.test(contactNameInput.value) && contactNameInputValue!==""&&
 contactTextareaInputValue!==""
  ){
  
    const storage = JSON.parse(localStorage.getItem('storeValue'))  || []
    console.log('storage', storage)
   
    storage.push({
        id: storage.length +1,
        contactEmailInputValue:contactEmailInputValue,
        contactNameInputValue :contactNameInputValue ,
        contactTextareaInputValue:contactTextareaInputValue,
        
       })
       
   contactNameInput.style.borderColor = 'black';
   contactEmailInput.style.borderColor = 'black';
   contactEmailInput.value = "";
   contactNameInput.value= "";
   contactTextareaInput.value = "" ;
   
   
  
   textareaError.innerHTML ='You sent an email.Soon you will be replied'
   textareaError.style.color = 'green' 
      setTimeout(function removeSuccess(){
        textareaError.innerHTML ='';
      },3000)

      let localStoreValue = localStorage.setItem('storeValue', JSON.stringify(storage))  
  }   
 

 

 })






