const { v4: uuidv4 } = require('uuid');
const express = require('express');
const application = express();

application.use(express.json())

application.get("/", (req, res) => {
    res.send("Hello")
})

application.post("/pay", (req, res) => {

    if (req.body.creditCard.securityCode == "510") {
        res.send(iso51Response)
    } else if (req.body.creditCard.securityCode == "330") {
        res.send(iso33Response)
    } else {
        res.send(approvedResponse)
    }
})

application.post("/refund", (req, res) => {

    if (req.body.message == "REJECTED") {
        res.send(invalidRefResponse)
    } else {
        res.send(approvedResponse)
    }
})

application.post("/antifraud", (req, res) => {

    const isValidPayer = req.body.payer.name == "REJECTED" ? false : true;
    const isValidCard = req.body.creditCard.securityCode == "666" ? false : true;
 
    const response = {
        "cardValidation": isValidCard,
        "payerValidation": isValidPayer
    };
    console.log(response)
    res.send(response)
})

application.listen(3000,() => {
    console.log("Server Started");
})

const iso33Response = {
    "id": uuidv4(),
    "state": "DECLINED",
    "code": "33",
    "responseMessage": "Expired card, pick-up"
};

const iso51Response = {
    "id": uuidv4(),
    "state": "DECLINED",
    "code": "51",
    "responseMessage": "Insufficient funds"
};

const invalidRefResponse = {
    "id": uuidv4(),
    "state": "DECLINED",
    "code": "xxx",
    "responseMessage": "Declined refund"
};

const approvedResponse = {
    "id": uuidv4(),
    "state": "APPROVED",
    "code": "00",
    "responseMessage": "Approved transaction"
};