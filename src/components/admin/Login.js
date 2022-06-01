import React, { useState } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/auth/auth.actions'
import { clearErrors } from '../../redux/error/error.actions'
import { clearSuccess } from '../../redux/success/success.actions'

const Login = ({ clearErrors, clearSuccess, errors, successful, login, auth }) => {

    if(auth.isAuthenticated){ window.location.href = "/"}
    const [loginState, setLoginState] = useState({
        // initialy doesn't show
        email: '',
        password: '',
        msg: null
    })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    // Alert
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    const onChangeHandler = e => {
        // Remove errors
        setErrorsState([])
        clearSuccess()
        clearErrors()
        setLoginState({ ...loginState, msg: null, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        const { email, password } = loginState

        // VALIDATE
        if (email.length < 4 || password.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }

        else if (errors.id === "LOGIN_FAIL") {
            setErrorsState([errors.msg]);
            return
        }

        // Create user object
        const user = {
            email,
            password
        }
        login(user)

        setLoginState({
            email: '',
            password: '',
            msg: null
        })
    }

    return (
        <Row className="vh-100 d-flex align-items-center">

            <Col className="d-flex flex-column justify-content-center align-items-center">

                <div className="p-2 p-sm-5 border border-success rounded">
                    <h4 className="px-5 mb-5 bg-success text-white text-center">
                        Welcome to Elysium Group Ltd
                    </h4>

                    {/* Error frontend*/}
                    {errorsState.length > 0 ?
                        errorsState.map(err =>
                            <Alert isOpen={visible} toggle={onDismiss} color="danger" key={Math.floor(Math.random() * 1000)}>
                                {err}
                            </Alert>) :
                        null}

                    {/* Error backend */}
                    {errors.id ?
                        <Alert isOpen={visible} toggle={onDismiss} color='danger'>
                            <small>{errors.msg && errors.msg.msg}</small>
                        </Alert> :
                        successful.id ?
                            <Alert isOpen={visible} toggle={onDismiss} color='success'>
                                <small>{successful.msg && successful.msg}</small>
                            </Alert> : null
                    }

                    <Form onSubmit={onSubmitHandler}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" placeholder="Email ..." className="mb-3" onChange={onChangeHandler} value={loginState.email} required />

                            <Label for="password">Password</Label>
                            <Input type="password" name="password" placeholder="Password ..." className="mb-3" onChange={onChangeHandler} value={loginState.password}required />

                            <Button color="warning" style={{ marginTop: '2rem' }} block>
                                Login
                            </Button>
                        </FormGroup>
                    </Form>

                    <div>
                        <a href="forgot-password">
                            <p className="p-2">Forgot password?</p>
                        </a>
                        <div className="d-flex">
                            <p className="p-2">No account yet?
                                &nbsp;<Link to="/register">Register</Link>
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
    errors: state.errorReducer,
    successful: state.successReducer
})

export default connect(mapStateToProps, { login, clearErrors, clearSuccess })(Login)