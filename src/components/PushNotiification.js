const PushNotification = (token, message, title) => {
  var axios = require("axios");
  var data = JSON.stringify({
    registration_ids: [token],
    notification: {
      body: message,
      title: title,
      content_available: true,
      priority: "high",
    },
  });

  var config = {
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization:
        "key=AAAAkWtpYlI:APA91bHpNAFNGnetjkO-8ZnTHaTQM4Z0D-M2RsrcHDHgk6jgiZhAHizDpWYghzO9YnkfvvYiBiyNFV2PbUEx5KIYkTQcxjHjLPT9zsCsiac2bJvR8sTjq0LKW2FzLOAEFCEHfy777Shh",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default PushNotification;
