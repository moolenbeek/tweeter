/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  loadTweets();
  
  $("#target").submit(function (event) {
    // alert("Handler for .submit() called.");
    event.preventDefault();
    const url = "http://localhost:8080/tweets/";
    const text = $( this ).serialize().split("=").pop();
    const data = $( this ).serialize();
    
    if (text && text.length < 141) {
      $.ajax({
        method: "POST",
        url: url,
        data: data,
        success: function () {
          loadTweets();
          $( '.tweet-form' )[0].reset();
          const counter = $('.tweet-form')[0][2];
          $(counter).html(140);
        }
      })
    } else if (text.length > 141){ 
      window.alert('tweet is more than 140 characters');
    } else if (!text) {
      window.alert('tweet is empty');
    }
  });
});

const focusTweetText = () => {
  document.getElementById("tweet-text").focus();
}

const loadTweets = () => {
  $.ajax('http://localhost:8080/tweets/', { method: 'GET' })
  .then(function (data) {
    renderTweets(data);
  });
}

const renderTweets = tweets => {
  // loops through tweets
  $( '#tweet-section' ).empty();

  for (const tweet of tweets.reverse()) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $( '#tweet-section' ).append($tweet);
  }
}

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
        <i class="fas fa-flag fa-xs"></i>
        <i class="fas fa-retweet fa-xs"></i>
        <i class="fas fa-heart fa-xs"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
}