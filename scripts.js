const numberBtn = document.querySelectorAll('.number')
const dltBtn = document.getElementById('ac')
const negativeBtn = document.getElementById('negative')
const pctBtn = document.getElementById('percentage')
const opeBtn = document.querySelectorAll('.operator')
const input = document.querySelector('.screen')
const decBtn = document.getElementById('decimal')
const equalBtn = document.getElementById('equal')
let lastBtnPressed = 'number'
let temp1
let temp2
let temp3
let curOpe
let preOpe

decBtn.addEventListener('click', () => {
    input.textContent += decBtn.value
    decBtn.disabled = true
    lastBtnPressed = 'number'
})

numberBtn.forEach(button => button.addEventListener('click', () => {
    if (lastBtnPressed == 'number') {
        input.textContent += button.value
    }
    else if (lastBtnPressed == 'operator' || lastBtnPressed =='equal') {
        input.textContent = button.value
    }
    for (const button of opeBtn) {
        button.classList.remove('clicked')  //remove the classlist at the start so only one button is pressed at a time
    }
    dltBtn.textContent = 'C'
    lastBtnPressed = 'number'
}))

dltBtn.addEventListener('click', () => {
    dltBtn.textContent = 'AC'
    decBtn.disabled = false
    for (const button of opeBtn) {
        button.classList.remove('clicked')  //remove the classlist at the start so only one button is pressed at a time
    }
    if (input.textContent != '') {
        input.textContent = ''
    }
    else {
        input.textContent = ''
        temp1 = null
        temp2 = null
        curOpe = null
        preOpe = null
    }
})

negativeBtn.addEventListener('click', () => {
    input.textContent = -parseFloat(input.textContent) 
})

pctBtn.addEventListener('click', () => {
    input.textContent = parseFloat(input.textContent)/100
})

opeBtn.forEach(button => button.addEventListener('click', () => {
    for (const button of opeBtn) {
        button.classList.remove('clicked')  //remove the classlist at the start so only one button is pressed at a time
    }
    button.classList.add('clicked') //add class 'clicked' to change the color of the button with css
    decBtn.disabled = false
    if (lastBtnPressed == 'operator') { //option to change operator if you misclicked
        curOpe = button.id
    }
    else {
        if (!temp1&&!curOpe) {  //blank start or after reset
            temp1 = parseFloat(input.textContent)
            curOpe = button.id
        }
        else {  //following operator
            if (lastBtnPressed == 'equal') {
                curOpe = button.id
            }
            else {
                preOpe = curOpe
                curOpe = button.id
                temp2 = parseFloat(input.textContent)
                switch (preOpe) {
                    case 'sum':
                        temp1 = sum(temp1,temp2)
                        break;
                    case 'substract':
                        temp1 = substract(temp1,temp2)
                        break;
                    case 'divide':
                        temp1 = divide(temp1,temp2)
                        break;
                    case 'multiply':
                        temp1 = multiply(temp1,temp2)
                }
                input.textContent = temp1
            }
        }
        }
    lastBtnPressed = 'operator'
    
}))

equalBtn.addEventListener('click', () => {
    if (!temp1) {
        temp1 = parseFloat(input.textContent)
        input.textContent = temp1
    }
    else {
        if (lastBtnPressed == 'equal') {
            switch (curOpe) {
                case 'sum':
                    temp1 = sum(temp1,temp2)
                    break;
                case 'substract':
                    temp1 = substract(temp1,temp2)
                    break;
                case 'divide':
                    temp1 = divide(temp1,temp2)
                    break;
                case 'multiply':
                    temp1 = multiply(temp1,temp2)
            }
        }
        else {
            temp2 = parseFloat(input.textContent)
            switch (curOpe) {
                case 'sum':
                    temp1 = sum(temp1,temp2)
                    break;
                case 'substract':
                    temp1 = substract(temp1,temp2)
                    break;
                case 'divide':
                    temp1 = divide(temp1,temp2)
                    break;
                case 'multiply':
                    temp1 = multiply(temp1,temp2)
            }
        }
        input.textContent = temp1
    }
    lastBtnPressed = 'equal'
})

sum = (a, b) => a + b; //operator
substract = (a, b) => a - b;
divide = (a ,b) => a / b;
multiply = (a, b) => a * b;


