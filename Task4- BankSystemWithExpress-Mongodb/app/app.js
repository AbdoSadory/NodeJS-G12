// Required Packages
require("dotenv").config()
const express = require('express')
const path = require("path")
const hbs = require("hbs")
const app = express()

// app set& use
app.set('view engine', "hbs")
app.set("views", path.join(__dirname, '../frontend/views'))
app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(path.join(__dirname, '../frontend/layouts'))

app.use(express.urlencoded({extended:true}))
app.use(require('../routes/routes'))
app.get("*", (req,res)=>{
    res.render("notFound",{
        pageTitle:"Not Found"
    })
})

module.exports = app