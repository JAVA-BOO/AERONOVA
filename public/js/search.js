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

window.addEventListener("DOMContentLoaded", () => {
  const flightsJSON = localStorage.getItem("foundFlights");
  const selectedFrom = JSON.parse(localStorage.getItem("selectedFrom"));
  const selectedTo = JSON.parse(localStorage.getItem("selectedTo"));

  const flights = JSON.parse(flightsJSON);
  console.log(flights);
  const flightsCards = document.getElementById("flightsCards");
  const flightsHeading = document.getElementById("flightsHeading");

  flightsHeading.innerHTML = `
  <p class="flex flex-row gap-2">
  ${selectedFrom}  <span class="material-symbols-outlined">
arrow_right_alt
</span> ${selectedTo} Flights </p>`;
  setTimeout(() => {
    flightsCards.innerHTML = "";
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
                    alt="British Airways Logo"
                    class="w-full h-auto object-contain"
                    data-alt="British Airways minimalist airline logo"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuByfD2fasCM2d1bR8LtCJ8mZsCjtncTlvsvhzoaewXqJA17iPDOna9vuqc_DGXoGqGNmTh3BA8BirL0JBz4WLFNEo5HvDb7U7FILYeQBWmli5bhE_v_BuXm8bBxEgBP2mlUCGTQBjsnT7L6pHfUn36AsJX5yGNkq8OZdymnFeJFhvVU05jLuMcShLRRghbWJm6uVlnEV8FygDY2zIl4kekneJ_H2I1mKOrWajEnBap58Pqg4BzXJJxrdEj5qW5yLV7tynWX0INTYFq-"
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
  }, 2000);
});
