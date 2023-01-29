// on sign up page
let openMenu = document.getElementById('open')
let menu = document.getElementById('menu') 

openMenu.addEventListener('click',function(){
    menu.classList.toggle('active')  
})


let signupName = document.getElementById('name');
let signupEmail = document.getElementById('email');
let signupPhone = document.getElementById('phone');
let signupPassword = document.getElementById('password');
let signupUsername = document.getElementById('username');
 
let nameCheck = /^[aA-zZ ]{5,20}$/;
let emailCheck = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-z]{3}$/
let phoneCheck = /^(078|079|072|073)[0-9]{7}$/
let passwordCheck =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%&^])[aA-zZ\d!@$%^&]{3,16}$/
let usernameCheck =/^[aA-zZ]{5,16}[0-9]{1}$/ 

let  signupNameError = document.getElementById('name-error')
let  signupEmailError = document.getElementById('email-error')
let  signupPhoneError = document.getElementById('phone-error')
let  signupPasswordError = document.getElementById('password-error')
let  signupUsernameError = document.getElementById('username-error')

function signup(e){
let  signupNameValue = signupName.value;
let  signupEmailValue = signupEmail.value;
let  signupPhoneValue = signupPhone.value;
let  signupPasswordValue = signupPassword.value;
let  signupUsernameValue = signupUsername.value;

var checkN = nameCheck.test(signupNameValue)
var checkE = emailCheck.test(signupEmailValue)
var checkp = phoneCheck.test(signupPhoneValue)
var checkpa = passwordCheck.test(signupPasswordValue)
var checku = usernameCheck.test(signupUsernameValue)


 console.log(checkE)

if(nameCheck.test(signupName.value) && signupNameValue!==""){
    signupName.style.borderColor = 'black';
    signupNameError.innerHTML= ''; 
   }else{
    signupNameError.innerHTML ='** Write full name please! and character must be less than 20'
    signupNameError.style.color = 'red' 
} 
if(signupNameValue  ===""){
    signupName.style.borderColor = 'red';  
    }else{
    signupName.style.borderColor = 'black';
    }



    if(emailCheck.test(signupEmail.value) && signupEmailValue!==""){
    signupEmail.style.borderColor = 'black';
    signupEmailError.innerHTML= ''; 
   }else{
    signupEmailError.innerHTML ='**Your email is invalid, hint:"Alexandre@gmail.com"'
    signupEmailError.style.color = 'red' 
} 
if(signupEmailValue  ===""){
    signupEmail.style.borderColor = 'red';  
    }else{
    signupEmail.style.borderColor = 'black';
    }


    if(phoneCheck.test(signupPhone.value) && signupPhoneValue!==""){
    signupPhone.style.borderColor = 'black';
    signupPhoneError.innerHTML= ''; 
   }else{
    signupPhoneError.innerHTML ='**your phone number must be 10 digits'
    signupPhoneError.style.color = 'red' ;
} 
if(signupPhoneValue  ===""){
    signupPhone.style.borderColor = 'red';  
    }else{
    signupPhone.style.borderColor = 'black';
    }



    if(passwordCheck.test(signupPassword.value) && signupPasswordValue!==""){
    
    signupPassword.style.borderColor = 'black';
    signupPasswordError.innerHTML= ''; 
   }else{
    signupPasswordError.innerHTML ='**please use strong password contain atleast one lowercase <br> one uppercase,one digits, one special characters'
    signupPasswordError.style.color = 'red' 
} 
if(signupPasswordValue  ===""){
    signupPassword.style.borderColor = 'red';  
    }else{
    signupPassword.style.borderColor = 'black';
    }

    if(usernameCheck.test(signupUsername.value) && signupUsernameValue!==""){
    
        signupUsername.style.borderColor = 'black';
        signupUsernameError.innerHTML= ''; 
       }else{
        signupUsernameError.innerHTML ='**your username must ending by only one number'
        signupUsernameError.style.color = 'red' 
    } 
    if(signupUsernameValue  ===""){
        signupUsername.style.borderColor = 'red';  
        }else{
        signupUsername.style.borderColor = 'black';
        }
    
if(nameCheck.test(signupName.value) && signupNameValue!==""&&
emailCheck.test(signupEmail.value) && signupEmailValue!==""&&
phoneCheck.test(signupPhone.value) && signupPhoneValue!==""&&
passwordCheck.test(signupPassword.value) && signupPasswordValue!==""&&
usernameCheck.test(signupUsername.value) && signupUsernameValue!==""
){

    localStorage.setItem('signupEmail',signupEmailValue)
    localStorage.setItem('signupPassword',signupPasswordValue)
    signupName.value = '';
    signupEmail.value = '';
    signupPhone.value = '';
    signupPassword.value = '';
    signupUsername.value = '';

    signupUsernameError.innerHTML ='Signup successful'
    signupUsernameError.style.color = 'green' 
    setTimeout(function removeSuccess(){
        signupUsernameError.innerHTML ='';
    },3000)
    
}
}