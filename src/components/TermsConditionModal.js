import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosInstance } from '../config/axios';
import { baseurl, termsConditionsUrl } from '../utils/apiurls';

export const TermsConditionModal = ({ show, handleClose, acceptTermCondtionsProp }) => {

    const acceptTermCondtions = () => {
        acceptTermCondtionsProp(true)
        handleClose();
    }
    useEffect(() => {
        if(show){
            fetchTermsandConditionDocs()

        }
    }, [show])

    const fetchTermsandConditionDocs = async () => {
        // const response = await axiosInstance.get(termsConditionsUrl)
        // const mypdf = new Blob(response.data, {type : 'application/pdf'});
        window.open(baseurl+""+termsConditionsUrl);

        // console.log(response);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body><b>Terms and Conditions file Downloaded</b>. Please read carefully, Click the Accept button when you agree on terms and condition. </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={acceptTermCondtions}>
                        Accept
                    </Button>
                    {/* <Button variant="danger" onClick={handleClose}>
                        Reject
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

