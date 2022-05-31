const PushNotification = (token, message, title, type) => {
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
  console.log(data);
  var config = {
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization:
        "key=AAAAXwOL6BI:APA91bFyDJdvRCejfUO-A7n4M_uiONakQys-Ak8LKKZItxE3IGWcEtmkn4_dSlokibK78yudQOQRAs1yTZJ8w8Z2nEQhzpzs-WZHfE6PdBF6Kx9SoNpC2QWu_NPyE6VLp5cxLsJMi9oJ",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

export default PushNotification;
