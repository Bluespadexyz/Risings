const { utils } = require("ethers");
const crypto = require( 'crypto' );

async function main() {
    const RisingsTicketRouter = await ethers.getContractFactory("RisingsTicketRouter");
    const initialOwner = "0x81Ffb740B474C3c8D0e0B2B503068E1F1C56598a"
    const lohTicketRouter = await RisingsTicketRouter.deploy(initialOwner);
    await lohTicketRouter.waitForDeployment();
    console.log("RisingsTicketRouter address: ", lohTicketRouter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });