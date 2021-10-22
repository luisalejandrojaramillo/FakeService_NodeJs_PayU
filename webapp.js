const { v4: uuidv4 } = require('uuid');
const express = require('express');
const application = express();

application.get("/", (req, res) => {
    res.send("Bienvenido")
})

application.post("/pay", (req, res) => {
    const errorResponse = {
        "id": uuidv4(),
        "state": "DECLINED",
        "code": "43",
        "responseMessage": "Network rejected"
    };
    const approvedResponse = {
        "id": uuidv4(),
        "state": "APPROVED",
        "code": "00",
        "responseMessage": "Approved transaction"
    };
    const response = [errorResponse, approvedResponse, approvedResponse]
    res.send(response[generateRandomInt(response.length)])
})

application.post("/antifraud", (req, res) => {
    const values = [true, true, false]
    const response = {
        "cardValidation": values[generateRandomInt(values.length)],
        "payerValidation": true
    };
    res.send(response)
})

application.listen(3000,() => {
    console.log("Server Started");
})

function generateRandomInt(max){
    return Math.floor(Math.random() * max);
}