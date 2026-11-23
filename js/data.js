const rooms = [
  { id: "standard",  name: "Standard Room",        price: 90,  guests: 2, size: 28, bed: "King bed",  image: "images/room-standard.jpg" },
  { id: "superior",  name: "Superior Garden View", price: 120, guests: 2, size: 33, bed: "King bed",  image: "images/room-superior.jpg" },
  { id: "executive", name: "Executive Room",       price: 160, guests: 3, size: 39, bed: "King bed",  image: "images/room-executive.jpg" },
  { id: "suite",     name: "Executive Suite",      price: 260, guests: 4, size: 65, bed: "King bed and sitting room", image: "images/room-suite.jpg" }

];
const roomList = document.querySelector(".room-list");

rooms.forEach(function (room) {
    const params = new URLSearchParams(window.location.search);
const chosenRoom = params.get("room");

if (chosenRoom && rooms.some(function (r) { return r.id === chosenRoom; })) {
  roomSelect.value = chosenRoom;
}
  const card = document.createElement("div");
  card.classList.add("room-card");

  card.innerHTML = `
    <div class="room-image" style="background-image: url('${room.image}')"></div>
    <div class="room-info">
      <h3>${room.name}</h3>
      <p>${room.size} sqm | ${room.guests} guests | ${room.bed}</p>
      <p class="room-price">From $${room.price} <span>per night</span></p>
      <a href="booking.html?room=${room.id}" class="btn">Book This Room</a>
    </div>
  `;

  roomList.appendChild(card);
});