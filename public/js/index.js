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

let loginBtn = document.getElementById("loginBtn");
let signUpBtn = document.getElementById("signUpBtn");
let searchBtn = document.getElementById("searchBtn");
let flights = [];

loginBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

signUpBtn.addEventListener("click", () => {
  window.location.href = "signup.html";
});
searchBtn.addEventListener("click", async () => {
  let selectedFrom = document.getElementById("fromWhere").value.trim();
  let selectedTo = document.getElementById("toWhere").value.trim();
  let travelClass = document.getElementById("travelClass").value.trim();

  console.log(selectedFrom, selectedTo, travelClass);
  if (selectedFrom === "" || selectedTo === "" || travelClass === "") {
    alert("Please select departure and destination");
    return;
  }

  try {
    const flightsref = db.collection("flights");
    const querySnapshot = await flightsref
      .where("from", "==", selectedFrom)
      .where("to", "==", selectedTo)
      .where("to", "==", selectedTo)

      .get();

    if (!querySnapshot.empty) {
      flights = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(flights);

      localStorage.setItem("foundFlights", JSON.stringify(flights));
    } else {
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, "==", doc.data());
      // });

      alert("No flights found for this route");
    }
  } catch (error) {
    console.error("Error searching flights:", err);
  }
});
