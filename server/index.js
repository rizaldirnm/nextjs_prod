const express = require("express");
const path = require("path");
const next = require("next");
const bodyParser = require("body-parser");

//Setting nextjs
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//IMPORT ROUTING
const auth = require("./routes/auth");

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    //ROUTES API
    server.use("/api/vi/auth", auth);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.use("/api/test", (req, res) => res.json({ hello: "Body" }));

    //Maping PORT
    const PORT = process.env.PORT || 3000;
    server.use(handle).listen(PORT, err => {
      if (err) throw err;
      console.log("> Ready on port " + PORT);
    });
  })
  .catch(err => console.log(err));
