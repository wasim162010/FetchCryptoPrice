pragma solidity 0.5.16;

contract Aggregate {


// ex: if mean os 23.45, then 23 wl be stored in currentMeanWholePart and 45 in currentMeanFractPart
    mapping(string=>uint) currentMeanWholePart;
    mapping(string=>uint) currentMeanFractPart;

    mapping(string=> uint) counterMapping; 
    
    //ex : id usd value is 73.23  then 72 wl be stored in keyToWholeVal and 23 in keyToFracVal.
    mapping(string=>uint[]) keyToWholeVal;
    mapping(string=>uint[]) keyToFracVal;
    mapping(string=>bool) isActice;
    address contOwner;

 
function initializer()  public {
        contOwner= msg.sender;
     
}

    function fetchCurrencyMean(string memory name) public view returns(uint, uint)  {
            return (currentMeanWholePart[name],currentMeanFractPart[name]);
    }

    function fetchCurrencyLen(string memory name) public view returns(uint)  {
           return counterMapping[name];
    }
    
    function storeInLedger(string memory token, uint _wholeNumberPart,uint _fractionalPart,uint meanWholePart,uint meanFracPart, uint currLen) public returns(bool) {
        
        currentMeanWholePart[token] =  meanWholePart;
        currentMeanFractPart[token] =  meanFracPart;
        counterMapping[token] = currLen;
        if(currLen == 1) {
           
             keyToWholeVal[token].push(_wholeNumberPart);
            keyToWholeVal[token].push(_fractionalPart);
            isActice[token] = true;
        } else  {
 
           keyToWholeVal[token].push(_wholeNumberPart);
           keyToWholeVal[token].push(_fractionalPart);
           isActice[token] = true;
  
        }
  
        return true;
        
    }
}
