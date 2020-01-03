const $ = require("jquery");

const getUser = async (username, token) => {
  let userDetails = fetch(
    `http://localhost:9000/getUser?token=${token}&username=${username}`
  )
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res.original_status === 302) {
        res = res.body;
        userDetails = getUserDetails(res);
      } else {
        userDetails =
          "Cannot process this request at this time. Please try again later";
      }
    })
    .then(() => {
      return userDetails;
    });

  return userDetails;
};

const getUserDetails = html => {
  let profile = $(html).find(".profile");
  let profileHtml = $(profile).html();

  let name = $(profile)
    .find(".fullname")
    .text();
  let username = $(profile)
    .find(".screen-name")
    .text();
  let bio = $(profile)
    .find(".bio")
    .text();

  let stats = $(html).find(".profile-stats");

  let following = $(stats)
    .find(".stat:contains(Following)")
    .find(".statnum")
    .text();
  let followers = $(stats)
    .find(".stat:contains(Followers)")
    .find(".statnum")
    .text();
  let tweets = $(stats)
    .find(".stat:contains(Tweets)")
    .find(".statnum")
    .text();

  let user = {
    name,
    username,
    bio,
    following,
    followers,
    tweets,
    profileHtml,
    html
  };
  return user;
};
export default getUser;
