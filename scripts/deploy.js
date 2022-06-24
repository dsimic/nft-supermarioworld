const { ethers } = require('hardhat');


async function main() {

  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldOZ");
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorldOZ", "SPRMOZ");

  await superMarioWorld.deployed()
  console.log("Success! SuperMarioWorld contract deployed to: ", superMarioWorld.address);
  const tokenURI = "https://ipfs.io/ipfs/QmYoVjXNGbAVHKucFJ3xw8MMxWqFXHtyWPLzf4EB8aLW4f";
  await superMarioWorld.mint(tokenURI);
  console.log("Success! NFT minted with tokenURI:", tokenURI);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
