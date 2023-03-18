import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles.css";
import HistoryComponent from "./HistoryComponent";
import UsersComponent from "./UsersComponent";

const SingleUserComponent = () => {
  const { userId } = useParams();
  const [sUserData, setSUserData] = useState({ company: {}, address: {} });

  //GET USER DATA WITH ID
  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong!");
        return res.json();
      })
      .then((data) => setSUserData(data));
  }, [userId]);

  return (
    sUserData && (
      <div className="single-user-container">
        <div className="header">
          <img src={sUserData.imageUrl} alt={`user${sUserData.id}`} />
          <fieldset className="info-field">
            <legend>Info</legend>
            <strong>{`${sUserData.prefix} ${sUserData.name} ${sUserData.lastName}`}</strong>
            <p style={{ fontStyle: "italic" }}>{sUserData.title}</p>
            <br />
            <p>
              <span>Email</span>
              {`: ${sUserData.email}`}
            </p>
            <p>
              <span>Ip Address</span>
              {`: ${sUserData.ip}`}
            </p>
            <p>
              <span>Job Area</span>
              {`: ${sUserData.jobArea}`}
            </p>
            <p>
              <span>Job Type</span>
              {`: ${sUserData.jobType}`}
            </p>
          </fieldset>
          <fieldset>
            <legend>Address</legend>
            <strong>{`${sUserData.company.name} ${sUserData.company.suffix}`}</strong>
            <p>
              <span>City</span>
              {`: ${sUserData.address.city}`}
            </p>
            <p>
              <span>Country</span>
              {`: ${sUserData.address.country}`}
            </p>
            <p>
              <span>State</span>
              {`: ${sUserData.address.state}`}
            </p>
            <p>
              <span>Street Address</span>
              {`: ${sUserData.address.streetAddress}`}
            </p>
            <p>
              <span>ZIP</span>
              {`: ${sUserData.address.zipCode}`}
            </p>
          </fieldset>
        </div>
        <div>
          <HistoryComponent className="view-history" />
          <h2>Friends:</h2>
          <UsersComponent className="friends-container" userId={userId} />
        </div>
      </div>
    )
  );
};

export default SingleUserComponent;
