import React from 'react';

const Model = () => {

    return (
        <div className="modal fade" id="Modal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">

                        <h2 className="modal-title text-center" id="ModalLabel"><b>Our Social Media Platforms</b></h2>

                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <ul className="social-buttons d-flex justify-content-center">
                                        <li><i className="fa fa-facebook fa-lg"></i></li>
                                        <li><i className="fa fa-instagram fa-lg"></i></li>
                                        <li><i className="fa fa-twitter fa-lg"></i></li>
                                        <li><i className="fa fa-linkedin fa-lg"></i></li>
                                        <li><i className="fa fa-whatsapp fa-lg"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="text-right p-4">
                        <button type="button" className="btn btn-danger btn-xs" data-dismiss="modal"><small>&times;</small></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Model;
