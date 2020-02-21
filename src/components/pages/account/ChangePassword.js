import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';

const ChangePassword = () => {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <MDBCard>
                        <div className="header pt-3 grey lighten-2">
                            <MDBRow className="d-flex justify-content-start">
                                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                    Change Password
                                </h3>
                            </MDBRow>
                        </div>
                        <MDBCardBody className="mx-4 mt-4">
                            <MDBInput label="Your email" group type="text" validate />
                            <div className="text-center mb-4 mt-5">
                                <MDBBtn
                                    color="danger"
                                    type="button"
                                    className="btn-block z-depth-2"
                                >
                                    Submit
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default ChangePassword;