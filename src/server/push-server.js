const webpush = require("web-push");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const port = 3001;
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

//웹 푸시 설정 (VAPID 키 필요)
webpush.setVapidDetails(
  "mailto:your@email.com",
  "BLnQms9ktVqh96CHi-dq8oy54tTRrOeFG6_I5Omc4kUUsH23Vk2rYbmHKMSk2bix5bcChMk1f3Zg6E2S3Sml_Ro",
  "dvuBb47uLpqvLSHtGEx8mQImBYXSyTPL6f6g6D4p6vU"
);

// 푸시 알림 구독 엔드포인트
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});

  // 실제로 푸시 알림을 보내는 로직
  const payload = JSON.stringify({
    title: "pwa alram",
    body: "Push Notification",
  });
  webpush.sendNotification(subscription, payload).catch((error) => {
    console.error("푸시 알림 보내기 오류:", error);
  });
});

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});

// 웹 푸시 설정 (VAPID 키 필요)
// webpush.setVapidDetails(
//   "mailto:your@email.com",
//   "BLnQms9ktVqh96CHi-dq8oy54tTRrOeFG6_I5Omc4kUUsH23Vk2rYbmHKMSk2bix5bcChMk1f3Zg6E2S3Sml_Ro",
//   "dvuBb47uLpqvLSHtGEx8mQImBYXSyTPL6f6g6D4p6vU"
// );

// // 푸시 알림 구독
// app.post("/subscribe", (req, res) => {
//   const subscription = req.body;
//   res.status(201).json({});

//   // 실제로 푸시 알림을 보내는 로직
//   const payload = JSON.stringify({ title: "Push Notification" });
//   webpush.sendNotification(subscription, payload);
// });

// app.listen(7777, () => {
//   console.log("Push server is running on port 7777");
// });
