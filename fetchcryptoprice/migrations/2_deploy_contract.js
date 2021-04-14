// migrations/2_deploy_box.js
const Aggregate = artifacts.require('Aggregate');
 
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
 
module.exports = async function (deployer) {
  await deployProxy(Aggregate, { deployer, initializer: 'initializer' });
};