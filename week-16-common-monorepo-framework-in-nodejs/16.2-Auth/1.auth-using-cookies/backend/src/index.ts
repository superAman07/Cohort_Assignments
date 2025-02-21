import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "test123";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // do db validations, fetch id of user from db
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET);
    // token generate karke cookie me add kar diya....with respective name token or token1...etc
    res.cookie("token", token);
    res.cookie("token1", token);
    res.send("Logged in!");
});

app.get("/user", (req, res) => {
    // ✅ Login ke baad user jab bhi app me aayega, tab vo cookie ke through auto-login rahega.
    const token = req.cookies.token;  // 🍪 Cookie se JWT token le rahe hain
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;  // 🔐 Token verify kar rahe hain
    res.send({
        userId: decoded.id  // 👤 User ID return kar rahe hain
    });
});


app.post("/logout", (req, res) => {
    // logout k baad kuch bhi random value token ko set kar diya...jiska koi role nhi...bass original token ki value ki jagah kuch faltu sa add kar diya
    // ye dono cheeze kar sakte hai...cookie clear karne k liye
    res.clearCookie("token");
    res.cookie("token1", "blablabla");
    res.json({
        message: "Logged out!"
    })
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"))   // <---- ye raha jiski help se hum react ka FE and BE ek hi port pe run kar sakte hai...
})

app.listen(3000);