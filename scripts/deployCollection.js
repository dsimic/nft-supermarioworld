const { ethers } = require('hardhat');


async function main() {

  const baseUri = "https://ipfs.io/ipfs/Qmb6tWBDLd9j2oSnvSNhE314WFL7SRpQNtfwjFWsStXp5A/";  // trailing backslash is critically important
  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldCollection");
  const superMarioWorld = await SuperMarioWorld.deploy(
    "SuperMarioWorldCollection",
    "SPRWC",
    baseUri
    );

  await superMarioWorld.deployed()
  console.log("Success! SuperMarioWorldCollection contract deployed to: ", superMarioWorld.address);

  await superMarioWorld.mint(10);  // 1 Mario
  await superMarioWorld.mint(10);  // 2 Luigi
  await superMarioWorld.mint(10);  // 3 Yatoshi
  await superMarioWorld.mint(10);  // 4 KingKong
  await superMarioWorld.mint(1);  // 5 Gold Mario
  await superMarioWorld.mint(1);  // 6 Gold Luigi
  await superMarioWorld.mint(1);  // 7 Gold Yatoshi
  await superMarioWorld.mint(1);  // 8 Gold KingKong
  console.log("Success! NFT minted with baseUri:", baseUri);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
