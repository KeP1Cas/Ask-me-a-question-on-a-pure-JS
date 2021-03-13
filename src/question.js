export class Question {
    static create(question) {
        return fetch(`https://js-questions-a5965-default-rtdb.firebaseio.com/question.json`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(question)
        })
        .then(response => response.json())
        .then(response => {
            question.id = response.name
            return question
        })
        .then(addToLocalStorage)
        .then(Question.renderList)
    }

    static fetchToken(token) {
        if(!token){
            return Promise.resolve('<p class="error">У Вас нет токена!</p>')
        }
        return fetch(`https://js-questions-a5965-default-rtdb.firebaseio.com/question.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if(response && response.error){
                    return `<p class="error">${response.error}</p>`
                }

                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static renderList() {   
        const questions = getQuestionsFromLocalStorage()
        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`

        const list = document.querySelector('#list')

        list.innerHTML = html
    }

    static listToHtml(questions) {
        return questions.length
            ? `<ol>${questions.map(que => `<li>${que.text}</li>`).join('')}</ol>`
            : `<p>Вопросов пока нет</p>`
    }
}

function addToLocalStorage(question){
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br>
    `
}