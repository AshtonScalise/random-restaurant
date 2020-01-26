import React, { useState } from "react";
import axios from "axios";

const Input = () => {
  const [state, updateState] = useState("77406");
  const [restaurant, updateRestaurant] = useState();
  const url = process.env.REACT_APP_API_URL;

  const handleChange = async () => {
    updateRestaurant("");
    axios
      .post(url + "/send", {
        zip: state
      })
      .then(function(response) {
        updateRestaurant(response.data);
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
    </div>
  );
};

export default Input;
