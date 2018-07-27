const { get, each } = require("lodash");

const T = require("./bootstrap.js");

const positions = ["developer", "engineer", "lover"];
const languages = [
  "software",
  "web",
  "angular",
  "react",
  "vue",
  "node",
  "javascript",
  "php",
  "laravel",
  "symfony",
  "python",
  "rails",
  "ruby on rails",
  "ruby",
  "go",
  "golang",
  "java"
];

const random = max => Math.floor(Math.random() * (max + 1));

const keyword = () => {
  const position = positions[random(positions.length)];
  const language = languages[random(languages.length)];
  return `${language} ${position}`;
};

const searchForUsers = () => {
  T.get("search/tweets", { q: `${keyword()} since:2017-01-01`, count: 100 })
    .then(result => {
      const tweets = get(result, "data.statuses", null);
      if (tweets) {
        each(tweets, tweet => {
          const user = get(tweet, "user.screen_name");
          followUser(user);
        });
      }
    })
    .catch(err => {
      console.log("Could not search...");
      console.log(err);
    });
};

const followUser = user => {
  T.post("friendships/create", {
    screen_name: user
  })
    .then(result => {
      console.log("Followed " + user);
    })
    .catch(err => {
      console.log("Could not follow " + user);
      console.log(err);
    });
};

searchForUsers();
