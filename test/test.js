const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyRoyaltyNFT", function () {
  let owner;
  let acc1;
  let nftContract;

  beforeEach(async function () {
    [owner, acc1] = await ethers.getSigners();

    const MyEPAMNFT = await ethers.getContractFactory("MyRoyaltyNFT");
    nftContract = await MyEPAMNFT.deploy();
    await nftContract.deployed();
  });

  it("test a", async () => {
    const ERC721InterfaceId = "0x80ac58cd";
    const ERC2981InterfaceId = "0x2a55205a";
    var isERC721 = await nftContract.supportsInterface(ERC721InterfaceId);
    var isER2981 = await nftContract.supportsInterface(ERC2981InterfaceId); 
    expect(isERC721).to.eql(true);
    expect(isER2981).to.eql(true);
  });

  it("test b", async () => {
    await nftContract.mintNFTWithRoyalty(owner.address, "dummyNFT_URI", acc1.address, 1000); // 1000 = 10%

    const defaultRoyaltyInfo = await nftContract.royaltyInfo(1, 1000);
    console.log(defaultRoyaltyInfo);
    // Check royalty receiver
    expect(defaultRoyaltyInfo[0]).to.eql(acc1.address);
    // Check royalty fee
    expect(defaultRoyaltyInfo[1].toNumber()).to.eql(100);
  });
  
})
