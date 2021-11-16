const route = require("express").Router()
const controller = require("../controller/user.controller")


route.get("", controller.welcome)
//route.get("/addUser", controller.addUser)
route.get("/addUserPost", controller.addPost)
route.post("/addUserPost", controller.addPostLogic)
route.get("/edit/:d", controller.editUser)
route.post("/edit/:id",controller.editUserLogic)
route.get("/showall", controller.showAll)
route.get("/singleuser/:id", controller.singleUser)
route.get("/deleteAll", controller.delAll)
route.get("/delete/:id", controller.delSingle)

module.exports=route
