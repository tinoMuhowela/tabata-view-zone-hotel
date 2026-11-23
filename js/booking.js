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

stayForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (checkIn.value === "" || checkOut.value === "") {
    stayError.textContent = "Please choose both check-in and check-out dates.";
    return;
  }

  if (checkOut.value <= checkIn.value) {
    stayError.textContent = "Check-out must be after check-in.";
    return;
  }

  stayError.textContent = "";
});