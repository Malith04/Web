const firebaseConfig = {
  apiKey: "AIzaSyCvvvs04KJ0M-OxbldlV78-yxOVJyhAnCE",
  authDomain: "agri-bot-17548.firebaseapp.com",
  databaseURL: "https://agri-bot-17548-default-rtdb.firebaseio.com",
  projectId: "agri-bot-17548",
  storageBucket: "agri-bot-17548.appspot.com",
  messagingSenderId: "437600300267",
  appId: "1:437600300267:web:67baad95b4416cdc2ce2ae"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const moistureGauge = document.getElementById("moisture-gauge");
const moistureValue = document.getElementById("moisture-value");
const pumpStatusDisplay = document.getElementById("pump-status");
const tempDisplay = document.getElementById("temperature");
const humidityDisplay = document.getElementById("humidity");

db.ref("/moisture").on("value", snapshot => {
  const value = snapshot.val();
  moistureValue.textContent = value + "%";
  moistureGauge.style.background = `conic-gradient(#4caf50 0% ${value}%, #444 ${value}% 100%)`;
});

db.ref("/pump").on("value", snapshot => {
  const status = snapshot.val();
  pumpStatusDisplay.textContent = "Pump Status: " + (status ? "ON" : "OFF");
});

db.ref("/weather").on("value", snapshot => {
  const weather = snapshot.val();
  tempDisplay.textContent = weather.temperature;
  humidityDisplay.textContent = weather.humidity;
});

document.getElementById("toggle-pump").addEventListener("click", () => {
  db.ref("/pump").once("value").then(snapshot => {
    const current = snapshot.val();
    db.ref("/pump").set(!current);
  });
});

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("shrink", window.scrollY > 100);
});