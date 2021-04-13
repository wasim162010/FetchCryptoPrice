 
let price = require('crypto-price') // to fetch the crypto price
var express = require('express');
const url = require('url');
const fs = require('fs')
var path = require('path');


const Web3 = require('web3')

//web3

const address = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
const contAddr = '0xA72102F6c6F9E723F2d001CCbEF41b4C47F18993'
const abi = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
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
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "token",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "wholeNumberPart",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fractionalPart",
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


const web3 = new Web3("http://127.0.0.1:7545") //pointing to in memory ganache blockchain.
const contract = new web3.eth.Contract(abi, contAddr)

// async function currentCcunter() {

//   let valu =  await contract.methods.fetchCounterMapping(curr).call(  
//     (err, result) => {
//       console.log("current counter value ")
//       console.log(result)
//       mean = result;
//       console.log("error ")
//       console.log(err)
//     }
//   }


//expressjs
var app = express();
app.listen(8081);
console.log("server is up");

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/price', function(req, res) {
     console.log("fetching...")
     var token = req.query.token
     var cur = req.query.cur
      let curPrice;
      price.getCryptoPrice(cur, token).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
        // console.log(obj.price)
           curPrice = obj.price;
           console.log(curPrice);
           res.end(curPrice);

    }).catch(err => {
        // console.log(err)
    })

});

app.put('/store', function(req, res) {
  res.end('sving in ledger');
  var token = req.query.token
  var cur = req.query.cur
  let curPrice;

  price.getCryptoPrice(cur, token).then(obj => { // cur for ex - USD, token for ex - ETH 
    // console.log(obj.price)
       curPrice = obj.price;
       console.log(curPrice);
       res.end(curPrice);

}).catch(err => {
    // console.log(err)
})
  storeVal(token,curPrice);
});

app.get('/mean', function(req, res) {
  res.end('fetching the current mean');
  var token = req.query.token
  let mean = currentMean(token);
});


// var curr="ETH"
// var usdValue=78
    /*
        store and calculate mean
        fetch value based on the tken and the currency type. //ui
        call fetchCurrencyLen()  //ui
        if(0) {
            calculate mean = valInCurrency //no fetch
            counterMapping[name] = 1;//no fetch
            currentMean[name] = valInDollar; //no fetch
            //ledger side
            call api passing token, valueinusd(post conv into str),currentmean(post conv into str),and countermapping
         
        } else {
            fetch fetchCurrencyMean() and convert into int
            fetch fetchCurrencyLen() and convert into int.
            newval = fetchCurrencyLen()++
            mean = (mean + currentMean[name])/ newval ;
            currentMean[name] = mean
            call api passing token, valueinusd(post conv into str),currentmean(post conv into str),and countermapping

        }



    */
async function storeVal(token,usdValue) {
    console.log("Calling storeVal")

    var curCounter = await currentCounter(token);

    if(curCounter == 0) {
   
        var meanFractionalPart = res[1];
        curMean = usdValue;
        let curLen = curCounter + 1;
        var usdValueSplit = usdValue.toString().split(".");

        try {
        var storeRecord = await contract.methods.storeInLedger(token,pasrseInt(usdValueSplit[0]),
                                                                      pasrseInt(usdValueSplit[1]),
                                                                      usdValueSplit[0],usdValueSplit[1],curLen).send({from:address});
        if(storeRecord == true) {

        } else  {
        }
      } catch(err) {
       // console.log("error")
      }
          
    } else { 

      var res = currentMean(token);
      var meanWholePart = res[0];
      var meanFractionalPart = res[1];
     // var curCounter = currentCounter(token);
      curCounter++;
      var meanVal = meanWholePart + "." + meanFractionalPart;
      var mean  = (parseInt(meanVal) + usdValue) / curCounter ;
      var usdValWholePart = usdValue.toString().split(".")[0];
      var usdValFractionalPart = usdValue.toString().split(".")[1];
      //function storeInLedger(string memory token, uint wholeNumberPart,uint fractionalPart,uint meanWholePart,uint meanFracPart, uint currLen) public returns(bool) {
      var storeRecord = await contract.methods.storeInLedger(token,parseInt(usdValWholePart),
        parseInt(usdValFractionalPart),
        usdValWholePart,usdValFractionalPart,curCounter).send({from:address});

    }
    console.log("Called storeVal")
} 
storeVal("eth",23.45);

async function currentCounter(tokenType) {
  console.log("Calling currentCounter")

  var val=0;
  try {
    let fetchVal = await contract.methods.fetchCurrencyLen(tokenType).call(  //working
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
//currentCounter("ETH");

async function currentMean(tokenType) {
  console.log("Calling currentMean")
  var val;
  try {
    let fetchVal = await contract.methods.fetchCurrencyMean(tokenType).call(  //working
      (err, result) => {
      console.log("fetchCurrencyMean value ")
      console.log(result)
      val = result;// result[0] + "." + result[1];
      console.log(val);
      }
    )
  } catch (error) {
    console.log(error)
  }
  return val;
} 
currentMean("eth"); //23.45


// app.get("/user", function(req, res){
  
//   var name = req.query.name
//   var age = req.query.age
    
//   console.log("Name :", name)
//   console.log("Age :", age)
//   res.end("done");
// })

// price.getCryptoPrice(base, crypto).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
//    // console.log(obj.price)
// }).catch(err => {
//    // console.log(err)
// })

// price.getBasePrice(base, crypto).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
//    // console.log(obj.price)
// }).catch(err => {
//    // console.log(err)
// })