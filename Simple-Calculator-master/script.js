// Variables
let currentInput = document.querySelector('.currentInput')
let answerScreen = document.querySelector('.answerScreen')
let buttons = document.querySelectorAll('button')
let erasebtn = document.querySelector('#erase')
let clearbtn = document.querySelector('#clear')
let evaluate = document.querySelector('#evaluate')
let numBtn = document.querySelectorAll('.num_btn')
let funBtn = document.querySelectorAll('.fun_btn')
let key = 0
const regex = /[/\-*+]{2,}/g
const regex1 = /.$/

// Calculator Display
let realTimeScreenValue = []

// To Clear
clearbtn.addEventListener('click', () => {
  realTimeScreenValue = ['']
  answerScreen.innerHTML = 0
  currentInput.className = 'currentInput'
  answerScreen.className = 'answerScreen'
  answerScreen.style.color = ' rgba(150, 150, 150, 0.87)'
})

// Get value of any button clicked and display to the screen
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.blur()
    // when clicked button is not erased button
    if (!btn.id.match('erase')) {
      // To display value on btn press
      realTimeScreenValue.push(btn.value)

      if (regex.test(realTimeScreenValue.join(''))) {
        realTimeScreenValue.pop()
      }

      currentInput.innerText = realTimeScreenValue
        .join('')
        .replace(regex, btn.value)

      // To evaluate answer in real time
      if (btn.classList.contains('num_btn')) {
        answerScreen.innerHTML = eval(realTimeScreenValue.join(''))
      }
    }

    // When erase button is clicked
    if (btn.id.match('erase')) {
      realTimeScreenValue.pop()
      currentInput.innerHTML = realTimeScreenValue.join('')
      answerScreen.innerHTML = eval(realTimeScreenValue.join(''))
    }

    // When clicked button is evaluate button
    if (btn.id.match('evaluate')) {
      currentInput.className = 'answerScreen'
      answerScreen.className = 'currentInput'
      answerScreen.style.color = 'white'
    }

    // To prevent undefined error in screen
    if (typeof eval(realTimeScreenValue.join('')) == 'undefined') {
      answerScreen.innerHTML = 0
    }
  })
})

function getKey(event) {
  buttons.forEach(keyPress => {
    if (keyPress.className === 'num_btn') {
      key = +event.key
      if (+keyPress.value === key) {
        keyPress.click()
      }
    }
    if (keyPress.className === 'fun_btn') {
      key = event.key
      if (keyPress.value === key) {
        keyPress.click()
      }
    }
  })
  if (event.key === 'Enter') {
    evaluate.click()
  }
  if (event.key === 'c' || event.key === 'C') {
    clearbtn.click()
  }
  if (event.key === 'Backspace') {
    erasebtn.click()
  }
}

window.addEventListener('keydown', getKey)

// o elemento fica selecionado quando clica em enter ele apaga
