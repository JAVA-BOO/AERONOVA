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

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

const auth = firebase.auth();
console.log(auth);

let toggleBtn = document.getElementById("toggleBtn");
let menuBar = document.getElementById("menuBar");
let closeMenu = document.getElementById("closeMenu");
let profileIcon = document.getElementById("profileIcon");
let userIcon = document.getElementById("userIcon");
let goToProfileBtn = document.querySelectorAll(".goToProfileBtn");
let exploreBtn = document.getElementById("exploreBtn");

toggleBtn.addEventListener("click", () => {
  menuBar.classList.remove("left-full");
  menuBar.classList.add("left-0");
});

closeMenu.addEventListener("click", () => {
  menuBar.classList.remove("left-0");
  menuBar.classList.add("left-full");
});

profileIcon.addEventListener("click", () => {
  userIcon.classList.toggle("hidden");
});

goToProfileBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        window.location.href = "./profile.html";

        // lets fetch users details from firestore wih our the collection i created

        try {
          // const userDocRef = db.collection("users").doc(uid);
          // const userDoc = await userDocRef.get()
        } catch (error) {}
      } else {
        // User is signed out
        // ...
        console.log("im in the else block");
        window.location.href = "./login.html";
      }
    });

    console.log("im active");
  });
});

function logOutUser() {
  let canLogout = confirm("are you sure?");
  if (canLogout) {
    if (canLogout) {
      auth
        .signOut()
        .then(() => {
          localStorage.removeItem("foundFlights");
          window.location.href = "../login.html";
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
  }
}

exploreBtn.addEventListener("click", () => {
  window.location.href = "./explore.html";
  localStorage.setItem("fromDashboard", true);
});
