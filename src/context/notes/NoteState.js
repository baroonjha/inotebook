import React, { useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  const s1 = {
    name: "Baroon",
    class: "Bsc",
  };
  const [state, setState] = useState(s1);
  const update = () => {
      setTimeout(() => {
        setState({
          name: "Jhunu",
          class: "HS",
        });
      }, 1000);
    };
    

  return (
    <noteContext.Provider value={{state,update}}>{props.children}</noteContext.Provider>
  );
};
export default NoteState;
