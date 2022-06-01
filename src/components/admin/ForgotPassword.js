import React, { useState } from 'react'
import { Row, Col, Button, Form, Input, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { sendResetLink } from '../../redux/auth/auth.actions';

const ForgotPassword = ({ error, sendResetLink }) => {

    const [fEmail, setFEmail] = useState('');
    const [showSent, setShowSent] = useState(false);
    const [errorsState, setErrorsState] = useState([])

    const onChangeHandler = e => {
        setErrorsState([]);
        setFEmail({ [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        // VALIDATE
        const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!fEmail.email) {
            setErrorsState(['Please provide your email!']);
            return
        }
        else if (!emailTest.test(fEmail.email)) {
            setErrorsState(['Please provide a valid email!']);
            return
        }
        else if (error.id === 'UNEXISTING_EMAIL') {
            setErrorsState([error.msg.msg]);
            return
        }

        // Attempt to send link
        sendResetLink(fEmail);
        setShowSent(true)
    }

    return (
        <Row className="vh-100 d-flex align-items-center">

            <Col className="d-flex flex-column justify-content-center align-items-center">

                <div className="p-2 p-sm-5 border border-success rounded">
                    <h4 className="px-5 mb-5 bg-success text-white text-center">
                        Welcome to Elysium Group Ltd
                    </h4>

                    {showSent ?
                        <h6 className="font-weight-bold my-5 py-5 text-success vh-80">
                            To reset your password click on the link sent to <u className="text-info">"{fEmail.email}"</u>
                        </h6> :

                        <>
                            <h2 className="font-weight-bold my-3 text-center">Recover your account here</h2>

                            <small className="text-center">Provide your email to recover your account</small>

                            <Form className="my-4" onSubmit={onSubmitHandler}>

                                {errorsState.length > 0 ?
                                    errorsState.map(err =>
                                        <Alert color="danger" key={Math.floor(Math.random() * 1000)} className='border border-warning'>
                                            {err}
                                        </Alert>) :
                                    null
                                }

                                <div className="input-group mx-auto">
                                    <Input type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder=" Email ..."
                                        onChange={onChangeHandler} />
                                </div>

                                <Button color="info" size="sm" className="mt-4 d-block mx-auto">Search</Button>

                            </Form>
                        </>
                    }

                    <div>
                        <div className="d-flex">
                            <p className="p-2">Back to
                                &nbsp;<Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>

                </div>
            </Col>
        </Row>
    )
}

// Map  state props
const mapStateToProps = state => ({
    error: state.errorReducer
});

export default connect(mapStateToProps, { sendResetLink })(ForgotPassword);