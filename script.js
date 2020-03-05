const container = document.querySelector(".container");
const seatsDivs = document.querySelectorAll(".row .seat:not(.occupied)");
const countSpan = document.querySelector("#count");
const totalSpan = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

let ticketPrice = Number(movieSelect.value);

populateUI();

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // console.log(selectedSeats);

  // copy selected seats & map through array and return selected index array
  const seatsIndex = [...selectedSeats].map(seat =>
    [...seatsDivs].indexOf(seat)
  );

  // store the selected index array in localStorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount);
  countSpan.innerText = selectedSeatsCount;
  totalSpan.innerText = selectedSeatsCount * ticketPrice;
}

// save current selected index & price
function saveMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Populate UI from localStorage
function populateUI() {
  // Get selected seats
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seatsDivs.forEach(getSelectedSeats);
  }

  // updateSelectedCount();
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const selectedMoviePrice = Number(localStorage.getItem("selectedMoviePrice"));

  //===========================================
  function getSelectedSeats(seat, index) {
    if (selectedSeats.indexOf(index) > -1) {
      seat.classList.add("selected");
    }
  }
}

// movie select event listener
movieSelect.addEventListener("change", event => {
  ticketPrice = Number(event.target.value);
  // save current selected index & value (price)
  saveMovieData(event.target.selectedIndex, event.target.value);

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

// Initial count and total
updateSelectedCount();
