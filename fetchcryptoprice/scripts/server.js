 
let price = require('crypto-price') // to fetch the crypto price
var express = require('express');

var path = require('path');
const Web3 = require('web3')
const fs = require('fs')

var base ="USD"
var crypto="BTC"

var app = express();
app.listen(8081);
console.log("server is up");

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

price.getCryptoPrice(base, crypto).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
   // console.log(obj.price)
}).catch(err => {
   // console.log(err)
})

price.getBasePrice(base, crypto).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
   // console.log(obj.price)
}).catch(err => {
   // console.log(err)
})

//web3
const address = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
const contAddr = '0xc717092d19E7B4D7035809216f57837bb7ED38b3'
const abi = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "fetchCurrencyMean",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "valInDollar",
          "type": "uint256"
        }
      ],
      "name": "currentMeanCalc",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "last_completed_migration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "completed",
          "type": "uint256"
        }
      ],
      "name": "setCompleted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const web3 = new Web3("http://127.0.0.1:7545")
const contract = new web3.eth.Contract(abi, contAddr)

var curr="ETH"
var usdValue=78
async function storeVal(curr,usdValue) {
    console.log("Calling storeVal")
    var resetVal = await contract.methods.currentMeanCalc(curr,usdValue).send({from:address});
    console.log("Called storeVal")
} 
//storeVal(curr,usdValue)

async function currentMean(curr) {
    console.log("Calling currentMean")
   
    await contract.methods.fetchCurrencyMean(curr).call(  
        (err, result) => {
        console.log("current value ")
        console.log(result)
        val = result;
        console.log("error ")
        console.log(err)
        }
    )

    return val;
} 

currentMean(curr);