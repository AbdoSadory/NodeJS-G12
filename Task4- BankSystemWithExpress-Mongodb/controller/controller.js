const validator =require("validator")

const { MongoClient, ObjectId } = require("mongodb")
const dbHost = "mongodb://localhost:27017"
const dbconnection =(cb)=>{
    MongoClient.connect(dbHost,{},(err,client)=>{
        if(err) return cb(err,false)
        const dbClient = client.db("BankClientsdb")
        cb(false,dbClient)
    })
}

class Client{
    static homePage=(req,res)=>{
        res.render("home", {
            pageTitle:"Home"
        })
    }

    static addClient=(req,res)=>{
        let data = {...req.body, transactions:[]}
        dbconnection((err,client)=>{
            if(err) res.render("notFound")
            client.collection("Clients").insertOne(data, (err,r)=>{
                if(err) res.render("notFound", {pageTitle: "Failed Process"})
                res.redirect("/home")
            })
        })
    }

    static showAll=(req,res)=>{
        dbconnection((err,client)=>{
            if(err) res.render("notFound")
            client.collection("Clients").find().toArray( (err,r)=>{
                if(err) res.render("notFound", {pageTitle: "Failed Process"})
                res.render("allClients",{
                    pageTitle: "All Clients",
                    allClients : r,
                    noData: r.length == 0 ? true : false
                })
            })
        })
    }

    static singleUser=(req,res)=>{
        dbconnection((err,client)=>{
            if(err) res.render("notFound")
            client.collection("Clients").findOne({ _id: new ObjectId(req.params.id)},
            (e,clientData)=>{
                if(e) res.render("notFound")
                if (!clientData) res.render("notFound")
                res.render("client", {
                pageTitle: "Client",
                client:clientData
                })
            })
            
        })
    }

    static transactionsPage = (req,res)=>{
        let transactionType = req.params.type
        let userId = req.params.id
        let type=""
        if(transactionType=="addBalance") type="Add Balance"
        else if(transactionType=="withdraw") type="Withdraw"
        else res.render('notFound', { 
                pageTitle:"Not Found", 
                errMsg:"Requested Transaction Type Not Valid"
        })
        res.render("transaction", {
            pageTitle:`Add Transaction ${transactionType}`,
            userId,
            transactionType:type
        })
    }

    static transactionProcess = (req, res) =>{
        let transactionType = req.params.type
        let userId = req.params.id
        let type=""
        if(transactionType!="addBalance" &&transactionType!="withdraw") {
            res.render('err404', { 
                pageTitle:"Not Found",  
                errMsg:"Requested Transaction Type Not Valid" })
        }

        dbconnection((err,client)=>{
            //if(err) res.render("notFound")
            client.collection("Clients").findOne({ _id: new ObjectId(req.params.id)}),
                async (e,clientData)=>{
                    if(e) res.render("notFound")
                    if (!clientData) res.render("notFound")
                    let amount = +req.body.amount
                    let currentBalance = +clientData.transactions.amount
                    if(transactionType=="withdraw") amount = amount *-1
                    currentBalance+= amount
                    // console.log(clientData.transactions)
                    clientData.clientBalance = currentBalance
                    clientData.transactions.push( 
                            {
                                type:transactionType,
                                amount:req.body.amount,
                                newBalance:currentBalance
                            })
                    clientData.save()
                    res.redirect("/home")
                })
        })
    }
}
module.exports = Client