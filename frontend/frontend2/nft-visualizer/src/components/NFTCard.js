import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

const NFTColelctionText = styled.div`
    font-size: 12px;
    color: gray
`;

const NFTName = styled.div`
    font-size: 12px;
    font-weight: bold;
    display: inline;
`

function NFTCard(props) {

    const nft = props.nft;

    return (
        <Card onClick={() => props.toggleModal()} style={{ borderRadius: "10px", padding: "0px", boxShadow: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff" }} >
            <Card.Img varient='top' src={nft && nft.image}></Card.Img>
            <Card.Body style={{ margin: "5px" }}>
                    <NFTColelctionText>
                        {nft && nft.symbol}
                    </NFTColelctionText>
                    <NFTName>
                        {nft && nft.name}
                    </NFTName>
                    <NFTName style={{ float: "right" }}>
                        {`x${nft && nft.copies}`}
                    </NFTName>
            </Card.Body>
        </Card>
    )
}

export default NFTCard;