console.log(firebase);

// Required for side-effects

const firebaseConfig = {
  apiKey: "AIzaSyCutN4TH1SahRC4TZ8RcyqkvUSt0Ig95FQ",
  authDomain: "aeronova-d3210.firebaseapp.com",
  databaseURL: "https://aeronova-d3210-default-rtdb.firebaseio.com",
  projectId: "aeronova-d3210",
  storageBucket: "aeronova-d3210.firebasestorage.app",
  messagingSenderId: "546554345178",
  appId: "1:546554345178:web:7a325137f9bb71584f17e3",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
console.log(app);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

const auth = firebase.auth();
console.log(auth);

let myButton = document.getElementById("signUpBtn");

function signUpUser() {
  let email = document.getElementById("email").value.trim();
  let fullName = document.getElementById("name").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirm = document.getElementById("confirm").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let termsCheck = document.getElementById("terms").checked;

  if (!email || !fullName || !password || !confirm) {
    alert("all fields are mandatory");
  } else if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
  } else if (confirm !== password) {
    alert("passwords must match");
  } else if (password.length < 8) {
    alert("Password must be atleast 8 character");
  } else if (!termsCheck) {
    alert("You must accept the Terms of Service and Privacy Policy.");
  } else {
    showLoadingandDisable("loading..", true);
    // showLoadingandDisable("loading...", true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        return user.updateProfile({ displayName: fullName }).then(() => user);
      })
      .then((user) => {
        return db.collection("users").doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          createdAt: new Date(),
          role: "user",
          status: "active",
        });
      })
      .then(() => {
        alert("sign up successful");
        // alert(user.displayName)
        window.location.href = "./login.html";
        showLoadingandDisable("Create Account", false);
      })

      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        // ..
      });
  }
}

function showLoadingandDisable(text, isloading) {
  myButton.textContent = text;
  myButton.disabled = isloading;
}

function signInGoogle() {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
