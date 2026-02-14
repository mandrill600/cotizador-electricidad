import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import cron from "node-cron";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 10000;

let trabajosCache = [];

async function obtenerTrabajosAAIERIC() {
  try {
    const { data } = await axios.get("https://aaieric.org.ar/", {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);
    const trabajos = [];

    $("table tr").each((i, el) => {
      const tds = $(el).find("td");
      if (!tds || tds.length < 2) return;

      const nombre = $(tds).eq(0).text().trim();
      const precioTexto = $(tds).eq(1).text().trim();
      const precio = parseInt(precioTexto.replace(/[^\d]/g, ""), 10);

      if (nombre && Number.isFinite(precio)) {
        trabajos.push({ id: i, nombre, manoObra: precio });
      }
    });

    if (trabajos.length > 0) {
      trabajosCache = trabajos;
      console.log("Precios actualizados:", trabajos.length);
    }

  } catch (error) {
    console.log("Error actualizando AAIERIC");
  }
}


obtenerTrabajosAAIERIC().then(() => {
  console.log("Primera actualización completa");
});
cron.schedule("0 0 * * *", () => {
  obtenerTrabajosAAIERIC();
});

app.get("/api/trabajos", (req, res) => {
  res.json(trabajosCache);
});

app.get("/", (req, res) => {
  res.send("Backend Cotizador OK");
});

app.listen(PORT, () => {
  console.log("Servidor activo");
});
