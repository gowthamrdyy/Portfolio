import React from "react";
import myphoto from "../../img/myphoto.png"; // adjust the path if needed

const Logo = () => {
  return (
    <img
      src={myphoto}
      alt="My Logo"
      style={{
        width: "200px", // adjust size as needed
        height: "auto",
        borderRadius: "50%", // makes it circular, remove if you want a square
      }}
    />
  );
};

export default Logo;