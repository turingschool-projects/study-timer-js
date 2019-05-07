var submitTime = $('.submit-time');
var startStop = $('.start-stop');
var countdown = $('.countdown');
var timerOn = false;
var timeLeft;
var timer;

submitTime.on('click', prepareTimer);

function prepareTimer(event) {
  event.preventDefault();
  var timeToSet = $('.study-time').val();
  var timeString = parseInt(timeToSet);

  startStop.text(`Set Timer for ${timeString} minutes`);
}

startStop.on('click', toggleTimer);

function toggleTimer() {
  if (timerOn) {
    timerOn = false;
    pauseTimer();
  } else {
    var timeToSet = $('.study-time').val();
    timeLeft = localStorage.getItem('timeLeft') || $('.study-time').val();
    timerOn = true;
    startTimer();
  }
}

function pauseTimer() {
  clearInterval(timer);
}

function startTimer() {
  countdown.text(`${timeLeft} minutes`);
  localStorage.setItem('timeLeft', timeLeft);
  
  timer = setInterval(decrementTimer, 1000)
}

function decrementTimer() {
  if (timeLeft > 1) {
    countdown.text(`${timeLeft} minutes`);
    timeLeft -= 1;
    var timeString = timeLeft.toString();
    localStorage.setItem('timeLeft', timeString);
  } else if (timeLeft == 1) {
    countdown.text(`${timeLeft} minute`);
    timeLeft -= 1;
    var timeString = timeLeft.toString();
    localStorage.setItem('timeLeft', timeString);
  } else if (timeLeft == 0) {
    countdown.text(`Times up!`);
    var timeString = timeLeft.toString();
    localStorage.clear();
    $('.start-stop').text("");
    $('.study-time').val("");
  }
}
