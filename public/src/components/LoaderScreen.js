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

              || ==== MULTIPLAYER GAME ==== ||
              <br/><br/><br/>
              <div style={{paddingLeft: "10%", paddingRight: "10%"}}>
              All the computer terminals in the installation are connected into a local network. An abstract computer game was created specifically for this Biomodd version and is running on this network. The game is conceived as a multiplayer game and players can choose either to cooperate or compete with other players. The goal of the game is to illuminate as many virtual plants as possible within a limited timeframe.
            The data from the different sensors in the installation are used to generate the virtual world that appears at the beginning of each round. In this way, both humans and biological organisms have a presence in the game.
            <br/><br/>
            You can rotate your chosen light using the circular handle by clicking and dragging. Additionally, you can move the mirrors by dragging them around and rotate them using their circular handle. The goal of the game is to create an optimal system where your light touches the most plants in the playing field.
              </div>

              <br/><br/><br/><br/>

              || ==== INTERACTIVE LIGHT AND SOUND ==== ||
              <br/><br/><br/>
              <div style={{paddingLeft: "10%", paddingRight: "10%"}}>
              The lighting system has two modes. In standby mode purple grow lights stimulate the growth of the plants. As soon as people start interacting with the computer game, the lighting switches to an interactive mode. Computer-controlled lighting reflects the activities of the players and creates a real-world extension of the game's virtual aesthetics. 

The audio is a dynamic soundscape that is generated in real-time using the electrical signals from the plants. In essence, it's the plant's response to the ever-changing environment and interactions in the museum that become audible.

              </div>
            </div>
    </div> 
}

export default LoaderScreen;