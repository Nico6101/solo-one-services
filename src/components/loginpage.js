import React from 'react';
import '../login.css'
import loginScss from './LoginPage.scss'
import env from '../env'
import FacebookLogin from 'react-facebook-login'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
class LoginPage extends React.Component {
    render() {
        const responseFacebook = (response) => {
            console.log(response);
        }
        return (
            <Row style={{ textAlign: "center" }}>
                <Col style={{ Tmargin: "10px" }}>
                    <div >
                        {/* <h1>login Page</h1> */}
                        <Card body className = "cardbody">
                            <CardBody>
                                <CardTitle style={{ backgroundColor: "white", margin: "50px", fontWeight: "bold", fontSize: "40px", color: "blue" }}>LOGIN</CardTitle>
                                <button className="fbbutton">
                                    <FacebookLogin appId={env.APPID} fields="name,email,picture" callback={responseFacebook} />
                                </button>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        )
    }
}

Card.propTypes = {
    className: "card-body"
}
export default LoginPage;