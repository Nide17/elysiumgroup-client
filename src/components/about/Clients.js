import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { setClients } from "../../redux/clients/clients.actions";

const Clients = ({ clients, setClients }) => {

    useEffect(() => {
        setClients();
    }, [setClients]);

    return (
        <section className="clients-section" id="clients">
            <div className="clients-container">
                <div className="row">
                    <div className="col-12 elysium-title-wrapper">
                        <h3>Notable Clients</h3>
                    </div>

                    {clients && clients.map((client, index) => {

                        const { id, clientName, clientLogo } = client;
                        return (
                            <div className="col-12 col-md-4 col-xl-3 mb-3 col-7" key={id}>
                                <div className="card card-body bg-light py-0" id={index}>

                                    <div className="card-header">
                                        <small className="text-center text-uppercase">
                                            {clientName}
                                        </small>
                                    </div>
                                    <img
                                        className="card-img-top img-thumbnail rounded mx-auto"
                                        src={clientLogo}
                                        alt={clientName} style={{ height: "140px", width: "fit-content" }} />
                                    <p></p>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    clients: state.clientsReducer.dataClients
})

export default connect(mapStateToProps, { setClients })(Clients);