const server = require("./server");

server.get("/", (req, res) => res.render("home"));

server.listen(process.env.PORT || 3000);
