import styled from 'styled-components';
import { Col, Container, Row, Spinner } from "react-bootstrap";



function LoadingContainer(props) {
    return (
            <Row className="align-items-center" style={{minHeight: "30vh"}}>
                <Col xs={12} style={{ textAlign: "center" }}>
                    <Spinner animation="border" variant="primary" />
                    <br></br>
                    <br></br>
                    <LoadingMessage>{props.message}</LoadingMessage>
                </Col>
            </Row>
    )
}


const LoadingMessage = styled.div`
  color: gray;
  font-size: 14px;
`
export default LoadingContainer;