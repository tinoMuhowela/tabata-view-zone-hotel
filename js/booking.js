const tabs = document.querySelectorAll(".tab");
const stayForm = document.querySelector("#stay-form");
const eventForm = document.querySelector("#event-form");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) {
      t.classList.remove("active");
    });
    tab.classList.add("active");
    if (tab.dataset.tab === "stay") {
      stayForm.classList.remove("hidden");
      eventForm.classList.add("hidden");
    } else {
      stayForm.classList.add("hidden");
      eventForm.classList.remove("hidden");
    }
  });
});

const checkIn = document.querySelector("#check-in");
const checkOut = document.querySelector("#check-out");
const eventDate = document.querySelector("#event-date");

function todayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

checkIn.min = todayString();
checkOut.min = todayString();
eventDate.min = todayString();

checkIn.addEventListener("change", function () {
  checkOut.min = checkIn.value;
});

const stayError = document.querySelector("#stay-error");
const staySummary = document.querySelector("#stay-summary");

function nightsBetween(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((endDate - startDate) / msPerDay);
}
stayForm.addEventListener("submit", function (event) {
  event.preventDefault();
  staySummary.textContent = "";                       // new

  if (checkIn.value === "" || checkOut.value === "") {
    stayError.textContent = "Please choose both check-in and check-out dates.";
    return;
  }

  if (checkOut.value <= checkIn.value) {
    stayError.textContent = "Check-out must be after check-in.";
    return;
  }

  stayError.textContent = "";

  const nights = nightsBetween(checkIn.value, checkOut.value);       // new
  staySummary.textContent =                                          // new
    "Your stay: " + nights + (nights === 1 ? " night" : " nights");  // new
});

const eventError = document.querySelector("#event-error");
const eventGuests = document.querySelector("#event-guests");

eventForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (eventDate.value === "") {
    eventError.textContent = "Please choose the date of your event.";
    return;
  }

  const guests = Number(eventGuests.value);

  if (guests < 10 || guests > 500) {
    eventError.textContent = "We host events for 10 to 500 guests.";
    return;
  }

  eventError.textContent = "";
});