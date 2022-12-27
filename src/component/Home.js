import React from "react";
import Notes from './Notes'

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
    

      {/* Notes is another component where we are handle Notes */}
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
