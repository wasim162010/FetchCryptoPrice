# FetchCryptoPrice

uses 'crypto-price' node .js package to fetch current prices npm install node-fetch //prerequisite for crypto-price

This project uses libraries/package : expressjs,web3.js,crypto-price

To make the smart contract upgrade possible, this project uses OpenZeppelin Truffle upgrade to upgrade the smart contract smoothly.

How the environment was setup while initiating the development: under the project's root folder npm init -y npm i --save-dev truffle npx truffle init npm i --save-dev @openzeppelin/truffle-upgrades npm install --save express npm install --save web3

to upgrade contract , createa a .js file under 'migrations' [view '4_upgrade_contract.sol'] and run truffle migrate

Contains API : /store : to fetchn store values in ledger. Need to pass 'token' and 'cur' as a query string params. /mean : to fetch the mean of the token prices. Need to pass 'token' as a query string params

It also contains a test cases in 'testAggregate.js', present in 'test folder.
