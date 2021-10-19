const express = require('express');
const application = express();

application.get("/", (req, res) => {
    res.send("Bienvenido")
})

application.post("/pay", (req, res) => {
    const response = {
        "id": "1234",
        "state": "APPROVED",
        "code": "00",
        "responseMessage": "Approved transaction"
    };
    res.send(response)
})

application.post("/antifraud", (req, res) => {
    const response = {
        "cardValidation": true,
        "payerValidation": true
    };
    res.send(response)
})

application.listen(3000,() => {
    console.log("Server Started");
})