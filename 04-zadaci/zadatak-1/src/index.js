import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
var tempStorage = [];

app.get("/vratiObavjesti", (req, res) => {
  console.log(tempStorage);
  res.send(tempStorage);
});
app.get("/vratiObavjest/:id", (req, res) => {
  var { id } = req.params;
  var dataFound = tempStorage.find((el) => el.id == id);
  res.send(dataFound);
});
app.post("/dodajObavjest", (req, res) => {
  var data = req.body;
  var today = new Date().toISOString().slice(0, 10);
  data = { ...data, id: uuidv4(), today };
  console.log(data);
  tempStorage.push(data);
  res.send(data);
});
app.patch("/urediObavjest/:id", (req, res) => {
  var { id } = req.params;
  console.log(id);
  var { sadrzaj } = req.body;
  var dataFound = tempStorage.find((el) => el.id == id);
  dataFound.sadrzaj = sadrzaj;
  console.log(dataFound);
  res.send(tempStorage);
});
app.listen(port, () => console.log(`npm Slušam na portu ${port}!`));
