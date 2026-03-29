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

let myButton = document.getElementById("logInBtn");

function LogInUser() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("all fields are mandatory");
    return;
  }
  showLoadingandDisable("loading..", true);

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert("login successful");
      window.location.href = "../dashboard.html";

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      showLoadingandDisable("Login", false);
    });
}
function showLoadingandDisable(text, isloading) {
  myButton.textContent = text;
  myButton.disabled = isloading;
}
