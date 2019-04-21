import React from 'react';
import '../login.css'
import FacebookLogin from 'react-facebook-login'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'

class LoginPage extends React.Component {
    render() {
        const responseFacebook = (response) => {
            console.log(response);
        }
        return (
            <Row>
                <Col sm="6">
                    <div className="row">
                        <h1>login Page</h1>
                        <Card body className="text-center" style={{ backgroundColor: "white", backgroundPosition: "center" }}>
                            <CardBody>
                                <CardTitle>LOGIN</CardTitle>
                                <div className="col rs1 bs1">
                                    <FacebookLogin appId="354777901798167" fields="name,email,picture" callback={responseFacebook} />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default LoginPage;