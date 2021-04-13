pragma solidity 0.5.16;

contract Aggregate {

    struct Currency {
        string code;
        uint[] valueInUSD;
        bool isActive;
        uint curLen;
    }

    mapping(string=>Currency) curMapping;
    mapping(string=>uint) currentMean;
    mapping(string=> uint) counterMapping;
    address contOwner;

    constructor () public {
        contOwner= msg.sender;
    }

    function fetchCurrencyMean(string memory name) public returns(uint)  {
         
            require(curMapping[name].isActive == true);
            return currentMean[name];
    }

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
    
 
/*
    function InitializeStruct(string memory name,uint valInDollar) public{

        if(curMapping[name].isActive == true) {

            curMapping[name].valueInUSD[curMapping[name].curLen + 1] = curMapping[name].valueInUSD[curMapping[name].curLen] +  valInDollar;
            counterMapping[name] = counterMapping[name] + 1;
            currentMean[name] =  (currentMean[name] + valInDollar) / counterMapping[name] ;
        } 

    }
*/



    
}