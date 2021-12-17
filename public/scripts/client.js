/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // hide error messages
  $('.error-long').hide();
  $('.error-null').hide();

  // hide compose tweet
  $('.compose-tweet').hide();

  // load and render tweets
  loadTweets();

  // Handler for tweet form .submit()
  $("#target").submit(function (event) {
    event.preventDefault();
    const url = "http://localhost:8080/tweets/";
    const text = $(this).serialize().split("=").pop();
    const data = $(this).serialize();
    const charLimit = 140;

    // POST if tweet is not empty and under 140 characters
    if (text && text.length <= charLimit) {
      $.ajax({
        method: "POST",
        url: url,
        data: data,
        success: () => {
          loadTweets();
          // reset counter
          $('.tweet-form')[0].reset();
          const counter = $('.tweet-form')[0][2];
          $(counter).html(charLimit);

          $('.error-long').slideUp();
          $('.error-null').slideUp();
        }
      });
      // error messages
    } else if (text.length >= charLimit) {
      $('.error-null').hide();
      $('.error-long').slideDown();
    } else if (!text) {
      $('.error-long').hide();
      $('.error-null').slideDown();
    }
  });
});

const focusTweetText = () => {
  if ($('.compose-tweet').is(":hidden")) {
    $('.compose-tweet').slideDown();
  } else {
    $('.compose-tweet').slideUp();
  }
  document.getElementById("tweet-text").focus();
}

const loadTweets = () => {
  $.ajax('http://localhost:8080/tweets/', {
      method: 'GET'
    })
    .then(function (data) {
      renderTweets(data);
    });
};

const renderTweets = tweets => {
  // loops through tweets
  $('#tweet-section').empty();
  for (const tweet of tweets.reverse()) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweet-section').append($tweet);
  }
};

const createTweetElement = tweet => {
  const time = timeago.format(tweet.created_at);
  const $tweet = `
  <article class="tweet">
    <header class="tweet-header">
      <div class="tweet-header-left">
        <img src="${tweet.user.avatars}">
        <p class="tweet-name">${tweet.user.name}</p>
      </div>
      <div class="tweet-header-right">
        <p class="tweet-username">${tweet.user.handle}</p>
      </div>
    </header>
    <div class="tweet-message">
      <p>${tweet.content.text}</p>
    </div>
    <footer class="tweet-footer">
      <div class="tweet-footer-left">
        <p>${time}</p>
      </div>
      <div class="tweet-footer-right">
        <i class="footer-icon fas fa-flag fa-xs"></i>
        <i class="footer-icon fas fa-retweet fa-xs"></i>
        <i class="footer-icon fas fa-heart fa-xs"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};