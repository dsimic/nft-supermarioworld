import 'bootstrap/dist/css/bootstrap.min.css';

import NFTCard from "./components/NFTCard";
// import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import NFTModal from './components/NFTModal';
import { ethers } from 'ethers';
import { connect } from './helpers';
import LoadingContainer from './components/LoadingContainer';

const axios = require('axios');
const initialNFTs = [
  { name: "Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "Mario is a friendly plumber" },
  { name: "Luigi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
  { name: "Yatoshi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
  { name: "Donkey Kong", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
  { name: "Mario Gold", symbol: "SMWC", copies: 1, image: "https://via.placeholder.com/150" },
  { name: "Luigi Gold", symbol: "SMWC", copies: 1, image: "https://via.placeholder.com/150" },
  { name: "Yatoshi Gold", symbol: "SMWC", copies: 1, image: "https://via.placeholder.com/150" },
  { name: "Donkey Kong Gold", symbol: "SMWC", copies: 1, image: "https://via.placeholder.com/150" },
]

function App() {

  const [showModal, setShowModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState({});
  const [nfts, setNfts] = useState(initialNFTs);
  const [loadingStatus, setLoadingStatus] = useState({ loading: true, message: "Waiting for your wallet." });

  const defaultAccount = '0xe63CC2B1b9A199cc53B279bC1F6258936E63be95';


  useEffect(() => {
    (async () => {
      console.log("Connecting wallet.")
      const account = await connect();
      if (account) {
        // getNFTs(account);
        getNFTs(defaultAccount);
      }
    })()
  }, [])


  const toggleModal = (nft) => {
    setSelectedNFT(nft);
    setShowModal(true);
  }

  async function getMetadataFromIpfs(tokenURI) {
    let metadata = await axios.get(tokenURI);
    return metadata.data;
  }

  async function getNFTs(account) {
    console.log("Executing getNFTs")
    setLoadingStatus({ loading: true, message: "Fetching metadata from blockchain ..." });
    const rpc = "https://rpc-mumbai.maticvigil.com/" // better from Alchemy
    const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);
    let abi = [
      "function symbol() public view returns(string memory)",
      "function tokenCount() public view returns(uint256)",
      "function uri(uint256 tokenId) public view returns(string memory)",
      "function balanceOfBatch(address[] accounts, uint256[] ids) public view returns(uint256[])"
    ];
    const contractAddress = "0xE1fcDb4224Bc4740C8B00D4626755D993664139b";
    let nftCollection = new ethers.Contract(
      contractAddress,
      abi,
      ethersProvider
    );
    let numberOfNfts = (await nftCollection.tokenCount()).toNumber();
    let collectionSymbol = await nftCollection.symbol();
    let accounts = Array(numberOfNfts).fill(account);
    let ids = Array.from({ length: numberOfNfts }, (_, i) => i + 1);
    let copies = await nftCollection.balanceOfBatch(accounts, ids);
    let tempArr = [];
    let baseUrl = "";
    for (let i = 1; i <= numberOfNfts; i++) {
      if (i === 1) {
        let tokenURI = await nftCollection.uri(i);
        baseUrl = tokenURI.replace(/\d+.json/, "")
        let metadata = await getMetadataFromIpfs(tokenURI);
        metadata.symbol = collectionSymbol;
        metadata.copies = copies[i - 1].toNumber();
        tempArr.push(metadata);
        setLoadingStatus({ loading: true, message: "Fetching nft metadata from ipfs ..." });
      } else {
        let metadata = await getMetadataFromIpfs(baseUrl + `${i}.json`);
        metadata.symbol = collectionSymbol;
        metadata.copies = copies[i - 1].toNumber();
        tempArr.push(metadata);
      }
    }
    setNfts(tempArr);
    setLoadingStatus({ loading: false, message: null });
  }

  return (
    <div className="app">
      <Container>
        <br></br>
        <h3 style={{ textAlign: "center" }}>Super Mario World Collection</h3>
        <div style={{ textAlign: "center", color: "gray" }}>The rarest and best of Super Mario World</div>
        <br></br>
        {!loadingStatus.loading &&
          <Row md={2} xs={1} className="g-4">
            {
              nfts.map((el, i) => <Col xs md={4} sm={6} lg={3} key={i}><NFTCard nft={el} toggleModal={() => toggleModal(el)}></NFTCard> <br></br></Col>)
            }
          </Row>
        }
        {loadingStatus.loading &&
          <LoadingContainer message={loadingStatus.message}></LoadingContainer>
        }
      </Container>
      <NFTModal showModal={showModal} hideModal={() => setShowModal(false)} nft={selectedNFT}></NFTModal>
    </div>
  );
}

export default App;