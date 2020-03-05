const container = document.querySelector(".container");
const seatsDivs = document.querySelectorAll(".row .seat:not(.occupied)");
const countSpan = document.querySelector("#count");
const totalSpan = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

let ticketPrice = Number(movieSelect.value);

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  console.log(selectedSeatsCount);
  countSpan.innerText = selectedSeatsCount;
  totalSpan.innerText = selectedSeatsCount * ticketPrice;
}

// movie select event listener
movieSelect.addEventListener("change", event => {
  ticketPrice = Number(event.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", event => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
