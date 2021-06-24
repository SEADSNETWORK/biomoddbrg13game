import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { Col, Row} from '../theme'
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.svg'


const Nav = ()=>{
    const theme = useSelector(state => state.data.theme);
    

    if (!theme ){
        return null;
    }

    

    return <Row center="xs">


        <Col xs={8} sm={2}>
            <NavLink to="/">
            <img src={Logo} style={{width: "100%"}}/>
            </NavLink>
        </Col>
        <Col xs={12} sm={10}>
            <br/><br/>
            <NavLink to="/">
            <theme.Text >
              <span style={{color: "white", fontSize: "4em", fontWeight: "bold"}}>
                  &nbsp;BIOMODD [BRG<sup>13</sup>]
              </span>
                
            </theme.Text>
            </NavLink>
            <theme.Container>
            <theme.Text>
                <NavLink to="/gamelegacy" style={{color: "white"}}>
                &nbsp;&nbsp;&nbsp;-> TEST GAME (legacy)
                </NavLink>
                <NavLink to="/server" style={{color: "white"}}>
                &nbsp;&nbsp;&nbsp;-> TEST SERVER
                </NavLink>
                <NavLink to="/" style={{color: "white"}}>
                &nbsp;&nbsp;&nbsp;-> HOME
                </NavLink>
            </theme.Text>
            </theme.Container>
            

        </Col>

       
    </Row>

}

export default Nav;


{/* <theme.Container>
            <br/><br/>
            <theme.Wrapped>
              <theme.Container>
                <theme.Title>
                    GoTo
                </theme.Title>
                <theme.Text>
                  <ul>
                    <li onClick={getScroller(newsref)}>
                      -> news
                    </li>
                    <li onClick={getScroller(gameref)}>
                      -> game
                    </li>
                    <li onClick={getScroller(restref)}>
                      -> store and retrieve data (RESTful)
                    </li>
                    <li onClick={getScroller(socketref)}>
                      -> store and retrieve data (WEBSOCKET)
                    </li>
                  </ul>
                </theme.Text>
              </theme.Container>
            </theme.Wrapped>
          </theme.Container> */}