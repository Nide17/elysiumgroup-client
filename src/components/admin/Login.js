import React from 'react'
import { Control, Form, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom'

const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const handleSubmit = (values) => {
    console.log('Current State is: ' + JSON.stringify(values));

    // this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree, values.contactType, values.message);

    console.log(values);

    // this.props.resetFeedbackForm();
}

const Login = () => {

    return (
        <section className="admin-section">

            <div className="container admin-container text-info">

                <div className="row">

                    <div className="col-12 elysium-title-wrapper">
                        <h3>Admin Login</h3>
                    </div>

                    <div className="col-12 form-container">

                        <Form id="adminForm" model="login" onSubmit={(values) => handleSubmit(values)}>

                            <div className="form-group row">

                                <label htmlFor="loginEmail" className="col-form-label col-md-3">Email</label>

                                <div className="col-md-9">

                                    <Control.text model=".email" id="email" name="loginEmail" className="form-control text-primary" placeholder="Email" validators={{
                                        required, validEmail
                                    }} />

                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required! ',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                    />

                                </div>

                            </div>

                            <div className="form-group row">

                                <label htmlFor="loginPassword" className="col-form-label col-md-3">Password</label>

                                <div className="col-md-9">

                                    <Control.password model=".password" id="password" name="loginPassword" className="form-control text-primary" placeholder="Password" validators={{
                                        required
                                    }} />

                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required! '
                                        }}
                                    />

                                </div>

                            </div>

                            <div className="form-group row">
                                <div className="col-md-3"></div>
                                <div className="col-md-9 login">
                                    <button type="submit" className="btn btn-outline-info loginbtn">Login</button>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-12 text-center redirection">
                                    <p>Have no account yet? <Link to="/register">&nbsp;Register</Link></p>
                                </div>
                            </div>

                        </Form>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
