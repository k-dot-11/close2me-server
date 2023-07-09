const express = require("express");
const cors = require('cors')

const app = express();

const merchantRoutes = require("./routes/merchantRoutes.js");
const offerRoutes = require("./routes/offerRoutes.js");

app.set("port", process.env.PORT || 8000);

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use("/merchants", merchantRoutes);
app.use("/offers", offerRoutes);

app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
