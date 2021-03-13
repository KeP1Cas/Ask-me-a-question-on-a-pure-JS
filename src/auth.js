export function getAuthForm() {
    
  return `
    <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input type="email" id="email">
      <label for="email" class="input-col"> email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" id="password" required minlength="6">
      <label for="password" class="input-col"> пароль</label>
    </div>
    <button
     type="submit" 
     class="mui-btn mui-btn--raised mui-btn--danger"
     >
     Войти
    </button>
  </form>
    `;
}

export function authWithEmailAndPassword(email, password) {
    const API_KEY = 'AIzaSyDBYCkLBnU2YMcv4blE2rk9ww7mMRAo-Kw'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        })
    })
    .then(response => response.json())
    .then(data => data.idToken) 
}


//sign-up: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
//sign-in: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]