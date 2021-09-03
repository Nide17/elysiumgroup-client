import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Col, Form, Label, FormGroup, Input, Alert } from 'reactstrap';
import { clearErrors } from '../redux/error/error.actions'
import { clearSuccess } from '../redux/success/success.actions'
import { sendMsg } from '../redux/contacts/contacts.actions'

const Contact = ({ clearErrors, clearSuccess, errors, successful, sendMsg }) => {
    // const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    const [state, setState] = useState({
        contact_name: '',
        email: '',
        message: ''
    })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    // Alert
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    const onChangeHandler = e => {
        setErrorsState([])
        clearSuccess()
        clearErrors();
        const { name, value } = e.target
        setState(state => ({ ...state, [name]: value }))
    };

    const onContact = e => {
        e.preventDefault();

        const { contact_name, email, subject, message } = state;

        // VALIDATE
        if (contact_name.length < 4 || subject.length < 4 || message.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }

        else if (errors.id === "ADD_CONTACT_FAIL") {
            setErrorsState([errors.msg]);
            return
        }

        // Create user object
        const contactMsg = {
            contact_name,
            email,
            subject,
            message
        };

        // Attempt to contact
        sendMsg(contactMsg);

        // Reset fields
        setState({
            contact_name: '',
            email: '',
            subject: '',
            message: ''
        })
    }

    return (
        <section className="contacts-section">
            <div className="container contact-container">

                <div className="row">

                    <div className="col-12 elysium-title-wrapper">
                        <h1 className="elysium-title">ELYSIUM GROUP</h1>
                        <h3>Contact us</h3>
                    </div>

                    <div className="col-12 form-container">

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

                        <Form id="contactForm" onSubmit={onContact}>

                            <FormGroup row>
                                <Label for="contact_name" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input type="text" name="contact_name" placeholder="Your Name" minLength="4" maxLength="50" onChange={onChangeHandler} value={state.contact_name} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="email" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input type="email" name="email" placeholder="Your Email" minLength="4" maxLength="30" onChange={onChangeHandler} value={state.email} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="contactSubject" sm={3}>Subject</Label>
                                <Col sm={9}>
                                    <Input type="text" name="subject" placeholder="Your Subject" minLength="4" maxLength="80" onChange={onChangeHandler} value={state.subject} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="email" sm={3}>Message</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="message" placeholder="Your Message" minLength="10" maxLength="1000" onChange={onChangeHandler} value={state.message} rows="5" />
                                </Col>
                            </FormGroup>

                            <div className="form-group row">
                                <div className="col-md-3"></div>
                                <div className="col-md-9">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>

                        </Form>

                    </div>
                </div>
            </div>
        </section>);
}

const mapStateToProps = state => ({
    errors: state.errorReducer,
    successful: state.successReducer
})

export default connect(mapStateToProps, { clearErrors, clearSuccess, sendMsg })(Contact)