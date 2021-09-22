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
                    <div className="col-12 elysium-title-wrapper mb-3">
                        <h3>Notable Clients</h3>
                    </div>

                    {clients && clients.map((client, index) => {

                        const { id, clientName, clientLogo } = client;
                        return (
                            <div className="col-12 col-md-4 col-xl-2 m-2 p-0" key={id}>
                                <div className="card card-body bg-light p-0" id={index}>
                                    <img
                                        className="card-img-top img-thumbnail rounded mx-auto"
                                        src={clientLogo}
                                        alt={clientName} />
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