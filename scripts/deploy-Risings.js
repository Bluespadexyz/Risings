const { utils } = require("ethers");
const crypto = require( 'crypto' );

async function main() {
    const StandardERC721A = await ethers.getContractFactory("StandardERC721A");
    const standardERC721A = await StandardERC721A.deploy("Risings", "Risings", 1, 3333, "0x81Ffb740B474C3c8D0e0B2B503068E1F1C56598a", 100);
    await standardERC721A.waitForDeployment();
    console.log("StandardERC721A address: ", standardERC721A.address, "Risings", "Risings", 1, 3333, "0x81Ffb740B474C3c8D0e0B2B503068E1F1C56598a", 100);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });