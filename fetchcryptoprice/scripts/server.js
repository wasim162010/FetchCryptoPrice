 
let price = require('crypto-price') // to fetch the crypto price
var express = require('express');
const url = require('url');
const fs = require('fs')
var path = require('path');


const Web3 = require('web3')

//web3

const address = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
const contAddr = '0xce729EF30a4CCa30270042679354Ca448e5c8A9B'
const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "fetchCurrencyLen",
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
			},
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
		"constant": false,
		"inputs": [],
		"name": "initializer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "token",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_wholeNumberPart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fractionalPart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "meanWholePart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "meanFracPart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currLen",
				"type": "uint256"
			}
		],
		"name": "storeInLedger",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


const web3 = new Web3("http://127.0.0.1:7545") //pointing to in memory ganache blockchain.
const contract = new web3.eth.Contract(abi, contAddr)


//expressjs
var app = express();
app.listen(8081);
console.log("server is up");

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/price', function(req, res) {
//      console.log("fetching...")
//      var token = req.query.token
//      var cur = req.query.cur
//       let curPrice = getPrice(cur, token);
// });

async function getPrice(cur, token) {
 let curPrice;
 
  await price.getCryptoPrice(cur, token).then(obj => { // Base for ex - USD, Crypto for ex - ETH 

    curPrice = obj.price;
      console.log("curPrice" + curPrice);
     // res.end(curPrice);

}).catch(err => {
   // console.log(err)
})
  return price;
}

app.put('/store', function(req, res) {
 // 
  var token = req.query.token
  var cur = req.query.cur
  let curPrice;

//   price.getCryptoPrice(cur, token).then(obj => { 
//        curPrice = obj.price;
//        console.log(curPrice);
//        res.end(curPrice);
// }).catch(err => {

// })

  curPrice =  getPrice(cur, token);
  storeVal(token,curPrice);
  res.end('saving in ledger');
});

app.get('/mean', function(req, res) {
  res.end('fetching the current mean');
  var token = req.query.token
  let mean = currentMean(token);
});


async function currentCounter(tokenType) {
  console.log("Calling currentCounter")

  var val=0;
  try {
    let fetchVal = await contract.methods.fetchCurrencyLen(tokenType).call(  
      (err, result) => {
      console.log("fetchCurrencyLen value ")
      console.log(result)
      val = result;
      }
    )
  } catch (error) {
    console.log(error)
  }
  return val;
} 

async function storeVal(token,valofToken) {
    console.log("Calling storeVal")
    console.log(token);
    console.log(valofToken);

    var curCounter = await currentCounter(token);
    console.log(curCounter);
    if(curCounter == 0) {
   
        curMean = valofToken;
        let curLen = curCounter + 1;
        let usdValueSplit = "" + valofToken;
        usdValueSplit= usdValueSplit.split(".");

        try {
        var storeRecord = await contract.methods.storeInLedger(token,Number.parseInt(usdValueSplit[0],10),
                                                                      Number.parseInt(usdValueSplit[1],10),
                                                                      usdValueSplit[0],
                                                                      usdValueSplit[1],
                                                                      curLen)
                                                                      .send({from:address});
      } catch(err) {
        console.log(err)
      }
          
    } else { 

      var meanWholePart = currentMeanWholePart[token];
      var meanFractionalPart = currentMeanFractPart[token];
      curCounter++;
      var meanVal = meanWholePart + "." + meanFractionalPart;
      var mean  = (parseInt(meanVal) + usdValue) / curCounter ;
      let usdValueSplit = "" + valofToken;
      var usdValWholePart = Number.parseInt(usdValueSplit[0],10);    //usdValue.toString().split(".")[0];
      var usdValFractionalPart = Number.parseInt(usdValueSplit[1],10);    //usdValue.toString().split(".")[1];
      var storeRecord = await contract.methods.storeInLedger(token,parseInt(usdValWholePart),
        parseInt(usdValFractionalPart),
        usdValWholePart,usdValFractionalPart,curCounter).send({from:address});

    }
    console.log("Called storeVal")
} 


async function currentMean(tokenType) {
  console.log("Calling currentMean")
  var val;
  try {
    let fetchVal = await contract.methods.fetchCurrencyMean(tokenType).call(  
      (err, result) => {
      console.log("fetchCurrencyMean value ")
      console.log(result)
      val = result[0].toString() + "." + result[1] ; // result[0] + "." + result[1];
      console.log(val); 
      }
    )
  } catch (error) {
    console.log(error)
  }
  return val;
} 
