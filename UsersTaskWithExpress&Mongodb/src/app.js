//call required installed pacakages
const chalk = require("chalk")
const express = require("express")
const hbs = require("hbs")

//create express instance
const app = express()
app.use(express.urlencoded({extended:true}))

//call required built-in packages
const path = require("path")
const fs = require("fs")

//load configuration file .env
require("dotenv").config()
// const port = 3000


//use views, partials, statics
const layoutDir = path.join(__dirname,"../frontend/layout")
const viewsDir = path.join(__dirname,"../frontend/view")
const staticDir = path.join(__dirname,"../public")

app.use(express.static(staticDir))
app.set("views",viewsDir)
app.set("view engine","hbs")
hbs.registerPartials(layoutDir)

// Routes
const routes = require("../routes/user.routes.js")
app.use("/user",routes)

module.exports= app