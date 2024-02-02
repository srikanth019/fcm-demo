const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const express = require("express");
const cors = require("cors");

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

initializeApp({
  credential: applicationDefault(),
  projectId: "global-impulse-392611",
});

app.get("/", (req, res) => {
  console.log("Hello from Node FCM");
  admin;
  return res.json({ msg: "Hello from Node FCM" });
});

app.post("/send", (req, res) => {
  try {
    const senderToken = req.body.token;
    const message = {
      notification: {
        title: "FCM Notification",
        body: "Testing FCM notification",
      },
      token: senderToken || "",
    };

    getMessaging()
      .send(message)
      .then((result) => {
        return res.status(200).json({
          message: `Successfully sent message ${result}`,
          token: senderToken || "",
        });
      })
      .catch((error) => {
        console.log("Error while sending message", error);
        return res.status(400).send(error);
      });
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(400).send(error);
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
