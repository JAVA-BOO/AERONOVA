console.log(firebase);

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
console.log(app);

const auth = firebase.auth();
console.log(auth);

let myButton = document.getElementById("signUpBtn");

console.log(termsCheck);

function signUpUser() {
  let email = document.getElementById("email").value.trim();
  let username = document.getElementById("name").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirm = document.getElementById("confirm").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let termsCheck = document.getElementById("terms").checked;

  if (!email || !username || !password || !confirm) {
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
    // showLoadingandDisable("loading..", true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        alert("sign up successful");
        window.location.href = "./login.html";
        // ...
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
