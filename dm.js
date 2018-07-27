const T = require("./bootstrap.js");
const myUsername = require("./config").userName;
const timeout = 1000 * 60 * 5;

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Start Sending Auto Direct Message 🚀🚀🚀");
  stream.on("follow", sendMessage);
};

const sendMessage = user => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: generateMessage(name)
  };
  // the follow stream track if I follow author person too.
  if (screen_name.toLowerCase() != myUsername.toLowerCase()) {
    console.log(" 🎉🎉🎉🎉 New Follower  🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message sent successfully To  ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};

const generateMessage = name => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hey ${name}! Thanks for the follow. If you are a dev and want to showcase your skills, definitely check out https://hackerlog.io. I hope you have an awesome ${dayName} 😊 🔥 👌`;
};

module.exports = AutoDM;
