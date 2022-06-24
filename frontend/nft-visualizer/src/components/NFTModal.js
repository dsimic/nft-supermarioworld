import { useEffect } from 'react';
import styled from 'styled-components';
import NFTPhoto from './NFTPhoto';
import NFTProgressBar from './NFTProgressBar';

const { Modal, ModalBody, Row, Col } = require("react-bootstrap");


function NFTModal(props) {

    const nft = props.nft;

    useEffect(() => {
        console.log(props.nft)
    }, [props.nft])

    return (
        <Modal show={props.showModal} fullscreen={true} onHide={() => props.hideModal()}>
            <Modal.Header closeButton>
            </Modal.Header>
            <ModalBody>
                <Row>
                    <Col xs={12} md={4}>
                        <NFTPhoto style={{backgroundImage: `url(${nft && nft.image})`}}></NFTPhoto>
                    </Col>
                    <Col md={8}>
                        <h2>{nft && nft.name}</h2>
                        <div>You own {nft && nft.copies} copies</div>
                        <br></br>
                        <div style={{ fontWeight: "bold" }}>Description</div>
                        <div>{nft && nft.description}</div>
                        <br></br>
                        <div style={{ fontWeight: "bold" }}>Attributes</div>
                        {nft && nft.attributes && nft.attributes.map((el, i) => 
                            <div key={i}>
                                <div style={{ margin: "10px 0px 5px 0px" }}>
                                    <AttributeText>{el.trait_type}</AttributeText>
                                    <AttributeText style={{ float: "right" }}>{el.value}</AttributeText>
                                </div>
                                <NFTProgressBar percent={100 * el.value / el.max_value}></NFTProgressBar>
                            </div>

                        )
                        }
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

const AttributeText = styled.h4`
   color: gray;
   margin: 0;
   display: inline;
`;

export default NFTModal;