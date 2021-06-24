import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Col, Row} from '../theme'
import Spectrum from '../components/spectrum'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Controller from './controller'
import Score from './score';
import LoaderScreen from './LoaderScreen';
import { ACTIONS as DATA_ACTIONS } from "../reducers/DataReducer"

const Game = ()=>{

    const PHASES = Object.freeze({
      LOAD: "load",
      RUNNING: "running",
      END: "ended"
    });

    const [theme, socket, client, gameSettings, plantClusters, sensorTypes] = useSelector(state => 
      [ state.data.theme, 
        state.data.socket, 
        state.data.client, 
        state.data.gameSettings,
        state.data.plantClusters,
        state.data.sensorTypes
      ]);
    const [start, setStart] = useState(null);
    const [phase, setPhase] = useState(PHASES.END);
    const [players, setPlayers] = useState(null);
    const [player, setPlayer] = useState(null);
    const [target, setTarget] = useState(null);
    const [listeners, setListeners] = useState(null);
    const dispatch = useDispatch();
    const handle = useFullScreenHandle();

    const gamewidth = 9;
    
    const setTargetFromDate = (seconds)=>{
      const d = new Date();
      d.setSeconds( d.getSeconds() + seconds);
      setTarget(d)
    }

    useEffect(()=>{
      console.log("fuck")
      if (socket){
        setListeners(true);
        socket.on("/phase", (newphase)=>{
          setPhase(newphase);
          switch(newphase){
            case PHASES.END:
              setPlayer(null);
              setTarget(null);
              break;
            case PHASES.LOAD:
              if (gameSettings){
                setTargetFromDate(gameSettings.beginningTime);
              }
              break;
            case PHASES.RUNNING:
              if (gameSettings){
                setTargetFromDate(gameSettings.duration);
              }
              break;
          } 
        })

        if (!players){
          socket.emit("/givePlayers"); 
        }
    
        socket.on("/players", (newplayers)=>{
          setPlayers(newplayers);
        })
      }

      return ()=>{
        // clean up our listeners here
        if (socket){
          socket.off("/phase");
          socket.off("/players");
          setListeners(false);
        }
      }
    }, [listeners, setListeners, socket, gameSettings])

    const go = ()=>{
        setStart(true);
        handle.enter();
    }

    const content = ()=>{
      switch(phase){
        case PHASES.LOAD : 
        case PHASES.END :
          return <LoaderScreen player={player} players={players} socket={socket} setPlayer={setPlayer} target={target} />
        case PHASES.RUNNING : 
          return <Spectrum 
                      socket={socket} 
                      player={player} 
                      players={players} 
                      scoreUpdate={gameSettings.scoreUpdate} 
                      />;
      }
    }

    if (!theme || !client || !gameSettings || !players){
        return null;
    }

    return <div>
      {start?null:<button onClick={go}>LOAD</button>}

      <FullScreen handle={handle}>
        <Row>
          <Col xs={12} sm={12} md={gamewidth}>
            <theme.Empty style={{padding: "0", margin: "0"}}>
              <div style={{width: "100%", height: "100vh"}}> 
                {(gameSettings)?start?content():content() : null}
                </div>
                <div>
                  <Score socket={socket} />
                </div>
            </theme.Empty>
          </Col>
          <Col xs={12} md={12-gamewidth} style={{background: "black", color: "white", borderLeft: "solid 2px white"}}>
            <Controller phase={phase} phases={PHASES} target={target} player={player} />
          </Col>
        </Row>
      </FullScreen>
    </div>
}

export default Game;


