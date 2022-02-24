import chai from "chai";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

const { expect } = chai.use(solidity);

async function deployCounter() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();
  return counter;
}

describe("Counter contract", () => {
  it("has a method called 'getCount' which should initially return 0", async () => {
    const counter = await deployCounter();
    const count = await counter.getCount();
    expect(count).to.eql(0);
  });
  it("when increment is called increments the counter", async () => {
    const counter = await deployCounter();
    await counter.increment();
    const count = await counter.getCount();
    expect(count).to.eql(1);
  });
});
