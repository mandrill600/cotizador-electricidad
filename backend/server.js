import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend Cotizador OK");
});

app.get("/api/trabajos", (req, res) => {
  res.json([]);
});

app.listen(process.env.PORT, () => {
  console.log("Servidor activo");
});
