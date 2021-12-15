/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function () {
  console.log("ready!");
  renderTweets(data);
});


const renderTweets = tweets => {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweet-section').append($tweet);
  }
}

const createTweetElement = tweet => {
  let time = timeago.format(tweet.created_at);
  let $tweet = `
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
  // ...
  return $tweet;
}