
const Aggregate = artifacts.require('Aggregate');
const AggregateV2 = artifacts.require('AggregateV2');

const { prepareUpgrade } = require('@openzeppelin/truffle-upgrades');
 
 
module.exports = async function (deployer) {
  const inst = await Aggregate.deployed();
  await prepareUpgrade(inst.address, AggregateV2, { deployer });
};

