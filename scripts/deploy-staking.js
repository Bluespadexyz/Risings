const { utils } = require("ethers");
const crypto = require( 'crypto' );

async function main() {
    const StakingRisings = await ethers.getContractFactory("StakingRisings");
    const initialOwner = "0x81Ffb740B474C3c8D0e0B2B503068E1F1C56598a"
    const stakingRisings = await StakingRisings.deploy(initialOwner);
    await stakingRisings.waitForDeployment();
    console.log("StakingRisings address: ", stakingRisings.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });