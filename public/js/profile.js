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
let fullNameInput = document.getElementById("fullNameInput");
let phoneInput = document.getElementById("phoneInput");
let saveProfileChanges = document.getElementById("saveProfileChanges");
const streetInput = document.getElementById("streetInput");
const cityInput = document.getElementById("cityInput");
const countryInput = document.getElementById("countryInput");

window.addEventListener("DOMContentLoaded", () => {
  loadProfileUser();
});

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

saveProfileChanges.addEventListener("click", (e) => {
  e.preventDefault();
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "./login.html";

      // User is signed out, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
    } else {
      console.log("im in the else block");

      try {
        const file = profileImageInput.files[0];

        await user.updateProfile({
          displayName: fullNameInput.value.trim(),
        });
        await db
          .collection("user")
          .doc(user.uid)
          .set(
            {
              fullName: fullNameInput.value.trim(),
              phone: phoneInput.value.trim(),
              address: {
                street: streetInput.value.trim(),
                city: cityInput.value.trim(),
                country: countryInput.value.trim(),
              },
            },
            { merge: true }

            // merging so i dont overwrite other fields
          );

        alert("details updated succeccfully! retry profile picture");

        // Profile updated!
        // ...

        loadProfileUser();
      } catch (error) {
        console.log(error);
      }
    }
  });
});

function logOutUser() {
  let canLogout = confirm("are you sure?");
  if (canLogout) {
    if (canLogout) {
      auth
        .signOut()
        .then(() => {
          window.location.href = "../login.html";
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
  }
}
function loadProfileUser() {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User

      const userDoc = await db.collection("user").doc(user.uid).get();
      const userData = userDoc.data();
      let fullNameTag = document.querySelectorAll(".fullNameTag");
      let emailTag = document.querySelectorAll(".emailTag");
      let phoneTag = document.querySelectorAll(".phoneTag");

      fullNameTag.forEach((element) => {
        element.textContent = user.displayName || "user";
        element.value = user.displayName || "user";
      });
      emailTag.forEach((element) => {
        element.textContent = user.email ? user.email : "add an email";
        element.value = user.email;
      });
      console.log(userData);

      phoneTag.forEach((element) => {
        element.textContent = userData.phone
          ? userData.phone
          : "add Phone number";
        element.value = userData.phone;
      });
      streetInput.value = userData.address.street;
      cityInput.value = userData.address.city;
      countryInput.value = userData.address.country;
      console.log(user, "im here");

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
}

const profileImageInput = document.getElementById("profileImage");
const profileImagePreview = document.getElementById("profileImagePreview");

profileImageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return alert("no image uploaded");

  // Show preview
  profileImagePreview.src = URL.createObjectURL(file);
});
