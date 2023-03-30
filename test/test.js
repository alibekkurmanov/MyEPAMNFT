const { expect } = require("chai");
const { ethers } = require("hardhat");

//chai.use(solidity);


describe("MyEPAMNFT", function () {
  let owner;
  let acc1;
  let nftContract;

  beforeEach(async function () {
    [owner, acc1] = await ethers.getSigners();

    const MyEPAMNFT = await ethers.getContractFactory("MyEPAMNFT");
    nftContract = await MyEPAMNFT.deploy();
    await nftContract.deployed();
  });

  it("test a", async function() {
    await expect(nftContract.connect(acc1).makeAnEpicNFT({value: ethers.utils.parseEther("0.01")}));
    await expect(nftContract.connect(acc1).makeAnEpicNFT()).to.be.revertedWith("Wrong price! Should be 0.01 ether");
  })

  it("test b", async function() {
    let ownerBalanceBefor = await nftContract.getBalance(owner.address);
    await nftContract.connect(acc1).makeAnEpicNFT({value: ethers.utils.parseEther("0.01")});    
    let ownerBalanceAfter = await nftContract.getBalance(owner.address);
    
    await expect(ownerBalanceAfter.sub(ownerBalanceBefor)).to.eq(ethers.utils.parseEther("0.01"));
  })
  
})
