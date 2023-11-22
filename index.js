const express = require("express");
const app = express();
const port = 3000;

app.get("/home", (req, res) =>
  res.json({
    nama: "dsadsa",
    umur: 20,
  })
);
app.listen(port, () => console.log(`Aplikasi berjalan di port ${port}!`));
