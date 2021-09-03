import React from 'react'
import { Control, Form, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const handleSubmit = (values) => {
    console.log('Current State is: ' + JSON.stringify(values));

    // this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree, values.contactType, values.message);

    console.log(values);

    // this.props.resetFeedbackForm();
}

const Register = () => {

    return (
        <section className="admin-section">

            <div className="container admin-container text-info">

                <div className="row">

                    <div className="col-12 elysium-title-wrapper">
                        <h3>Register</h3>
                    </div>

                    <div className="col-12 form-container">

                        <Form id="registerForm" model="register" onSubmit={(values) => handleSubmit(values)}>

                            <div className="form-group row">

                                <label htmlFor="registerName" className="col-form-label col-md-3">Name</label>

                                <div className="col-md-9">

                                    <Control.text model=".name" id="name" name="registerName" className="form-control text-primary" placeholder="Name" validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(30)
                                    }} />

                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required! ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 20 characters or less'
                                        }}
                                    />

                                </div>

                            </div>

                            <div className="form-group row">

                                <label htmlFor="registerEmail" className="col-form-label col-md-3">Email</label>

                                <div className="col-md-9">

                                    <Control.text model=".email" id="email" name="registerEmail" className="form-control text-primary" placeholder="Email" validators={{
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

                                <label htmlFor="registerPassword" className="col-form-label col-md-3">Password</label>

                                <div className="col-md-9">

                                    <Control.password model=".password" id="password" name="registerPassword" className="form-control text-primary" placeholder="Password" validators={{
                                        required
                                    }} />

                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required! ',
                                        }}
                                    />

                                </div>

                            </div>

                            <div className="form-group row">

                                <label htmlFor="registerPassword1" className="col-form-label col-md-3">Verify</label>

                                <div className="col-md-9">

                                    <Control.password model=".password1" id="password" name="registerPassword1" className="form-control text-primary" placeholder="Re-enter password" validators={{
                                        required
                                    }} />

                                    <Errors
                                        className="text-danger"
                                        model=".password1"
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
                                    <button type="submit" className="btn btn-outline-info loginbtn">Register</button>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-12 text-center redirection">
                                    <p>Already registered? <Link to="/login">&nbsp;Login</Link></p>
                                </div>
                            </div>

                        </Form>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
