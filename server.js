import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/oauth2redirect", async (req, res) => {
  const code = req.query.code;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "https://google-auth-server-production.up.railway.app/oauth2redirect",
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();

  const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const userData = await userResponse.json();

  res.json({ email: userData.email });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando...");
});
