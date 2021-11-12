const form = document.getElementById("application")
const tbody = document.querySelector(".body1")
const btnAllClients = document.getElementById("allClients")
const clientDivTable = document.getElementById("clientDivTable")
const clientTableTbody = document.querySelector(".clientTableBody")

function readDataFromLocalStorage(){
    let data 
    try{
        data = JSON.parse(localStorage.getItem("Clients"))
        if (!data || !Array.isArray(data)) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
//////////////////////////////
function writeDataToLocalStorage (data){
    localStorage.setItem("Clients",JSON.stringify(data))
}
//////////////////////////////
function addClient(client){
    let data = readDataFromLocalStorage();
    data.push(client);
    writeDataToLocalStorage(data)
}
///////////////////////////////
if (form){
    btnAllClients.addEventListener("click", function (e) {
        window.location.replace("clients.html")
    })

    form.addEventListener("submit",function(e){
        e.preventDefault()
        const clientDetails = {
            accountNumber : Date.now(),
            name: this.elements.clientName.value,
            address : {
                city: this.elements.clientCity.value,
                street: this.elements.clientStreet.value,
                building: this.elements.clientBuilding.value
            },
            balance: this.elements.clientBalance.value,
            transactions : []
        }
        //console.log(clientDetails)
        addClient(clientDetails)
        this.reset()
    })
}


const createMyOwnElement = (parent, ele, txt = null, classes = null) => {
    myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if (txt) myElement.textContent = txt
    if (classes) myElement.classList = classes
    return myElement
}

function showClients() {
    tbody.innerText = ""
    data = readDataFromLocalStorage()
    //console.log(data[0].transactions) 
    data.forEach((u, i) => {
        console.log(u.balance)
        const tr = document.createElement("tr")

        const accountNumTd = document.createElement("td")
        accountNumTd.textContent = u.accountNumber

        const nameTd = document.createElement("td")
        nameTd.textContent = u.name

        const balanceTd = document.createElement("td")
        balanceTd.textContent = u.balance

        const actionTd = document.createElement("td")

        const showBtn = document.createElement('button')
        showBtn.classList.add('btn', "btn-success")
        showBtn.textContent = "Show Client"

        const withdrawBtn = document.createElement('button')
        withdrawBtn.classList.add('btn', 'btn-danger', 'ms-2')
        withdrawBtn.textContent = "Withdraw"
        
        const addBalanceBtn = document.createElement('button')
        addBalanceBtn.classList.add('btn', 'btn-danger', 'ms-2')
        addBalanceBtn.textContent = "Add Balance"

        
        actionTd.appendChild(showBtn)
        actionTd.appendChild(withdrawBtn)
        actionTd.appendChild(addBalanceBtn)

        tr.appendChild(accountNumTd)
        tr.appendChild(nameTd)
        tr.appendChild(balanceTd)
        tr.appendChild(actionTd)

        tbody.appendChild(tr)
        ////////////////////////////////////////////////////
        showBtn.addEventListener("click", function (e) {
            //console.log("hello1")
            //u.index = i;
            localStorage.setItem("usersIndex",JSON.stringify(i))
            window.location.replace("client.html")
            
        })

        withdrawBtn.addEventListener('click',function(e){
            
            let amount = parseFloat(prompt("Enter Money Amount"));
            balance = parseFloat(u.balance)
            // console.log(balance)
            if(amount > 100 && amount <= balance) {
                balance = balance-amount
                let newData = { type: "Withdraw", amount: amount, newBalance: balance}
                u.balance = balance
                u.transactions.push(newData) 
                console.log(u.transactions)
                writeDataToLocalStorage(data)
                document.location.reload()

            } else {
                return alert("The Money amount must be more than 100 and less than your Balance")
                document.location.reload()
            }
        })
        
        addBalanceBtn.addEventListener('click',function(e){
            
            let amount = parseFloat(prompt("Enter Money Amount"));
            balance = parseFloat(u.balance)
            if(amount > 100 && amount <= 6000) {
                balance = balance+amount
                let newData = { type: "Add Balance", amount: amount, newBalance: balance}
                u.balance = balance
                u.transactions.push(newData) 
                console.log(u.transactions)
                writeDataToLocalStorage(data)
                document.location.reload()

            } else {
                return alert("The Money amount must be more than 100 and less than 6000")
                document.location.reload()
            }
        })
    });
}


function showClient() {
    index = JSON.parse(localStorage.getItem("usersIndex"))
    data = readDataFromLocalStorage()
    client = data[index]
    console.log(client)
    const AddressDiv = document.createElement("div")

    const accNumberPara = document.createElement("p")
    accNumberPara.textContent = "Account Number : "+client.accountNumber

    const namePara = document.createElement("p")
    namePara.textContent = "Client Name : "+client.name


    const addressCityPara = document.createElement("p")
    addressCityPara.textContent = "City : "+client.address.city

    const addressStreetPara = document.createElement("p")
    addressStreetPara.textContent = "Street : "+client.address.street
    const addressBuildingPara = document.createElement("p")
    addressBuildingPara.textContent = "Building : "+client.address.building

    const balancePara = document.createElement("p")
    balancePara.textContent = "Balance : "+client.balance
    
    const transactionsPara = document.createElement("p")
    transactionsPara.textContent = "Transactions : " 
    
    client.transactions.forEach((u, i) => {
        const tr = document.createElement("tr")
        const typeTd = document.createElement("td")
        typeTd.textContent = u.type
        const amountTd = document.createElement("td")
        amountTd.textContent = u.amount
        const newBalanceTd = document.createElement("td")
        newBalanceTd.textContent = u.newBalance
        
        tr.appendChild(typeTd)
        tr.appendChild(amountTd)
        tr.appendChild(newBalanceTd)

        clientTableTbody.appendChild(tr)
    })
    
    AddressDiv.appendChild(addressCityPara)
    AddressDiv.appendChild(addressStreetPara)
    AddressDiv.appendChild(addressBuildingPara)

    

    clientDivTable.appendChild(accNumberPara)
    clientDivTable.appendChild(namePara)
    clientDivTable.appendChild(AddressDiv)
    clientDivTable.appendChild(balancePara)
    clientDivTable.appendChild(transactionsPara)

}

if (tbody) {
    showClients()
}

if (clientDivTable || clientTableTbody){
     showClient()
}

// function test() {
//     data = readDataFromLocalStorage()
//     data.forEach((u, i) => {
//         console.log(u.name)
//     })
// }
// test()

