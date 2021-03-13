import "./styles.css";
import { createModal, isValid } from "./utils";
import { Question } from './question'
import { authWithEmailAndPassword, getAuthForm } from "./auth";

const form = document.querySelector("#form"),
  input = document.querySelector("#question-input"),
  submitBtn = document.querySelector("#submit"),
  modalBtn = document.querySelector("#modal-btn")

window.addEventListener('load', Question.renderList)
form.addEventListener("submit", submitFormHandler);
modalBtn.addEventListener('click', openModal)
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(e) {
  e.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;
    // Async request to server to save question
    Question.create(question).then(() => {
        input.value = "";
        input.className = "";
        submitBtn.disabled = false;
    })
  }
}

function openModal() {
    createModal('Авторизация', getAuthForm())
    document
        .querySelector('#auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(e){
    e.preventDefault();

    const btn = e.target.querySelector('button')
    const email = e.target.querySelector('#email').value
    const password = e.target.querySelector('#password').value

    btn.disabled = true
    authWithEmailAndPassword(email, password)
        .then(token => {
            return Question.fetchToken(token)
        })
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if(typeof content === 'string') {
        createModal('Ошибка!', content)
    } else {
        createModal('Список вопросов', Question.listToHtml(content))
    }
}
