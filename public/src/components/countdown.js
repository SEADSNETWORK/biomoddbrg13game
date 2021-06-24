import React, {useState, useEffect} from "react";

const Countdown = ({target, displaytext, endText})=>{
    const [rt, setrt] = useState(null);
    const [count, setCount] = useState(0);
  
    const secondsToTarget = ()=>{
      if (rt){
        return Math.floor(Math.abs((new Date().getTime() - rt.getTime()) / 1000));
      } else {
        return null;
      }
    }
  
    useEffect(()=>{
      let int = null;
  
      if (target !== rt){
        setrt(target);
        setCount(null);
      }
  
      if (rt){
        int = setInterval(()=>{
          setCount(secondsToTarget());
        }, 500);
      }
  
      return ()=>{
        if(int){
          clearInterval(int)
        }
      }
    })
  
    if (!target || !rt || !count){
      return null;
    } else if (count && count > 0){
      return <div>
        {displaytext}: {count}
      </div>
    } else {
      return <div> {endText} </div>
    } 
  }

export default Countdown;