const form = document.querySelector('form'),
      firstName = document.getElementById('firstname'),
      lastName = document.getElementById('lastname'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),

      errorFirstName = document.getElementById('error-firstname'),
      errorLastName = document.getElementById('error-lastname'),
      errorEmail = document.getElementById('error-email'),
      errorPassword = document.getElementById('error-password')

const touched = {
  firstName: false,
  lastName: false,
  email: false,
  password: false
}

function touchAll() {
  touched.firstName = true
  touched.lastName = true
  touched.email = true
  touched.password = true
}

function resetTouch() {
  touched.firstName = false
  touched.lastName = false
  touched.email = false
  touched.password = false
}

function textFieldValidate(value, field) {
  return value == '' ? `${ field } cannot be empty` : ''
}

const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function emailValidate(value, field) {
  if (value == '') {
    return `${ field } cannot be empty`
  }
  if (!emailRegEx.test(value)) {
    return `Looks like this is not an ${ field }`
  }
  return ''
}

function passwordValidate(value, field) {
  if (value == '') {
    return `${ field } cannot be empty`
  }
  if (value.length < 8) {
    return `${ field } must be longer than 8 characters`
  }
  return ''
}

function validateField(input, field, errorSpan, validateFn) {
  const errorMessage = validateFn(input.value, field)
  if (errorMessage) {
    input.classList.add('form__input--error')
    input.setAttribute('aria-invalid', 'true') 
    errorSpan.textContent = errorMessage
    return false
  } else {
    input.classList.remove('form__input--error')
    input.setAttribute('aria-invalid', 'false') 
    errorSpan.textContent = '' 
    return true
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  touchAll()

  const isFirstNameValid = validateField(firstName, 'First Name', errorFirstName, textFieldValidate)
  const isLastNameValid = validateField(lastName, 'Last Name', errorLastName, textFieldValidate)
  const isEmailValid = validateField(email, 'Email Address', errorEmail, emailValidate)
  const isPasswordValid = validateField(password, 'Password', errorPassword, passwordValidate)

  if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
    alert('Form submitted successfully!')
    
    resetTouch()
    form.reset()
  }
})

firstName.addEventListener('blur', () => {
  touched.firstName = true
  validateField(firstName, 'First Name', errorFirstName, textFieldValidate)
})

lastName.addEventListener('blur', () => {
  touched.lastName = true
  validateField(lastName, 'Last Name', errorLastName, textFieldValidate)
})

email.addEventListener('blur', () => {
  touched.email = true
  validateField(email, 'Email Address', errorEmail, emailValidate)
})

password.addEventListener('blur', () => {
  touched.password = true
  validateField(password, 'Password', errorPassword, passwordValidate)
})

firstName.addEventListener('input', () => {
  if (touched.firstName) {
    validateField(firstName, 'First Name', errorFirstName, textFieldValidate)
  }
})

lastName.addEventListener('input', () => {
  if (touched.lastName) {
    validateField(lastName, 'Last Name', errorLastName, textFieldValidate)
  }
})

email.addEventListener('input', () => {
  if (touched.email) {
    validateField(email, 'Email Address', errorEmail, emailValidate)
  }
})

password.addEventListener('input', () => {
  if (touched.password) {
    validateField(password, 'Password', errorPassword, passwordValidate)
  }
})