pragma solidity 0.5.16;

contract Aggregate {

    struct Currency {
        string code;
        uint[] wholeNumberPart ; //will be converted into string
        uint[]  fractionalPart ; //will be converted into string
      //  string[] valueInUSD; //will be converted into string
       
        bool isActive;
        uint curLen;  
    }

    mapping(string=>Currency) curMapping; //mapping between token and it's Currency struct
  //  mapping(string=>uint) currentMean; //most recent mean of the token value in fiat currency(dollar) 
    mapping(string=>uint) currentMeanWholePart;
    mapping(string=>uint) currentMeanFractPart;
    mapping(string=> uint) counterMapping; 
    mapping(string=>uint[]) keyToWholeVal;
    mapping(string=>uint[]) keyToFracVal;
    mapping(string=>bool) isActice;
    address contOwner;

    // constructor () public {
    //     contOwner= msg.sender;
    //    // currentMeanWholePart["eth"] = 234;
    //      //currentMeanFractPart["eth"] = 5;
    //     //counterMapping["eth"] = 1;
    // }
function initializer()  public {
       
     
}

    function fetchCurrencyMean(string memory name) public view returns(uint, uint)  {
            return (currentMeanWholePart[name],currentMeanFractPart[name]);
    }

    function fetchCurrencyLen(string memory name) public view returns(uint)  {
           return counterMapping[name];
    }


    // function currentMeanCalc(string memory name,uint valInDollar,uint counter) public{
    
    function storeInLedger(string memory token, uint _wholeNumberPart,uint _fractionalPart,uint meanWholePart,uint meanFracPart, uint currLen) public returns(bool) {
        
        currentMeanWholePart[token] =  meanWholePart;
        currentMeanFractPart[token] =  meanFracPart;
        counterMapping[token] = currLen;
        if(currLen == 1) {
           
             //Currency memory curr ;//= Currency(token,wholeNumberPart.push(_wholeNumberPart),fractionalPart.push(_fractionalPart),true,currLen);
            // curr.code = token;
          //   curr.wholeNumberPart[1] = _wholeNumberPart;
            // curr.fractionalPart[1] = _fractionalPart;
             keyToWholeVal[token].push(_wholeNumberPart);
            keyToWholeVal[token].push(_fractionalPart);
            // curr.isActive= true;
            isActice[token] = true;
             //curr.curLen = 1;
           //  curMapping[token] = curr;
        } else  {
          //  Currency memory curr = curMapping[token];
          // curr.wholeNumberPart.push(_wholeNumberPart);
           //curr.fractionalPart.push(_fractionalPart);
           keyToWholeVal[token].push(_wholeNumberPart);
           keyToWholeVal[token].push(_fractionalPart);
           isActice[token] = true;
           //curr.isActive= true;
           //curr.curLen = currLen;
        }
        // Currency curr = Currency(token,wholeNumberPart,fractionalPart,true,currLen);
        // Currency memory curr = curMapping[token];
        // curr.code =token;
        // curr.wholeNumberParter[currLen] = wholeNumberPart;
        // curr.fractionalPart[currLen] = fractionalPart;
        // curr.isActive= true;
        // curr.curLen = currLen;
        //currentMean[token] = curMean;
     //   counterMapping[token] = currLen;    
        return true;
        
    }

   

    /*
    
    function currentMeanCalc(string memory name,uint valInDollar) public{

        if(curMapping[name].curLen == 0) {
            
            Currency memory curr = curMapping[name];
            curr.code =name;
            curr.valueInUSD = new  uint[](0);
            curr.isActive =true;
            curr.curLen =1 ;
            curMapping[name] = curr;
            
            currentMean[name] = valInDollar;
            
            counterMapping[name] = 1;
            
        } else {
            
            require(curMapping[name].isActive == true);
            counterMapping[name] = counterMapping[name] + 1;
            currentMean[name] =   (currentMean[name]  + valInDollar) /  counterMapping[name];
            
            curMapping[name].valueInUSD.push(valInDollar);
            curMapping[name].curLen = curMapping[name].curLen + 1;
            
        }

    }
    
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
 
/*
    function InitializeStruct(string memory name,uint valInDollar) public{

        if(curMapping[name].isActive == true) {

            curMapping[name].valueInUSD[curMapping[name].curLen + 1] = curMapping[name].valueInUSD[curMapping[name].curLen] +  valInDollar;
            counterMapping[name] = counterMapping[name] + 1;
            currentMean[name] =  (currentMean[name] + valInDollar) / counterMapping[name] ;
        } 

    }
*/



/*
     function fetchCounterMapping(string memory name) public view returns(uint)  {
            //require(curMapping[name].isActive == true);
            require(curMapping[name].isActive == true);
            if(counterMapping[name] == 0) {
            //if(curMapping[name].curLen == 0) { 
             return 0;
            } else {
                return 1;
                // return counterMapping[name];
            }
    }
    */

    
}


//  struct Question
//     {
//         bytes32 text;
//         bytes32[] answerList; // list of answer keys so we can look them up
//         mapping(bytes32 => Answer) answerStructs; // random access by question key and answer key
//         // add more non-key fields as needed
//     }



//     function addAnswer(bytes32 questionKey, bytes32 answerKey, bytes32 answerText)
//         // onlyOwner
//         returns(bool success)
//     {
//         questionStructs[questionKey].answerList.push(answerKey);
//         questionStructs[questionKey].answerStructs[answerKey].text = answerText;
//         // answer vote will init to 0 without our help
//         return true;
//     }