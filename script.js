let question_field = document.querySelector('.question')
let answer_btns = document.querySelectorAll('.answer')
let h3 = document.querySelector('h3')
let start_btn = document.querySelector('.start-btn')
let container_start = document.querySelector('.start')
let container_main = document.querySelector('.main')


function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
} 


let signs = ['+', '-', '*']
function getRandomSign() {
    return signs[randint(0, 2)]
}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


class Question{
    constructor(){
        let a = randint(1,30)
        let b = randint(1,30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {
            this.correct = a+b
        }
        else if (sign == '-') {
            this.correct = a-b
        }
        else {
            this.correct = a*b
        }
        this.answers = [
            randint(this.correct -7, this.correct -1), 
            randint(this.correct -7, this.correct -1),
            this.correct, 
            randint(this.correct +1, this.correct +7),
            randint(this.correct +1, this.correct +7)]
        shuffle(this.answers)

    }
    display() {
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_btns[i].innerHTML = this.answers[i]    
        } 
    }
}

let total 
let correct 
let cur

start_btn.addEventListener('click', function() {
    container_main.style.display = 'flex'
    container_start.style.display = 'none'
    total = 0
    correct = 0
    cur = new Question()
    cur.display()
    setTimeout(function() {
        container_main.style.display = 'none'
        container_start.style.display = 'flex'
        h3.innerHTML = `Вы дали ${correct}  правильных ответов из ${total}. Точность - ${Math.round(correct/total*100)}%`
}, 10000)

})

for (let i = 0; i < answer_btns.length; i += 1) {
    answer_btns[i].addEventListener('click', function() {
        if (answer_btns[i].innerHTML == cur.correct) {
            answer_btns[i].style.background='#00ff00'
            correct += 1
            anime({
                targets: answer_btns[i],
                background: '#ffffff',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        else {
            answer_btns[i].style.background='#ff0000'
            anime({
                targets: answer_btns[i],
                background: '#ffffff',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        total += 1
        cur = new Question()
        cur.display()

    })
}






