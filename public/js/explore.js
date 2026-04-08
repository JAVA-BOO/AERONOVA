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

// const flightsJSON = localStorage.getItem("foundFlights");

// const flights = JSON.parse(flightsJSON);
// console.log(flights);

let loginBtn = document.getElementById("loginBtn");
let signUpBtn = document.getElementById("signUpBtn");
let searchBtn = document.getElementById("searchBtn");
let flightsCards = document.getElementById("flightsCards");
let flightsHeading = document.getElementById("flightsHeading");

loginBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

signUpBtn.addEventListener("click", () => {
  window.location.href = "signup.html";
});

const nav = document.getElementById("nav");
const navLogged = document.getElementById("navLogged");

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in -> show logged-in nav, hide guest nav
    nav.classList.add("hidden");
    navLogged.classList.remove("hidden");


    let toggleBtn = document.getElementById("toggleBtn");
    let menuBar = document.getElementById("menuBar");
    let closeMenu = document.getElementById("closeMenu");
    let profileIcon = document.getElementById("profileIcon");
    let userIcon = document.getElementById("userIcon");

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
  } else {
    // User is signed out -> show guest nav, hide logged-in nav
    nav.classList.remove("hidden");
    navLogged.classList.add("hidden");
  }
});
if (localStorage.getItem("fromDashboard")) {
}

window.addEventListener("DOMContentLoaded", () => {
  const flightsJSON = localStorage.getItem("foundFlights");
  const selectedFrom = JSON.parse(localStorage.getItem("selectedFrom"));
  const selectedTo = JSON.parse(localStorage.getItem("selectedTo"));

  const flights = JSON.parse(flightsJSON);
  console.log(flights);

  flightsHeading.innerHTML = `
  <p class="flex flex-row gap-2">
  ${selectedFrom}  <span class="material-symbols-outlined">
arrow_right_alt
</span> ${selectedTo} Flights </p>`;
  setTimeout(() => {
    displayFlights(flights);
  }, 2000);
});

function changeFlightsHeading() {}

function displayFlights(flights) {
  flightsCards.innerHTML = ``;
  if (flights) {
    flights.forEach((flights, index) => {
      let dpt = flights.from;
      let newDpt = dpt.slice(dpt.length - 4, dpt.length - 1);
      let art = flights.to;
      let newArt = art.slice(art.length - 4, art.length - 1);

      flightsCards.innerHTML += ` 
         <div
            class="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/15 hover:shadow-xl transition-all duration-300 mb-6"
          >
          <div class="flex flex-col xl:flex-row" id="flightsCards">
      <div
              class="flex-1 p-6 flex flex-col sm:flex-row items-center gap-8 border-b xl:border-b-0 xl:border-r border-outline-variant/10"
            >
              <div class="flex items-center gap-4 min-w-[180px]">
                <div
                  class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center p-2"
                >
                  <img
                    alt="${flights.airline} Logo"
                    class="w-full h-auto object-contain"
                    data-alt="${flights.airline} minimalist airline logo"
                    src="${getFlightImg(flights.airline)}"
                  />
                </div>
                <div>
                  <h4 class="font-headline font-bold text-on-surface">
                    ${flights.airline}
                  </h4>
                  <p class="text-xs text-on-surface-variant font-medium">
                    ${flights.flightNumber}
                  </p>
                </div>
              </div>
              <div
                class="flex-1 flex items-center justify-between gap-4 w-full"
              >
                <div class="text-center sm:text-left">
                  <p
                    class="text-2xl font-headline font-extrabold text-on-surface"
                  >
                    ${flights.departureTime}
                  </p>
                  <p class="text-sm font-bold text-on-surface-variant">${newDpt}</p>
                </div>
                <div class="flex-1 flex flex-col items-center max-w-[120px]">
                  <p class="text-xs font-bold text-on-surface-variant mb-1">
                    ${flights.duration}
                  </p>
                  <div
                    class="w-full h-0.5 bg-outline-variant relative flex items-center justify-center"
                  >
                    <div
                      class="w-2 h-2 rounded-full bg-primary border-2 border-surface absolute left-0"
                    ></div>
                    <div
                      class="w-2 h-2 rounded-full bg-primary border-2 border-surface absolute right-0"
                    ></div>
                    <span
                      class="material-symbols-outlined text-primary text-xs absolute bg-surface" style="font-size: 15px"
                      >flight</span
                    >
                  </div>
                  <p class="text-[10px] font-bold text-primary mt-1"> ${
                    flights.stops.length === 0
                      ? "Direct"
                      : flights.stops.length + " stop(s)"
                  } </p>
                </div>
                <div class="text-center sm:text-right">
                  <p
                    class="text-2xl font-headline font-extrabold text-on-surface"
                  >
                    ${flights.arrivalTime}
                  </p>
                  <p class="text-sm font-bold text-on-surface-variant">${newArt}</p>
                </div>
              </div>
            </div>
            <!-- Pricing Tiers Section -->
              <div
                class="p-4 grid grid-cols-3 gap-3 min-w-[320px] bg-surface-container-low"
              >
                <button
                  class="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-lowest hover:bg-primary-container/10 border border-outline-variant/10 transition-colors"
                 onclick="bookFlights('${flights.id}', 'economy')"
                >
                  <span
                    class="text-[10px] font-bold text-on-surface-variant uppercase"
                    >Economy</span
                  >
                  <span
                    class="text-lg font-headline font-extrabold text-on-surface"
                    >$${flights.price.economy}</span
                  >
                </button>
                <button
                  class="flex flex-col items-center justify-center p-3 rounded-lg bg-primary text-on-primary shadow-md hover:bg-primary-container transition-all"
                  onclick="bookFlights('${flights.id}', 'premium')"
                >
                  <span
                    class="text-[10px] font-bold text-on-primary/80 uppercase"
                    >Premium</span
                  >
                  <span class="text-lg font-headline font-extrabold">$${
                    flights.price.premium
                  }</span>
                </button>
                <button
                  class="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-lowest hover:bg-primary-container/10 border border-outline-variant/10 transition-colors"
                  onclick="bookFlights('${flights.id}', 'business')"
                >
                  <span
                    class="text-[10px] font-bold text-on-surface-variant uppercase"
                    >Business</span
                  >
                  <span
                    class="text-lg font-headline font-extrabold text-on-surface"
                    >$${flights.price.business}</span
                  >
                </button>
              </div>
            </div>
            </div>
            
            `;
    });
  } else {
    flightsCards.innerHTML = ` <div
            class="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/15 hover:shadow-xl transition-all duration-300"
          >
            <div class="flex flex-col xl:flex-row">
              <!-- Flight Detail Section -->

              <div class="skeleton title min-full lg:w-full"></div>

              <!-- Pricing Tiers Section -->
            </div>
          </div>`;
  }
}

async function bookFlights(flightId, classType) {
  console.log(flightId);
  console.log(classType);

  const user = auth.currentUser;
  if (!user) {
    alert("Please Login first!");
    window.location.href = "./login.html";
    return;
  }

  try {
    const docRef = await db.collection("pendingBookings").add({
      userId: user.uid,
      flightId: flightId,
      classType: classType,
      status: "pending",
      createdAt: new Date(),
    });

    alert("Booking Created Successfully");
    console.log(docRef.id);

    window.location.href = `./booking.html?id=${encodeURIComponent(docRef.id)}`;
  } catch (error) {
    console.log(error);
    alert("Error Creating booking");
  }
}

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
    let spinner = document.getElementById("spinner");

    spinner.classList.remove("hidden");
    const flightsref = db.collection("flights");
    const querySnapshot = await flightsref
      .where("from", "==", selectedFrom)
      .where("to", "==", selectedTo)
      .where("to", "==", selectedTo)
      .get();
    if (querySnapshot.empty) {
      spinner.classList.add("hidden");

      alert("No flights found for this route");
      return;
    }
    if (!querySnapshot.empty) {
      flights = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      localStorage.setItem("selectedFrom", JSON.stringify(selectedFrom));
      localStorage.setItem("selectedTo", JSON.stringify(selectedTo));

      localStorage.setItem("foundFlights", JSON.stringify(flights));

      setTimeout(() => {
        flightsHeading.innerHTML = `
  <p class="flex flex-row gap-2">
  ${selectedFrom}  <span class="material-symbols-outlined">
arrow_right_alt
</span> ${selectedTo} Flights </p>`;
        displayFlights(flights);
        spinner.classList.add("hidden");
      }, 1000);
      return;
    }
  } catch (error) {
    console.error("Error searching flights:");
  }
});

function getFlightImg(flightName) {
  switch (flightName) {
    case "Qatar Airways":
      return "./images/qatar.png";
    case "Delta":
      return "./images/delta.png";
    case "Emirates":
      return "./images/emirate.png";
    case "British Airways":
      return "./images/britishairways.png";
    case "Air Canada":
      return "./images/aircadana.png";
    case "Lufthansa":
      return "./images/lufthansa.png";
    case "Virgin Atlantic":
      return "./images/virginatlantic.png";
    case "Air France":
      return "./images/airfrance.png";
    case "KLM":
      return "./images/klm.png";
    case "South African Airways":
      return "./images/southafrican.png";
    case "Singapore Airlines":
      return "./images/singapore.png";

    default:
      return "../images/skyair.avif";
  }
}
// dashboard nav

let goToProfileBtn = document.querySelectorAll(".goToProfileBtn");
let exploreBtn = document.getElementById("exploreBtn");

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
