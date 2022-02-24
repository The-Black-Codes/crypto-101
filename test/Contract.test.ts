import chai from "chai";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";

const { expect } = chai.use(solidity);

describe("Our first Contract", () => {
  it("has a method called sayHello which returns a string 'Hello World'", async () => {
    const Contract = await ethers.getContractFactory("Contract");
    const contract = await Contract.deploy();
    await contract.deployed();
    const greeting = await contract.sayHello();
    expect(greeting).to.eql("Hello World");
  });
});
