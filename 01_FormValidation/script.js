const regForm = document.getElementById('regForm');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

//Show input Error Message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'mb-3 f-control error';
    const formText = formControl.querySelector('.form-text');
    formText.innerText = message;
}

//show inpur Success Message 
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'mb-3 f-control success';
}


//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
    if(re.test(input.value.trim())) {
        showSuccess(input);
    }else {
        showError(input, 'Email is not Valid');
    }   
}

//Check Required Fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        //console.log(input.value);
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }
        else {
            showSuccess(input);
        }
    });
}

//Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }else {
        showSuccess(input);
    }
}

//check passwords match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords does not match');
    }
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

regForm.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([userName, email, password, confirmPassword]);
    checkLength(userName, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, confirmPassword);
});

