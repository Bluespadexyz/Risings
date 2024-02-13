const { utils } = require("ethers");
const crypto = require( 'crypto' );

async function main() {
    const RisingsTicket = await ethers.getContractFactory("RisingsTicket");
    const risingsTicket = await RisingsTicket.deploy();
    await risingsTicket.waitForDeployment();
    console.log("RisingsTicket address: ", await risingsTicket.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });