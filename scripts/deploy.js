const hre = require("hardhat");

async function main() {
  const AliToken = await hre.ethers.getContractFactory("AliToken");
  const aliToken = await AliToken.deploy();

  await aliToken.deployed();

  console.log("Ali Token deployed: ", aliToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Token Address
// 0xc096E1A664b658F36685ab847B5D1104b94b82aD -old
// 0x231316605C9DDDeFEA8ddE2f36393470FC077b18 -staking
// https://goerli.etherscan.io/address/0x231316605C9DDDeFEA8ddE2f36393470FC077b18