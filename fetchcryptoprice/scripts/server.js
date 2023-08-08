 
let price = require('crypto-price') // to fetch the crypto price
var express = require('express');
const url = require('url');
const fs = require('fs')
var path = require('path');


const Web3 = require('web3')

//web3

const address = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
const contAddr = '0xd9145CCE52D386f254917e481eB44e9943F39138'
const abi = [
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




async function getPrice(cur, token) {
	console.log("getPrice");
 let curPrice;
 
  price.getCryptoPrice(cur, token).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
	console.log("price.getCryptoPrice");
    curPrice = obj.price;
	console.log("curPrice" + curPrice);
	return curPrice;
}).catch(err => {
})


}


app.put('/store', function(req, res) {
  console.log("/store");
  var token = req.query.token
  console.log("token " + token)
  var cur = req.query.cur
  console.log("cur " + cur)
  let curPrice;



console.log("calling storeVal");

storeVal(token,cur).then( (data)=> {
	console.log("storeVal");
	console.log(curPrice);
	res.send(data);
},(data) => {
	res.send(data);
	console.log("error" + data);
  }
)

console.log("called storeVal");


});

app.get('/mean', function(req, res) {

  var token = req.query.token;
  let mean = currentMean(token);
  res.send(mean);
});


async function currentCounter(tokenType) {
  console.log("Calling currentCounter")

  var val=0;
  try {
    let fetchVal =  contract.methods.fetchCurrencyLen(tokenType).call(  
      (err, result) => {
      console.log("fetchCurrencyLen value ")
      console.log("result "   + result);
	  val = result;
	  return result;
      }
    )
  } catch (error) {
    console.log(error)
  }
  return val;
} 



async function storeVal(token,curr) {

    console.log("storeVal definition")
    console.log(token);
	console.log(curr);

	var valofToken
	await price.getCryptoPrice(curr, token).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
		console.log("price.getCryptoPrice");
		valofToken = obj.price;
		console.log("valofToken " + valofToken);
		
	}).catch(err => {
	})

    var curCounter = await currentCounter(token);
    console.log(curCounter);
    if(curCounter == 0) {
		console.log("curCounter == 0");
        curMean = valofToken;
        let curLen = curCounter + 1;
        let usdValueSplit = "" + valofToken;
		usdValueSplit= usdValueSplit.split(".");
		console.log(usdValueSplit[0]);
		console.log(Number.parseInt(usdValueSplit[0],10));
		console.log(Number.parseInt(usdValueSplit[1],10));
		console.log(usdValueSplit[1]);

        try {

			console.log("try");
	
		var storeRecord = await contract.methods.storeInLedger(token,
															Number.parseInt(usdValueSplit[0],10),
                                                            Number.parseInt(usdValueSplit[1],10),
                                                            usdValueSplit[0],
                                                            usdValueSplit[1],
															curLen
															)
                                                            .send(
																{from:address}
															);
      } catch(err) {
		console.log("catch ");
        console.log(err)
      }
          
    } else { 
		console.log("else ");
		var currMean= await currentMean(token);
		console.log("currMean " + currMean);
		

      var meanWholePart = currMean.toString().split(",")[0];
      var meanFractionalPart = currMean.toString().split(",")[0];
      curCounter++;
      var meanVal = meanWholePart + "." + meanFractionalPart;
      var mean  = (parseInt(meanVal) + usdValue) / curCounter ;
      let usdValueSplit = "" + valofToken;
      var usdValWholePart = Number.parseInt(usdValueSplit[0],10);    
      var usdValFractionalPart = Number.parseInt(usdValueSplit[1],10);    
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
	  if(result != undefined)  {
		val = result[0].toString() + "." + result[1] ; 
	  }
      console.log(val); 
      }
    )
  } catch (error) {
    console.log(error)
  }
  return val;
} 
