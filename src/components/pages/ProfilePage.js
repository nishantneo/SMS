import React from 'react'
import { MDBCard, MDBCol, MDBRow, MDBView, MDBMask, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import src1 from '../../assets/img-1.jpg';

const ProfilePage =  () => {
  return (
    <React.Fragment>
        <MDBRow className="justify-content-center">
        <MDBCol sm="12" md="6" lg="5" className="mb-5">
            <MDBCard>
                <MDBCardImage className="img-fluid" src={src1} />
                <MDBCardBody>
                    <MDBCardTitle className="text-center mb-2 font-bold">Alice Mayer</MDBCardTitle>
                    <MDBCardTitle sub className="text-center indigo-text mb-2 font-bold">Photographer</MDBCardTitle>
                    <MDBCardText>
                        <strong className="mb-2">About:</strong>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione perferendis quod animi dignissimos consectetur quibusdam numquam laboriosam, minus, provident...
                    </MDBCardText>
                    <div className="row justify-content-end pr-1">
                        <MDBBtn size="sm" outline color="primary">More...</MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </MDBRow>
    </React.Fragment>
  );
}

export default ProfilePage;