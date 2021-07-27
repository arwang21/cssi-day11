console.log("script running!");

const notesRef = firebase.database().ref();

const signInButton = document.querySelector("#signInButton");
const signInGoogleButton = document.querySelector("#signInGoogleButton");
const signIn = document.querySelector("#signIn");

/****************** SPICY *********************/
//DOESN'T REALLY MAKE SENSE TO USE THE SAME FIREBASE DATABASE 
//might make more sense to the user (username/passcode) be the parent node and their notes be the child node 
//but would require altering write/view notes codes
//also no form validation at all

const signInGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        //show pop-up window for sign in, return promise
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            window.location = "writeNote.html";
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log("I'M BROKE!");
            console.log(errorCode);
            console.log(errorMessage);
        });

}

const logIn = () => {
    let userField = document.querySelector("#username");
    let myUser = userField.value;
    let passField = document.querySelector("#password");
    let myPass = passField.value;
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const count = 0;
        for(let key in data) {
            const note = data[key];
            if(myUser==note.label && myPass==note.text) {
                window.location = "writeNote.html";
                count ++;
            }
        }
        if(count == 0) {
            userField.value = "";
            userField.placeholder = "Bad username";
            passField.value = "";
            passField.placeholder = "or bad password";
        }
    })
}

const signUp = () => {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    notesRef.push({
        label: username,
        text: password,
        time: '',
        title: ''
    })
    signInAccount();
}

const showSignUp = () => {
    let form = `<div class="field">
                    <label class="label has-text-left">Create a Username</label>
                    <div class="control">
                        <input class="input is-medium" type="text" id="username" placeholder="username">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label has-text-left">Create a Password</label>
                    <div class="control">
                        <input class="input is-medium" type="text" id="password" placeholder="password">
                    </div>
                  </div>
                  <div class="control">
                    <button id="submitSignUp" class="button is-link is-fullwidth has-text-weight-medium is-medium">Sign Up</button>
                  </div>
                  <br>
                  <p id="logIn" class="has-text-centered">
                    <a id="logInButton">
                        Log In
                    </a>
                  </p>`;
    signIn.innerHTML = form;
    const submitSignUp = document.querySelector("#submitSignUp");
    submitSignUp.addEventListener('click', signUp);
    const logInButton = document.querySelector("#logInButton");
    logInButton.addEventListener('click', signInAccount);
}

const signInAccount = () => {
    let form = `<div class="field">
                    <label class="label has-text-left">Username</label>
                    <div class="control">
                        <input class="input is-medium" type="text" id="username" placeholder="username">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label has-text-left">Password</label>
                    <div class="control">
                        <input class="input is-medium" type="text" id="password" placeholder="password">
                    </div>
                  </div>
                  <div class="control">
                    <button id="submitLogIn" class="button is-link is-fullwidth has-text-weight-medium is-medium">Log In</button>
                  </div>
                  <br>
                  <p id="createAccount" class="has-text-centered">
                    <a id="signUpButton">
                        Create Account
                    </a>
                  </p>`;
    signIn.innerHTML = form;
    const submitLogIn = document.querySelector("#submitLogIn");
    submitLogIn.addEventListener('click', logIn);
    const signUpButton = document.querySelector("#signUpButton");
    signUpButton.addEventListener('click', showSignUp);
}

signInGoogleButton.addEventListener('click', signInGoogle);
signInButton.addEventListener('click', signInAccount);
