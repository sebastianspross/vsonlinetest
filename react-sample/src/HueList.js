import React, { useState, useEffect } from "react";
import HueGroups from "./HueGroups";

function HueList() {
  useEffect(() => {
    fetchHueGroups();
  }, []);

  const [groups, setGroups] = useState([]);
  const fetchHueGroups = async () => {
    const data = await fetch(      
      `${process.env.REACT_APP_URL_HUE_BASE}/groups`
    );

    const data_json = await data.json();
    const result = Object.keys(data_json).map(function(_) {
      return data_json[_];
    });
    setGroups(result);
  };

  return (
    <div>
      {groups.map( (group, index) => (
        <HueGroups key={group + index} group={group} groupId={index+1} />
      ))}
    </div>
  );
}

export default HueList;
