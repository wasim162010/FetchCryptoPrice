const Aggregate = artifacts.require("Aggregate");

// contract('Aggregate', () => {

//     it('should deploy smart contract properly', async () => {
//         const contr= await Aggregate.deployed();
//         console.log(contr.address);
//         assert(contr.address != '');
//     });

//  });


//  contract('Aggregate', () => {
//     it('should run successfully', async () => {
//         const contr= await Aggregate.deployed();
//         console.log(contr.address);
//         assert(contr.address != '');
//         await contr.currentMeanCalc("ETH",134);
//         await contr.currentMeanCalc("BTC",20);
//         await contr.currentMeanCalc("PI",25);
//         await contr.currentMeanCalc("ETH",40);
//        var result = await contr.fetchCurrencyMean("ETH");
//        console.log(result);
//        assert(result != '');
//     });

//  });


 contract('Aggregate', () => {

   it('should run successfully', async () => {
       const contr= await Aggregate.deployed();
       console.log(contr.address);
       assert(contr.address != '');
       var result =  await contr.storeInLedger("ETH",134,23,23,0,2);
    //  console.log(result);
      assert(result != '');
   });

});

contract('Aggregate', () => {

   it('should run successfully', async () => {
       const contr= await Aggregate.deployed();
       console.log(contr.address);
       assert(contr.address != '');
       var result =  await contr.fetchCurrencyMean("ETH");
    //  console.log(result);
      assert(result != '');
   });

});

contract('Aggregate', () => {

   it('should run successfully', async () => {
       const contr= await Aggregate.deployed();
       console.log(contr.address);
       assert(contr.address != '');
       var result =  await contr.fetchCurrencyLen("ETH");
    //  console.log(result);
      assert(result != '');
   });

});