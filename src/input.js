import React, { useState } from "react";
import axios from "axios";

const Input = () => {
  const [state, updateState] = useState("77406");
  const [restaurant, updateRestaurant] = useState();

  const handleChange = async () => {
    console.log(state);
    await axios({
      method: "post",
      url: "http://localhost:5000/send",
      data: { zip: state }
    });
    var result = await axios.get("http://localhost:5000/outcome");
    updateRestaurant(result.data);
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
