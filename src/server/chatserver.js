const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('chat.db');

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST",
}));

const io = require("socket.io")(http, {
  path: '/socket.io',
  serveClient: false, 
  cookie: false, 
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

const chatRooms = {}; 

app.use(express.json());

app.get("/search", (req, res) => {
  const { email } = req.query;

  if (email.length < 5) {
    return res.status(400).json({ error: "검색어는 최소 5자 이상이어야 합니다." });
  }

  const db = new sqlite3.Database("chat.db");

  db.all("SELECT * FROM users WHERE email LIKE ?", [`%${email}%`], (err, rows) => {
    if (err) {
      console.error("데이터베이스 오류:", err);
      return res.status(500).json({ error: "데이터베이스 오류" });
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "검색 결과가 없습니다." });
    }

    const searchResults = rows.map(row => ({ id: row.id, email: row.email, username: row.username }));
    
    const currentUserEmail = req.user ? req.user.email : "";
    
    res.json({ searchResults, currentUserEmail });
    
    createChatRoomsForUsers(searchResults);
  });
});

function createChatRoomsForUsers(users) {
  users.forEach(user1 => {
    users.forEach(user2 => {
      if (user1.id !== user2.id) {
        const roomId = `room-${user1.id}-${user2.id}`;
        if (!chatRooms[roomId]) {
          chatRooms[roomId] = { users: [user1.id, user2.id], messages: [] };
        }
      }
    });
  });
}


app.post("/createroom", (req, res) => {
  const { userId1, userId2 } = req.body;

  const roomId = `room-${userId1}-${userId2}`;
  if (!chatRooms[roomId]) {
    chatRooms[roomId] = { users: [userId1, userId2], messages: [] };
  }
  res.json({ roomId });
});

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS messages (roomId TEXT, text TEXT)");
});

function saveMessage(roomId, text) {
  db.serialize(function() {
    const stmt = db.prepare("INSERT INTO messages (roomId, text) VALUES (?, ?)");
    stmt.run(roomId, text);
    stmt.finalize();
  });
}

function loadMessages(roomId, callback) {
  db.all("SELECT text FROM messages WHERE roomId = ?", [roomId], (err, rows) => {
    if (err) {
      console.error('데이터베이스 오류:', err);
      callback([]);
    } else {
      const messages = rows.map(row => row.text);
      callback(messages);
    }
  });
}

app.get("/chat-rooms/:userId", (req, res) => {
  const userId = req.params.userId;

  const chatRooms = [];

  res.json(chatRooms);
});


// app.get("/current-user", (req, res) => {
//   if (req.user) {
//     const currentUser = {
//       username: req.user.username,
//     };

//     const db = new sqlite3.Database("chat.db");

//     db.get("SELECT * FROM nowloginid WHERE username = ?", [req.user.username], (err, row) => {
//       if (err) {
//         console.error("데이터베이스 오류:", err);
//         return res.status(500).json({ error: "데이터베이스 오류" });
//       }
//       if (row) {
//         currentUser.id = row.id;
//         res.json(currentUser);
//       } else {
//         res.status(404).json({ error: "사용자 정보를 찾을 수 없습니다." });
//       }
//     });
//   } else {
//     res.status(401).json({ error: "사용자 인증이 필요합니다." });
//   }
// });


app.get("/initial-messages", (req, res) => {
  const { roomId } = req.query;

  loadMessages(roomId, (messages) => {
    res.json({ initialMessages: messages });
  });
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    const roomId = data.roomId;
    if (!chatRooms[roomId]) {
      chatRooms[roomId] = { users: [], messages: [] };
    }
    chatRooms[roomId].messages.push(data);

    saveMessage(roomId, data.text);

    io.to(roomId).emit("message", data);
  });
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});