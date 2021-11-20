router = require("express").Router()
controller = require('../controller/controller.js');

// Add Clients
router.get("/home",controller.homePage)
router.post("/home",controller.addClient)
// Show Clients
router.get("/showall",controller.showAll)
// Show Client
router.get("/user/singleuser/:id",controller.singleUser)

// Add Transaction 
router.get("/user/transaction/:type/:id",controller.transactionsPage)
router.post("/user/transaction/:type/:id",controller.transactionProcess)

module.exports = router