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

loadDashboardUser();

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

function loadDashboardUser() {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      const uid = user.uid;
      let forUserName = document.getElementById("forUserName");
      forUserName.innerHTML = user.displayName || "user";
      console.log(user, "im here");

      // for skymiles balance of each users

      const userDoc = await db.collection("users").doc(uid).get();

      if (userDoc.exists) {
        const userData = userDoc.data();

        const balance = userData.skymilesBalance;

        console.log("SkyMiles:", balance);

        let balanceShower = document.querySelector(".balanceShower");

        balanceShower.innerHTML = `<div class="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col h-full justify-between">
<div class="flex justify-between items-start">
<div class="flex flex-col">
<span class="text-xs font-bold tracking-widest uppercase opacity-80 mb-1">SkyMiles Balance</span>
<span class="text-4xl font-extrabold tracking-tight">${balance}</span>
</div>
<span class="material-symbols-outlined text-4xl opacity-50" data-icon="flight_takeoff">flight_takeoff</span>
</div>
<div class="mt-8">
<div class="flex justify-between text-sm mb-2">
<span>Platinum Tier Status</span>
<span>85% to Diamond</span>
</div>
<div class="w-full bg-on-primary-container/20 h-2 rounded-full overflow-hidden">
<div class="bg-on-primary-container h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
</div>
</div>
</div>`;
      }

      // lets fetch users details from firestore wih our the collection i created

      try {
        // const userDocRef = db.collection("users").doc(uid);
        // const userDoc = await userDocRef.get();
        // for bookings

        // const userDocRef = await db
        //   .collection("users")
        //   .where("userId", "==", user.uid)
        //   .get();

        const pendingRef = await db
          .collection("pendingBookings")
          .where("userId", "==", user.uid)
          .get();
        console.log(pendingRef);
        let pendingContainer = document.querySelector(".pendingContainer");
        pendingContainer.innerHTML = "";
        pendingRef.forEach(async (doc) => {
          const pending = doc.data();
          const classType = pending.classType;
          const flightDoc = await db
            .collection("flights")
            .doc(pending.flightId)
            .get();

          const flight = flightDoc.data();

          pendingContainer.innerHTML += `<div class="flex items-center gap-6 p-4 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-all">
<div class="w-20 h-20 rounded-lg overflow-hidden shrink-0">
<img class="w-full h-full object-cover" data-alt="Tokyo skyline at night" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-vNm1JGjZLsyzuErN6flGCLVoPNsIPJdR2KYGsSz0MVqj1QDZqfmzLcaXs1yPH3hqvX4r76iXsUeHZ2_l6iETPsVvBQRwIs_3lIyAbugLlctoJRxrF_pm215oePVgayHcseM9X0HRya-U9nh6UCjbS-UtoeFGVS_aMRqbS2IbZFyuZH4B3aetY0FuH73qDDBiSlivxhxuWA33vG1t8B0Ie-HCVG9tmhGXMdL4yj0apOnR1kCj3umEvvscQjUz9Yji60SyYmMJxhIy"/>
</div>
<div class="flex-grow">
<div class="flex justify-between">
<h4 class="font-bold text-lg">${flight.to}</h4>
<span class="text-sm text-on-surface-variant">${pending.createdAt
            .toDate()
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}</span>
</div>
<p class="text-sm text-on-surface-variant">From  ${flight.from}</p>
<div class="flex gap-2 mt-2">
<span class="text-xs font-bold bg-surface-container-lowest px-2 py-1 rounded">$${
            flight.price[classType]
          }</span>
<span class="text-xs font-bold bg-surface-container-lowest px-2 py-1 rounded">${
            pending.status
          }</span>
</div>
</div>
<button class="p-2 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>`;
          console.log(pending);
        });

        // const userDoc = userDocRef.doc.data();

        // for bookings
        const completedRef = await db
          .collection("completedBookings")
          .where("userId", "==", user.uid)
          .get();
        console.log(completedRef);
        let bookingContainer = document.querySelector(".bookingContainer");
        bookingContainer.innerHTML = "";
        completedRef.forEach((doc) => {
          const booking = doc.data();
          const formattedDate = booking.bookingDate
            .toDate()
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          console.log(booking);

          ("bookingContainer");
          bookingContainer.innerHTML += `
    <div class="booking-card">
      <div
      class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
    >
      <div class="h-48 relative">
        <img
          alt="Swiss Alps"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          data-alt="Dramatic snow-capped mountain peaks in Switzerland"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEU5XcG61BW6piG3MLlvevJtTgcJ-3sm04GiZUcL1eZJrZ3gpYXSk3vb-ib47MzwFuSsJlJIwD1lsim3J0jB3RoFVDglVjsoYrYNwOO5zhrdwQCsBebtQnAXTvsHkvbRtypIJiS92ASpzxetU7XgLnWWf5G27XKXfgOvngduBEBomc6zlKy3vIEeg60G2POgL1MZtWNpo3U1B45JUZ_SGifmjeD1XxwEevYhF_9IUvgEeDf3dqKGewxYn0OYq_QmKck6C-HeZAByUD"
        />
        <div
          class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary"
        >
          next...
        </div>
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold">${booking.to}</h3>
            <p class="text-sm text-on-surface-variant">${formattedDate}, 2026</p>
          </div>
          <div class="text-right">
            <span
              class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >Status</span
            >
            <span class="text-primary font-bold">${booking.status}</span>
          </div>
        </div>
        <div
          class="flex items-center gap-4 pt-4 border-t border-outline-variant/10"
        >
          <div class="flex -space-x-2">
            <div
              class="w-8 h-8 rounded-full border-2 border-surface-container-lowest overflow-hidden"
            >
              <img
                data-alt="User avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2_02GQquEuu6JpxSSmlqcjBEBdpQLmif0UYYdVYUcc1Mac289_7ADmSBzUpnCkkpNYkWO5c3fBvWKPFv9EN5HW0vOklEtlmLCR8SY5_SN4JMxBDKUSgrDZKX1hPrW9Z78pKHEOGcaat7z478iQXtvEh2YfaWhuuW27BE4a-RPb25889c94nAdkcCRAwMq2CBxmohl3BWyNUc1Wv6Aruy9ldD5MY86uhT4WkFhFgCFeICkRlr8N39S3UEt7_AN7L9CoXPbdr6VspTH"
              />
            </div>
            <div
              class="w-8 h-8 rounded-full border-2 border-surface-container-lowest overflow-hidden"
            >
              <img
                data-alt="Female companion avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDU1iWb39uzxPzszP72O15jGHyGoVF4VJMzVqIT2wt8WuO-cYBl6ivjcOGOp-d6qWlrIp5BTQJR7ajrpWXJtIJbcvtqt_AwTvHCwgLko7mB9td_72SaStL3Mai5bzfWPtPZefLiqfkEQPUwaZO2RLzZT9p0MNmDUeCjXXyTBB0dTqf2NStFz_m6CDIRgV0wQyrlc2CHJQjjRI6B0I4vdUuYdaiHvGEE_CgWIAcuW0xmZxU3Hv7Ed2bmGLME9jI8BccRQVOCpJOfSk9"
              />
            </div>
          </div>
          <span class="text-xs text-on-surface-variant">+1 Guest</span>
          <button
            class="ml-auto bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            Manage Trip
          </button>
        </div>
      </div>
    </div>
    </div>
  `;
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      // User is signed out
      // ...
      console.log("im in the else block");
      window.location.href = "./login.html";
    }
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
