const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
const express = require("express");

const filePath =
  "./global-impulse-392611-firebase-adminsdk-a3ft5-d9c986ff2b.json";

const app = express();

app.use(express.json());

const serviceAccount = require(filePath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
    admin
      .messaging()
      .send(message)
      .then((res) => {
        return res.status(200).json({
          message: "Successfully sent message",
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
