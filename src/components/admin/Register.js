import React, { useState } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../redux/auth/auth.actions'
import { clearErrors } from '../../redux/error/error.actions'
import { clearSuccess } from '../../redux/success/success.actions'

const Register = ({ clearErrors, clearSuccess, errors, successful, register }) => {

    const [registerState, setRegisterState] = useState({
        // initialy doesn't show
        name: '',
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
        setRegisterState({ ...registerState, msg: null, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        const { name, email, password } = registerState

        // VALIDATE
        if (name.length < 4 || email.length < 4 || password.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }

        else if (errors.id === "REGISTER_FAIL") {
            setErrorsState([errors.msg]);
            return
        }

        // Create user object
        const user = {
            name,
            email,
            password
        }
        register(user)

        setRegisterState({
            name: '',
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
                            <Label for="name">Name</Label>
                            <Input type="name" name="name" placeholder="Name ..." className="mb-3" onChange={onChangeHandler} value={registerState.name} required />

                            <Label for="email">Email</Label>
                            <Input type="email" name="email" placeholder="Email ..." className="mb-3" onChange={onChangeHandler} value={registerState.email} required />

                            <Label for="password">Password</Label>
                            <Input type="password" name="password" placeholder="Password ..." className="mb-3" onChange={onChangeHandler} value={registerState.password} required />

                            <Button color="warning" style={{ marginTop: '2rem' }} block>
                                Register
                            </Button>
                        </FormGroup>
                    </Form>

                    <div>
                        <div className="d-flex">
                            <p className="p-2">Have account?
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
    errors: state.errorReducer,
    successful: state.successReducer
})

export default connect(mapStateToProps, { register, clearErrors, clearSuccess })(Register)