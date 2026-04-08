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
loadBookingDetails();

function loadBookingDetails() {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      alert("Please Log in");
      window.location.href = "./login.html";
      return; // User is signed out
      // ...
    }
    // lets fetch users details from firestore wih our the collection i created

    try {
      const params = new URLSearchParams(window.location.search);
      const bookingId = params.get("id");
      if (!bookingId) {
        alert("no flight selected");
        window.location.href = ".explore.html";
        return;
      }

      console.log(bookingId);

      const doc = await db.collection("pendingBookings").doc(bookingId).get();

      if (!doc.exists) {
        alert("Pending Booking not found");
        return;
      }
      const booking = doc.data();
      console.log(booking);

      const flightDoc = await db
        .collection("flights")
        .doc(booking.flightId)
        .get();

      if (!flightDoc.exists) {
        alert("Flights Details not found");
        return;
      }

      flight = flightDoc.data();
      console.log("flight details", flight);

      displayUserFlightDetails(booking, flight);
    } catch (error) {}
  });
}

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

function displayUserFlightDetails(booking, flight) {
  let flightHead = document.querySelector(".flightHead");
  let scheduleTag = document.querySelector(".scheduleTag");
  let flightDetails = document.querySelector(".flightDetails");
  let flightBookingDetails = document.querySelector(".flightBookingDetails");
  let dpt = flight.from;
  let newDpt = dpt.slice(0, dpt.length - 5);
  let sDpt = dpt.slice(dpt.length - 4, dpt.length - 1);
  let art = flight.to;
  let newArt = art.slice(0, art.length - 5);
  let snewArt = art.slice(art.length - 4, art.length - 1);
  let classType = booking.classType;
  let price = flight.price[classType];
  console.log(price);

  flightHead.textContent = `${newDpt} to ${newArt}`;
  scheduleTag.innerHTML = ` ${flight.from} <span class="mx-2 text-outline">→</span> ${flight.to}`;
  flightDetails.innerHTML = `
    <!-- Connecting Line -->
              <div
                class="absolute left-[11px] top-2 bottom-2 w-0.5 bg-outline-variant/30 border-l-2 border-dashed border-outline-variant"
              ></div>
              <!-- Segment 1 -->
              <div class="relative mb-12">
                <div
                  class="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-surface-container-lowest"
                ></div>
                <div class="flex flex-col md:flex-row justify-between gap-4">
                  <div class="flex-1">
                    <div class="text-xl font-bold">${
                      flight.departureTime
                    } · ${sDpt} </div>
                    <div class="text-on-surface-variant">
                      ${flight.from}
                    </div>
                  </div>
                  
                  <div class="flex-1 md:text-right">
                    <div class="text-xl font-bold">STOPS</div>
                    <div class="text-on-surface-variant">
                      ${(flight.stops = [] ? "No stops" : flight.stops)}
                    </div>
                  </div>
                </div>
                <div
                  class="mt-4 flex flex-wrap gap-4 items-center text-sm text-on-surface-variant"
                >
                  <span class="flex items-center gap-1"
                    ><span class="material-symbols-outlined text-sm"
                      >airline_seat_recline_extra</span
                    >
                    ${flight.airline}</span
                  >
                  <span class="flex items-center gap-1"
                    ><span class="material-symbols-outlined text-sm">wifi</span>
                    High-speed Wi-Fi</span
                  >
                  <span class="flex items-center gap-1"
                    ><span class="material-symbols-outlined text-sm"
                      >restaurant</span
                    >
                    Meal included</span
                  >
                </div>
              </div>
              <!-- Layover -->
              <div
                class="relative mb-12 py-3 px-5 bg-surface-container-low rounded-lg inline-flex items-center gap-3"
              >
                <span class="material-symbols-outlined text-primary"
                  >schedule</span
                >
                <span class="text-sm font-medium"
                  >Duration: ${flight.duration}</span
                >
              </div>
              <!-- Segment 2 -->
              <div class="relative">
                <div
                  class="absolute -left-[27px] bottom-1 w-4 h-4 rounded-full bg-primary ring-4 ring-surface-container-lowest"
                ></div>
                <div class="flex flex-col md:flex-row justify-between gap-4">
                  <div class="flex-1">
                    <div class="text-xl font-bold">${
                      flight.arrivalTime
                    } · ${snewArt}</div>
                    <div class="text-on-surface-variant">
                    ${flight.to}
                    </div>
                  </div>
                  <div class="flex-1 md:text-center">
                    <div class="text-sm font-semibold text-on-surface-variant">
                    Available Seats
                    </div>
                    <div
                      class="text-xs uppercase tracking-widest text-outline mt-1"
                    >
                      Seat ${flight.availableSeats}
                    </div>
                  </div>
                  <div class="flex-1 md:text-right">
                    <div class="text-xl font-bold">Flight Type</div>
                    <div class="text-on-surface-variant">
                      ${flight.type}
                    </div>
                  </div>
                </div>
                <div
                  class="mt-4 flex flex-wrap gap-4 items-center text-sm text-on-surface-variant"
                >
                  <span class="flex items-center gap-1"
                    ><span class="material-symbols-outlined text-sm"
                      >airline_seat_recline_extra</span
                    >
                    Flight ${flight.flightNumber}</span
                  >
                  <span class="flex items-center gap-1"
                    ><span class="material-symbols-outlined text-sm"
                      >charging_station</span
                    >
                    Power outlets</span
                  >
                </div>
              </div>`;

  flightBookingDetails.innerHTML = `
  <div class="p-6 bg-primary text-on-primary">
              <h3 class="text-xl font-bold">Booking Summary</h3>
              <p class="text-on-primary-container text-sm opacity-90 mt-1">
                Review your selections
              </p>
            </div>
            <div class="p-6 space-y-6">
              <div class="space-y-4">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="font-bold"> ${sDpt} → ${snewArt}</div>
                    <div
                      class="text-xs text-on-surface-variant uppercase tracking-tighter"
                    >
                      ${flight.type} · 1 Adult
                    </div>
                  </div>
                  <div class="font-bold text-primary">£${price}.00</div>
                </div>
                <div class="flex justify-between items-start">
                  <div>
                    <div class="font-bold">Economy</div>
                    <div
                      class="text-xs text-on-surface-variant uppercase tracking-tighter"
                    >
                      Selected cabin
                    </div>
                  </div>
                  <div class="text-sm text-on-surface-variant italic">
                    Included
                  </div>
                </div>
              </div>
              <div class="border-t border-outline-variant/30 pt-4">
                <div
                  class="flex justify-between items-center text-lg font-bold text-on-surface"
                >
                  <span>Total Price</span>
                  <span class="text-2xl text-primary">£${price}.00</span>
                </div>
                <p class="text-xs text-on-surface-variant mt-1">
                  Includes taxes, fees and carrier charges
                </p>
              </div>
              <div class="space-y-3">
                <button
                  class="w-full py-4 bg-tertiary-container text-on-tertiary-container rounded-lg font-bold text-lg shadow-sm hover:brightness-110 transition-all active:scale-[0.98]"
                 id="paymentBtn"
                >
                  Continue to Payment
                </button>
                <p class="text-center text-xs text-on-surface-variant">
                  By continuing you agree to the
                  <a class="underline" href="#">Fare Rules</a>
                </p>
              </div>
            </div>
            <!-- Trust Signals -->
            <div
              class="bg-surface-container-low p-4 flex items-center justify-center gap-4 border-t border-outline-variant/30"
            >
              <div
                class="flex items-center gap-1 text-[10px] font-bold text-outline uppercase"
              >
                <span class="material-symbols-outlined text-sm"
                  >verified_user</span
                >
                Secure Checkout
              </div>
              <div
                class="flex items-center gap-1 text-[10px] font-bold text-outline uppercase"
              >
                <span class="material-symbols-outlined text-sm"
                  >support_agent</span
                >
                24/7 Support
              </div>
            </div>`;

  let paymentBtn = document.getElementById("paymentBtn");
  paymentBtn.addEventListener("click", () => {
    alert("Payment Successfull");
    completeBooking(booking, flight, price);
  });
}

async function completeBooking(booking, flight, price) {
  await db.collection("completedBookings").add({
    userId: booking.userId,
    flightId: booking.flightId,
    classType: booking.classType,
    airline: flight.airline,
    from: flight.from,
    to: flight.to,
    departureTime: flight.departureTime,
    arrivalTime: flight.arrivalTime,
    price: price,
    bookingDate: new Date(),
    status: "confirmed",
  });
}
