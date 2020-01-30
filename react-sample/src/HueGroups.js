import React from "react";
import "./Hue.css";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

function HueGroups({ group, groupId }) {
  const marks = [
    {
      value: 0,
      label: "0%"
    },
    {
      value: 20,
      label: "20%"
    },
    {
      value: 50,
      label: "50%"
    },
    {
      value: 100,
      label: "100%"
    }
  ];


  function valuetext(value) {
    return `${value}%`;
  }

  const [state, setState] = React.useState({
    checked: group.action.on
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    toggleHueLight(event.target.checked);
  };

  const toggleHueLight = async (state) => {
      const data = {"on":state};

      await fetch(      
        `${process.env.REACT_APP_URL_HUE_BASE}/groups/${groupId}/action`, 
        {
          method: 'PUT',
          body: JSON.stringify(data)
        }
      );
  };

  return (
    <fieldset>
        <legend>{group.name}</legend>
    <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
      <Grid item xs={8}>
        <Slider
          defaultValue={80}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Grid>
      <Grid item xs={2}>
        <Switch
          checked={state.checked}
          onChange={handleChange("checked")}
          value="checked"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Grid>
    </Grid>
    </fieldset>
  );
}

export default HueGroups;
