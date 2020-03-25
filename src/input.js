import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { geolocated } from "react-geolocated";

const Input = () => {
  const [state, updateState] = useState("77406");
  const [restaurant, updateRestaurant] = useState();
  const [imageUrl, updateImageUrl] = useState();
  const [yelpUrl, updateYelpUrl] = useState();
  const [latitude, updateLatitude] = useState();
  const [longitude, updateLongitude] = useState();

  const [isLoading, updateIsLoading] = useState(false);
  const url = process.env.REACT_APP_API_URL;

  const size = useWindowSize();

  const buttonDesktop = { width: "224px" };
  const buttonMobile = { width: "100%" };

  const handleChange = async () => {
    updateRestaurant("");
    updateImageUrl("");
    updateYelpUrl("");
    updateIsLoading(true);
    axios
      .post(url + "/send", {
        zip: state
      })
      .then(function(response) {
        updateRestaurant(response.data.restaurant);
        updateImageUrl(response.data.imageUrl);
        updateYelpUrl(response.data.yelpUrl);
        updateIsLoading(false);
      })
      .catch(function(error) {
        updateIsLoading(false);
      });
  };

  function useWindowSize() {
    const isClient = typeof window === "object";

    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
      if (!isClient) {
        return false;
      }

      function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
  }

  async function position() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      updateLatitude(crd.latitude);
      updateLongitude(crd.longitude);
      console.log(latitude);
      updateState(crd.latitude + "," + crd.longitude);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <div className="form-bg">
      <Form.Label>Enter zipcode</Form.Label>
      <Form.Control
        style={{ width: "100%" }}
        variant="primary"
        type="text"
        value={state}
        onChange={e => updateState(e.target.value)}
      />
      <br></br>
      {!isLoading ? (
        <Button
          onClick={handleChange}
          variant="primary"
          style={size.width < 768 ? buttonMobile : buttonDesktop}
        >
          Search
        </Button>
      ) : (
        <Button
          variant="primary"
          disabled
          style={size.width < 768 ? buttonMobile : buttonDesktop}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </Button>
      )}
      <Button
        onClick={position}
        variant="primary"
        style={size.width < 768 ? buttonMobile : buttonDesktop}
      >
        Get my Location (WIP)
      </Button>
      {/* <div style={{ maxWidth: "800px" }}>
        <h6>
          Support this App by using this link for $5 off your first three
          doordash orders
        </h6>
        <a href={"https://drd.sh/K9YtKW/"} target="_blank">
          <img
            src={"https://cdn.doordash.com/img/dasher/DD_OpenGraph_preview.png"}
            alt="previewimage"
            style={({ height: "200px" }, { width: "100%" })}
          />
        </a>
      </div> */}
      <div>
        <h1>{restaurant}</h1>
      </div>
      <div style={{ maxWidth: "400px" }}>
        {imageUrl ? (
          <a href={yelpUrl} target="_blank">
            <img
              src={imageUrl}
              alt="previewimage"
              style={({ height: "200px" }, { width: "100%" })}
            />
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Input;
