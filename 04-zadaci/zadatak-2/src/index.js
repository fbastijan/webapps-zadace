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

app.get("/vratiAutore", (req, res) => {
  console.log(tempStorage);
  res.send(tempStorage);
});

app.post("/dodajAutora", (req, res) => {
  var data = req.body;
  if (!("naziv" in data) && !("djela" in data)) {
    res.send({ Error: "Krivi kljucevi" });
  } else {
    var a;
    data.djela.find((el) => {
      console.log(el.length);
      el.length > 20;
      a = el;
    });
    if (!a) {
      a += " ima vise od 20 znakova";
      res.send({ Error: a });
    } else {
      data = { ...data, id: uuidv4() };
      console.log(data);
      tempStorage.push(data);
      res.send(data);
    }
  }
  app.delete("/izrisiDjeloAutora/:id", (req, res) => {
    var { id } = req.params;
    var { nazivDjela } = req.body;
    var dataFound = tempStorage.find((el) => el.id == id);
    dataFound = dataFound.djela.filter((x) => {
      x != nazivDjela;
    });
    console.log(dataFound);
    res.send(tempStorage);
  });
});
app.listen(port, () => console.log(`npm Slušam na portu ${port}!`));
