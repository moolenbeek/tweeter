$(document).ready(function () {
  messageCount();
});

const messageCount = () => {
  const message = document.getElementById('tweet-text');
  const counter = document.getElementById('counter');
  message.addEventListener('input', function (element) {
    const target = element.target;

    // count the current number of characters
    const currentLength = target.value.length;
    counter.innerHTML = 140 - currentLength;

    // change to counter to red if below 0
    if (counter.innerHTML > -1) {
      counter.className = "counter";
    } else {
      counter.className = "counter-red";
    }
  });
}