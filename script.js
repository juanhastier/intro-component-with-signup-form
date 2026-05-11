const form = document.querySelector('form')

// Mapeo de validadores por ID
const validationMap = {
  firstname: textFieldValidate,
  lastname: textFieldValidate,
  email: emailValidate,
  password: passwordValidate
}

// Estado de campos "tocados"
const touched = {
  firstname: false,
  lastname: false,
  email: false,
  password: false
}

function touchAll() {
  Object.keys(touched).forEach(key => touched[key] = true)
}

function resetTouch() {
  Object.keys(touched).forEach(key => touched[key] = false)
}

// Funciones de validación (reciben el input)
function textFieldValidate(input) {
  return input.value.trim() === '' ? `${input.placeholder} cannot be empty` : ''
}

const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function emailValidate(input) {
  const value = input.value.trim()
  if (value === '') return `${input.placeholder} cannot be empty`
  if (!emailRegEx.test(value)) return `Looks like this is not an ${input.placeholder}`
  return ''
}

function passwordValidate(input) {
  const value = input.value
  if (value === '') return `${input.placeholder} cannot be empty`
  if (value.length < 8) return `${input.placeholder} must be longer than 8 characters`
  return ''
}

// Validación genérica
function validateField(input) {
  const validateFn = validationMap[input.id]
  if (!validateFn) return true // Si no hay validador, asume válido

  const errorMessage = validateFn(input)
  const errorSpan = input.nextElementSibling

  if (errorMessage) {
    input.classList.add('form__input--error')
    input.setAttribute('aria-invalid', 'true')
    if (errorSpan) errorSpan.textContent = errorMessage
    return false
  } else {
    input.classList.remove('form__input--error')
    input.setAttribute('aria-invalid', 'false')
    if (errorSpan) errorSpan.textContent = ''
    return true
  }
}

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault()
  touchAll()

  const inputs = Array.from(form.elements).filter(el => el.type !== 'submit')
  const results = inputs.map(input => validateField(input))
  const isValid = results.every(result => result === true)

  if (isValid) {
    alert('Form submitted successfully!')
    resetTouch()
    form.reset()
  }
})

// Eventos blur e input
Array.from(form.elements).forEach(input => {
  if (input.type === 'submit') return

  input.addEventListener('blur', () => {
    touched[input.id] = true
    validateField(input)
  })

  input.addEventListener('input', () => {
    if (touched[input.id]) validateField(input)
  })
})