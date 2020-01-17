import React, { useState } from "react";

const Input = () => {
  const [state, updateState] = useState("77406");

  const handleChange = () => console.log(state);

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
    </div>
  );
};

export default Input;
