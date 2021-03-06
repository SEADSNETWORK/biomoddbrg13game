import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { Grid, Col, Row, Theme} from '../theme'
import SensorTypes from './sensorTypes';
import Plants, {Plant} from './plants';
import Countdown from './countdown';

const Controller = ({phase, phases, target, player})=>{
    const [theme, socket, client, gameSettings, sensorTypes] = useSelector(state => 
        [ state.data.theme, 
          state.data.socket, 
          state.data.client, 
          state.data.gameSettings,
          state.data.sensorTypes,
        ]);
    const [plantClusters, setPlantClusters] = useState(null);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(null);
    const [highScore, setHighScore] = useState(null);
    const ROT = 3;
    const TRA = 10;

    useEffect(()=>{
        if (socket){
            socket.on("/selected_", (selector)=>{
                setSelected(selector);
            })

            socket.on("/updateSensors", (plantClusters)=>{
                setPlantClusters(plantClusters);
            });

            socket.on("/score_", (score_)=>{
                setScore(score_)
            })

            socket.on("/highscore", (highscore_)=>{
                setHighScore(highscore_);
                console.log(highscore_);
            })
        }

        return ()=>{
            socket.off("/selected_");
            socket.off("/updateSensors");
            socket.off("/score_");
            socket.off("/highscore");
        }
    })

    
    if (!theme || !client || !gameSettings || !socket || !sensorTypes || !plantClusters){
        return null;
    }  

    const getSelected = ()=>{
        if (selected && selected.type){
            switch (selected.type){
                case "plant":
                    return <div> <br/>
                        -> Selection <br/>
                        {
                            (()=>{
                                const p = plantClusters[selected.index];
                                return <Plant init={true} key={p.name} name={p.name} sensors={p.sensors} />
                            })()
                        }
                        --------------------- <br/><br/>
                    </div>
                case "mirror":
                    const getVal = (value)=>{
                        return {index: selected.index, value}
                    }
                    return <div>
                        -> Mirror selected: [{selected.index}] <br/><br/>
                                <table>
                                    <tbody>
                                    <tr >
                                        <td  onClick={()=>{
                                            socket.emit("/rotateMirror_", getVal(ROT));
                                        }}>
                                            TURN LEFT
                                        </td>
                                        <td onClick={()=>{
                                            socket.emit("/rotateMirror_", getVal(-ROT));
                                        }}>
                                            TURN RIGHT
                                        </td>
                                    </tr>
                                    <tr>
                                        <td onClick={()=>{
                                            socket.emit("/moveMirror_", getVal({y: -TRA}));
                                        }}>
                                            GO UP
                                        </td>
                                        <td onClick={()=>{
                                            socket.emit("/moveMirror_", getVal({y: TRA}));
                                        }}>
                                            GO DOWN
                                        </td>
                                    </tr>
                                    <tr>
                                        <td onClick={()=>{
                                            socket.emit("/moveMirror_", getVal({x: -TRA}));
                                        }}>
                                            GO LEFT
                                        </td>
                                        <td onClick={()=>{
                                            socket.emit("/moveMirror_", getVal({x: TRA}));
                                        }}>
                                            GO RIGHT
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <br/><br/><br/>
                    </div>
                default:
                    return "wrong selection"
            }
        } else {
            return null;
        }
    }

    return <div>
                <br/>
                <p>
                    ||==================================||
                        &nbsp;&nbsp;&nbsp; BIOMODD [BRG<sup>13</sup>] SPECTRUM
                    ||==================================||
                </p>
                
                <div> 
                    GameStatus = {phase} 
                </div>

                {getSelected()}

                <div>
                    {player? <span>PlayerColor = {player} </span> : null}
                </div>
                <div>
                    {(target && phase == phases.RUNNING)? <span> 
                        <Countdown target={target} displaytext={"Time remaining"} endText={"THE END"} /> <br/>
                        </span> : null}
                </div>

                <br/>

                <div>
                {score?<div>
                            -- SCORE <br/>
                            RED: {score.red} <br/>
                            GREEN: {score.green} <br/>
                            BLUE: {score.blue} <br/>
                            TOTAL: {score.red+score.green+score.blue}
                        </div>:null}
                {highScore?<div>
                    HIGHSCORE_INDIVIDUAL: {highScore.HS1} <br />
                    HIGHSCORE_TOTAL: {highScore.HSA} <br />
                </div>:null}

                </div>
                

                <SensorTypes />
                <Plants plantClusters={plantClusters} />
                {/* {sensorTypes.map(st=><div>
                    {st.name}
                </div>)} */}

    </div>;
}

export default Controller;