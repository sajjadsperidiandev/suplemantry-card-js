import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import img1 from '../images/supplementary_card.png'
import img3 from '../images/logo_mark.png'
import { axiosInstance } from "../config/axios";
import { supplmentCardgetStatusUrl, supplmentCardgetUrl } from "../utils/apiurls";
import Loader from "./Loader";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [suppCount, setsuppCount] = useState(0)
  const [loaderbool, setloaderbool] = useState(false)

  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    getsupplmentCard(id)
  }, [id])

  const getsupplmentCard = async (supid) => {
    setloaderbool(prevBool => true)
    await axiosInstance.get(`${supplmentCardgetUrl}/${supid}`).then(response=> {

      if (response?.data?.suppCount) {
        setTimeout(() => {
          setloaderbool(prevBool => false)
  
        }, 500);
        setsuppCount(response?.data?.suppCount)
  
      }
    }).catch(err=>{
      setTimeout(() => {
        setloaderbool(prevBool => false)
      }, 500);
    })   
  }

  const getSuplCardStatus = async (supid) => {
    setloaderbool(prevBool => !prevBool)
    const response = await axiosInstance.get(`${supplmentCardgetStatusUrl}/${supid}`)
    setloaderbool(prevBool => false)
    navigate("/sup-card", { state: { count: suppCount, id: id } })

  }


  return (

    <>
      {loaderbool && <Loader />}

      <div className="container bg-primary1" style={{ backgroundImage: `url(${img3})`,opacity: loaderbool ? "0.5" : "1" }}>
        <div className="row">
          <div className="col-12 pt-5 pb-5">
            <img src={img1} className="d-block m-auto" alt="" />
          </div>
        </div>

        <div className="row m-0">
          <div className="content content-welcome-screen">
            <h2 className="mt-2 mb-4 fw-bold">Welcome!</h2>
            <p>
            Dear Customer, get up to 6 supplementary cards in 3 simple steps. Click Yes to Proceed
                      </p>
            {/* <ul className="info_doc">
              <li>
                <span>1</span> No documentation required
              </li>
              <li>
                <span>2</span> No Branch visits
              </li>
              <li>
                <span>3</span> Processing under 24 hours
              </li>
            </ul>
            <p>
              If you are interested press yes to raise a request if your request is
              approved you will receive an SMS with in one working day.
            </p> */}

            <div className="d-flex justify-content-center mt-4">
              <Button
                disabled={suppCount ? false : true}
                className="btn btn-primary btn-lg mx-2"
                onClick={() => {
                  getSuplCardStatus(id)
                }
                }
              >
                YES
              </Button>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};
