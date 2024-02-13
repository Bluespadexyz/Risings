const { utils } = require("ethers");
const crypto = require( 'crypto' );

async function main() {
    const RaffleRisings = await ethers.getContractFactory("RaffleRisings");
    const initialOwner = "0x81Ffb740B474C3c8D0e0B2B503068E1F1C56598a"
    const raffleRisings = await RaffleRisings.deploy(initialOwner);
    await raffleRisings.waitForDeployment();
    console.log("RaffleRisings address: ", await raffleRisings.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });