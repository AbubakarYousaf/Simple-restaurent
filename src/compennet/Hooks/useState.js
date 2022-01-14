import React from "react";
import "./style.css";

const UseState = () => {
  // const initialData = 15;
  const [myNum, setMynum] = React.useState(0);
  

  return (
    <>
      <div className="center_div">
        <p>{myNum}</p>
        <div class="button2" onClick={()=> setMynum(myNum+1)} >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        <div
          class="button2" onClick={()=> myNum > 0 ?setMynum(myNum-1):
            setMynum(0)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          DECR
        </div>
      </div>
    </>
  );
};

export default UseState;