require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: '0.8.17',
  networks: {
    mumbai: {
      url: process.env.API_KEY_URL_MUMBAI,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
  },
};
