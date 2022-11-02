import React, { useEffect, useState } from "react";

import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import img1 from "../images/supplementary_card.png";
import img2 from "../images/duplicate.png";
import removeImg from "../images/remove.png";
import { getBase64 } from "../utils";
import { axiosInstance } from "../config/axios";
import { baseurl, supplmentcardUrl, termsConditionsUrl } from "../utils/apiurls";
import img3 from '../images/logo_mark.png'
import img4 from '../images/back-arrow.png'
import { TermsConditionModal } from "./TermsConditionModal";
import success from '../images/check.png'

// import { getBase64 } from "../utils";
export const Supplementcard = () => {
  const usertemplet = {
    Name: "",
    cnic: "",
    // phone: "",
    cnicfront: "",
    cnicback: "",
    cnicfrontbase64: "",
    cnicbackbase64: "",
  };
  const [users, setUser] = useState([usertemplet]);
  const [supcardObj, setsupcardCount] = useState({});
  const [loaderBool, setloaderBool] = useState(false);
  const [show, setshow] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const handleClose = () => setshow(false)
  const handleShow = () => setshow(true)
  const location = useLocation();

  useEffect(() => {
    if (location?.state) {
      setsupcardCount(location?.state)
    }
    return () => {
      setsupcardCount({})
    }
  }, [location?.state])

  useEffect(() => {
    console.log(supcardObj);

  }, [supcardObj])

  const adduser = () => {
    setUser([...users, usertemplet]);
  };

  const removeUsers = (index) => {
    const filterdUsers = [...users];
    filterdUsers.splice(index, 1);
    setUser(filterdUsers);
  };

  const onChange = async (e, index) => {
    let updatedUser;
    if (e.target.type === "file") {
      updatedUser = users.map((user, i) =>
        index == i
          ? Object.assign(user, { [e.target.name]: e.target.files })
          : user
      );
      await func(updatedUser, index);
    } else {
      updatedUser = users.map((user, i) =>
        index == i
          ? Object.assign(user, { [e.target.name]: e.target.value })
          : user
      );
      setUser(updatedUser);
    }
  };

  const func = (user, currentIndex) => {
    if (user[currentIndex]?.cnicfront.length > 0) {
      getBase64(user[currentIndex]?.cnicfront[0]).then((result) => {
        setUser((currentUser) =>
          currentUser.map((user, index) => {
            return currentIndex === index
              ? { ...user, cnicfrontbase64: result }
              : user;
          })
        );
      });
    }
    if (user[currentIndex]?.cnicback.length > 0) {
      getBase64(user[currentIndex]?.cnicback[0]).then((result) => {
        setUser((currentUser) =>
          currentUser.map((user, index) => {
            return currentIndex === index
              ? { ...user, cnicbackbase64: result }
              : user;
          })
        );
      });
    }
  };

  const submitSupplementCard = async (e) => {
    setloaderBool(current => true)
    e.preventDefault();
    let suplemntList = [];
    suplemntList = users.map((user) => {
      return {
        cnicNumber: user.cnic,
        fullName: user.Name,
        // mobileNumber: user.phone,
        dtoList: [
          {
            base64: user.cnicfrontbase64.split("data:image/png;base64,")[1],
            name: `${user.cnic}_cnic_front.png`,
          },
          {
            base64: user.cnicbackbase64.split("data:image/png;base64,")[1],
            name: `${user.cnic}_cnic_back.png`,
          },
        ],
      };
    });

    const response = await axiosInstance.post(supplmentcardUrl, {
      list: suplemntList,
      id: supcardObj.id,
      moduleId: 0,
      statusId: 0,
    });
    if (response.status === 200) {
      setUser([usertemplet])
      setloaderBool(current => false)
      setsuccessModal(current=> !current)
      settermsConditionBool(current=> !current)

      setTimeout(() => {
        setsuccessModal(current=> !current)
      }, 4000);
    }else{
      setloaderBool(current => false)
      
    }

  };
  const [termsConditionBool, settermsConditionBool] = useState(false)

  const termConditionEvent = (e) => {
    // handleShow();
    settermsConditionBool(prev => e.target.checked)
    if (e.target.checked) {
      window.open(baseurl + "" + termsConditionsUrl);
    }
  }

  const acceptTermCondtionsProp = (e) => {
    settermsConditionBool(prev => e)
  }
  const navigate = useNavigate();
  return (
    <div className="container bg-primary1" style={{ backgroundImage: `url(${img3})` }}>
      <div className="row">
        <div className="col-12 pt-5 pb-5">
          <a onClick={() => navigate(-1)}><img src={img4} className="mt-3 position-absolute " alt="" /></a>
          <img src={img1} className="d-block m-auto" alt="" />
        </div>
      </div>

      <div className="row ">
        <div className="content w-100">
          <h2 className="mt-2 mb-4">
            Add Supplementary Card
          </h2>
          <form onSubmit={submitSupplementCard}>
            {users.map((user, index) => (
              <div className="loan-lists" key={index}>
                <div className="loan-list position-relative card1">
                  <div className="card-button-group">
                    <button type="button" className={`add-icon ${supcardObj.count !== users.length ? "pulse" : ''}`} onClick={adduser} disabled={supcardObj.count == users.length ? true : false}>
                      <img src={img2} className="d-block m-auto" alt="" />
                    </button>
                    {index !== 0 && <button type="button"
                      onClick={() => removeUsers(index)}
                      // disabled={supcardObj.count == users.length ? true:false}
                      className={`add-icon ${supcardObj.count !== users.length ? "pulse" : ''}`}
                    >
                      <img src={removeImg} className="d-block m-auto" alt="" />
                    </button>}
                  </div>
                  <div className="col-12 col-sm-6 mt-xs-10 form-group p-2">
                    <label htmlFor="exampleFormControlInput1">Full Name</label>
                    <input
                      className="form-control form-control-lg"
                      name="Name"
                      required pattern="[A-Z a-z]{3,}"
                      type="text"
                      onChange={(e) => onChange(e, index)}
                      value={user.Name}
                    />
                  </div>
                  <div className="col-12 col-sm-6 mt-xs-10 form-group p-2">
                    <label htmlFor="exampleFormControlInput1">
                      CNIC Number
                    </label>
                    <input
                      className="form-control form-control-lg"
                      required
                      placeholder="XXXXXXXXXXXXX"
                      name="cnic"
                      pattern="[0-9]{13}"
                      onChange={(e) => onChange(e, index)}
                      value={user.cnic}
                      type="tel"
                    />
                  </div>
                  {/* <div className="col-12 col-sm-6 mt-xs-10 form-group p-2">
                    <label htmlFor="exampleFormControlInput1">
                      Phone Number
                    </label>
                    <input
                      className="form-control form-control-lg"
                      required placeholder="03XXXXXXXXX"
                      name="phone"
                      pattern="[0-9]{11}"
                      onChange={(e) => onChange(e, index)}
                      value={user.phone}
                      type="tel"
                    />
                  </div>

                  <div className="col-12 col-sm-6 mt-xs-10 form-group p-2">
                  </div> */}

                  <div className="col-12 col-sm-6 mt-xs-10 form-group p-2">
                    <div className="form-group  mb-0">
                      <label htmlFor="exampleFormControlFile">CNIC Front</label>
                      <input
                        type="file"
                        className="form-control-file"
                        required
                        accept=".png"
                        name="cnicfront"
                        onChange={(e) => onChange(e, index)}
                        id="exampleFormControlFile"
                      />

                      {/* <label htmlFor="exampleFormControlFile" className="labelforFile">
                        {user.cnicfront.length > 0
                          ? user.cnicfront[0]?.name
                          : "Select Cnic Front Image"}
                      </label> */}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 mt-xs-10 p-2 form-group  ">
                    <div className="form-group mb-0">
                      <label htmlFor="exampleFormControlFile1">CNIC Back</label>
                      <input
                        type="file"
                        className="form-control-file"
                        required
                        accept=".png"
                        name="cnicback"
                        onChange={(e) => onChange(e, index)}
                        // value={user.cnicback}
                        id="exampleFormControlFile1"
                      />
                      {/* <label htmlFor="exampleFormControlFile1" className="labelforFile">
                        {user.cnicback.length > 0
                          ? user.cnicback[0]?.name
                          : "Select Cnic Back Image"}
                      </label> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Form.Check
              type={"checkbox"} checked={termsConditionBool}
              label={`Terms and Conditions`}
              value={termsConditionBool} onChange={(e) => termConditionEvent(e)}
            />

            <div className=" text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg pl-5 pr-5 submit-btn "
                disabled={(loaderBool || !termsConditionBool) ? true : false}
              >
                Submit {loaderBool && <Spinner style={{ marginLeft: "10px" }} animation="border" role="status" variant="light" ></Spinner>}
              </button>
            </div>
          </form>


          <TermsConditionModal show={show} handleClose={handleClose} acceptTermCondtionsProp={acceptTermCondtionsProp} />

          <Modal show={successModal} centered>
            <Modal.Body>
              <div className="success-Message">
                <img src={success} alt="" />
                <div>
                <b className="text-success">Thank you!</b> Your response has been recorded. You will receive an update within the next 7 days.
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};
