import React, { useState, useEffect } from "react";
import SVGIcon from "./SVGIcon";

function HueLight({ light_id }) {
  const [light, setLight] = useState({});

  const fetchData = async id => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_HUE_BASE}/lights/${id}`
      );
      setLight(response.json());
    } catch (err) {
      //error
    }
  };

  useEffect(() => {
    fetchData(light_id);
  }, [light_id]);

  return (
    <div className="huelight">
      <div>
        <SVGIcon name="lightbulb-outline" fill="#49c" />
      </div>
      <div className="subtext">{light.name}</div>
    </div>
  );
}

export default HueLight;
