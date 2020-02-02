import React, { useState } from "react";
import axios from "axios";

const Input = () => {
  const [state, updateState] = useState("77406");
  const [restaurant, updateRestaurant] = useState();
  const [imageUrl, updateImageUrl] = useState();
  const [yelpUrl, updateYelpUrl] = useState();

  const [isLoading, updateIsLoading] = useState(false);
  const url = process.env.REACT_APP_API_URL;

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
  return (
    <div>
      <h1>Enter zip code</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor=""></label>
          <input
            type="text"
            className="form-control"
            value={state}
            onChange={e => updateState(e.target.value)}
          />
        </div>
      </form>
      <br></br>
      {!isLoading ? (
        <button className="button" onClick={handleChange}>
          Search
        </button>
      ) : (
        <div className="loader"></div>
      )}
      <div>
        <h1>{restaurant}</h1>
      </div>
      <div style={{ maxWidth: "800px" }}>
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
      <div style={{ maxWidth: "800px" }}>
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
      </div>
    </div>
  );
};

export default Input;
