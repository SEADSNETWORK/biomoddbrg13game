import React from 'react';
import Countdown from './countdown';

const LoaderScreen = ({player, players, socket, setPlayer, target})=>{


    const MakePlayer = (color)=>{

        const killed = <div className="kill" >
          [PLAY {color.toUpperCase()}]
        </div>;
  
        const selected = <div>
          [{color.toUpperCase()} SELECTED]
        </div>;
  
        if (player){
          if (player == color){
            return selected;
          } else if (player == color+"s"){
              return selected;
          } else {
            return killed;
          }
        }
  
        if (players[color] && players[color+"s"]){
          return killed;
        } else if (players[color]){
          return <div className="hoverer" onClick={()=>{
            if (!player){
              socket.emit("/startgame", color+"s");
              setPlayer(color+"s");
            }
          }}>
            [PLAY {color.toUpperCase()} support]
          </div>
        } else {
          return <div className="hoverer" onClick={()=>{
            if (!player){
              socket.emit("/startgame", color);
              setPlayer(color)
            }
          }}>
            [PLAY {color.toUpperCase()}]
          </div>
        }
      }

    
      
    return <div style={{color: "white"}}>
            <div style={{color: "white", width: "100%", textAlign:"center"}}>
              <br/><br/><br/>
              || ==== LOAD NEW GAME ==== ||
              <br/><br/>
  
              <div >
                {MakePlayer("red")}
                {MakePlayer("green")}
                {MakePlayer("blue")}
              </div>
  
              <br/><br/><br/>
              <Countdown target={target} displaytext={"Time before launch"} endText="LETS GO"/>
            </div>
    </div> 
}

export default LoaderScreen;