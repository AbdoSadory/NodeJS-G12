const fs = require("fs")
const uniqid = require("uniqid")

const { MongoClient, ObjectId } = require("mongodb")
const dbHost = "mongodb://localhost:27017"
const dbconnection =(cb)=>{
    MongoClient.connect(dbHost,{},(err,client)=>{
        if(err) return cb(err,false)
        const dbClient = client.db("users12")
        cb(false,dbClient)
    })
}

// const readDataFromJSON = () => {
//     let data
//     try{
//         data = JSON.parse(fs.readFileSync('./model/user.json'))
//         if (!Array.isArray(data)) throw new Error()
//     }
//     catch (e) {
//         data = []
//     }
//     return data
// }

// const writeDataToJSON = (data) => {
//     fs.writeFileSync('./model/user.json', JSON.stringify(data))
// }

// const addUser = (req, res) => {
//     if (req.query.name) {
//         let allUsers = readDataFromJSON()
//         let user = {
//             ...req.query,
//             id: uniqid()
//         }
//         allUsers.push(user)
//         writeDataToJSON(allUsers)
//         res.redirect('/user/addUser')
//     }
//     res.render('add', {
//         pageTitle: "add new user"
//     })
// }

const welcome = (req, res) => {
    res.send("Welcome")

}
const addPost = (req, res) => {
    res.render('addPost', {
      pageTitle: "add new user POST"
   })
}

const addPostLogic = (req, res) => {
    if (req.body.name) {
    const user  = {...req.body}
    dbconnection((err,client)=>{
        if(err) res.render("notFound")
        client.collection("data").insertOne(user,(err,r)=>{
            if (err) res.render("notFound", {pageTitle: "Failed Process"})
            res.redirect('/user/addUserPost')})
    })
    }
}
const singleUser = (req, res) => {
    dbconnection((err, client) => {
        if (err) res.render("notFound")
        client.collection("data").findOne({ _id: new ObjectId(req.params.id)},
        (e,data)=>{
            if (e) res.render("notFound")
            if (!data) res.render("notFound")
            res.render("singleuser", {
                pageTitle: "Single User",
                user:data
            })
        }
        )
    })
}
const showAll = (req, res) => {
    dbconnection((err, client) => {
        if (err) res.render("notFound")
        client.collection("data").find().toArray((err,data)=>{
            if (err) res.render("notFound", { pageTitle: "Failed Process" })
            res.render("showall", {
                pageTitle: "All Users",
                allUsers: data,
                noData: data.length == 0 ? true : false
            })
        })
    })
}

const editUser =  (req, res) => {
    res.render("edit",{
      pageTitle:"Edit User",
    })

}
const editUserLogic= (req,res) =>{
    dbconnection((err,client)=>{
        if(err) res.render("notFound")
        client.collection("data").updateOne({ _id: new ObjectId(req.params.id)},
        {$set:{
                name : req.body.name,
                age : req.body.age,
                email: req.body.email
            }}
        )
        .then (r=> res.redirect("/user/showall"))
        .catch(e =>res.render("notFound", { pageTitle: "Failed Process" }))
    })
}


const delAll = (req, res) => {
    dbconnection((err, client) => {
        if (err) res.render("notFound")
        client.collection("data").deleteMany()
        .then(r => res.redirect("/user/showall"))
        .catch(e => res.render("notFound", { pageTitle: "Failed Process" }))
    })
}

const delSingle = (req, res) => {
    dbconnection((err, client) => {
        if (err) res.render("notFound")
        client.collection("data").deleteOne({_id : new ObjectId(req.params.id)})
        .then(r => res.redirect("/user/showall"))
        .catch(e => res.render("notFound", { pageTitle: "Failed Process" }))
    })
}

module.exports = 
{
    welcome, 
    editUser,
    editUserLogic,
    showAll,
    singleUser, 
    delAll, 
    delSingle,
    addPost,
    addPostLogic
}