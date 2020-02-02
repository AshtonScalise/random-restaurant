import React, { useState } from "react";
import axios from "axios";

const Input = () => {
  const [state, updateState] = useState("77406");
  const [restaurant, updateRestaurant] = useState();
  const [imageUrl, updateImageUrl] = useState();
  const [yelpUrl, updateYelpUrl] = useState();
  const url = process.env.REACT_APP_API_URL;

  const handleChange = async () => {
    updateRestaurant("");
    updateImageUrl("");
    updateYelpUrl("");
    axios
      .post(url + "/send", {
        zip: state
      })
      .then(function(response) {
        updateRestaurant(response.data.restaurant);
        updateImageUrl(response.data.imageUrl);
        updateYelpUrl(response.data.yelpUrl);
      })
      .catch(function(error) {});
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
      <button className="button" onClick={handleChange}>
        Search
      </button>
      <div>
        <h1>{restaurant}</h1>
      </div>
      <div>
        {imageUrl ? (
          <a href={yelpUrl} target="_blank">
            <img
              src={imageUrl}
              alt="previewimage"
              style={({ maxWidth: "100%" }, { height: "200px" })}
            />
          </a>
        ) : (
          ""
        )}
      </div>
      <div>
        <h6>
          Support this App by using this link for $5(x3) off your first three
          doordash orders
        </h6>
        <a href={"https://drd.sh/K9YtKW/"} target="_blank">
          <img
            src={"https://cdn.doordash.com/img/dasher/DD_OpenGraph_preview.png"}
            alt="previewimage"
            style={({ maxWidth: "100%" }, { height: "200px" })}
          />
        </a>
      </div>
    </div>
  );
};

export default Input;
