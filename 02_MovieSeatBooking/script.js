const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;
//console.log(typeof ticketPrice);

populateUI(); 

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeats);
    const selectedSeatsCount = selectedSeats.length;
    //console.log(selectedSeatsCount);

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    //console.log(seatsIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}


//Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); 
    //console.log(selectedSeats);
    if(selectedSeats !==null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


//movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


//seat click event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //console.log(e.target);
    } {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//initial count and total set
updateSelectedCount();