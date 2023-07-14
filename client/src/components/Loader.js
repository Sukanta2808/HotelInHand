import React from "react";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
  return (
    <div style={{marginTop: '150px'}}>
    <div className="text-center">
      <RingLoader color="#ffc107" size={150} />
    </div>
    </div>
  );
}

export default Loader;
