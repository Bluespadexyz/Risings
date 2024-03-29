require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");


const {
  POLYGON_URL,
  POLYGON_DEPLOY_KEY,
  POLYGONSCAN_API_KEY,

  MUMBAI_URL,
} = require("./env.json")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.info(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    localhost: {
      timeout: 120000
    },
    hardhat: {
      allowUnlimitedContractSize: true
    },
    polygon: {
      url: POLYGON_URL,
      accounts: [`0x${POLYGON_DEPLOY_KEY}`],
      chainId: 137,
      gasPrice: 30000000000,
    },
    mumbai: {
      url: MUMBAI_URL,
      accounts: [`0x${POLYGON_DEPLOY_KEY}`],
      chainId: 80001,
      gasPrice: 20000000000,
    },
  },

  apiKey: {
    polygon: POLYGONSCAN_API_KEY,
    mumbai: POLYGONSCAN_API_KEY,
  },
    
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: false,
            runs: 200
          }
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.20",
        settings: { 
          optimizer: { 
            enabled: true, 
            runs: 200 
          } 
        }
      },
    ],
  },
}
