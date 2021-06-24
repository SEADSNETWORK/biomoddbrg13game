import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Sensor = ({type, value})=>{
    const [history, setHistory] = useState([]);

    useEffect(()=>{

    })

    return <div className="indenter">
        {type} - {value}
    </div>

}

export const Plant = ({name, sensors, init})=>{
    const [open, setOpen] = useState(init);

    const toggle = ()=>{
        setOpen(!open);
    }

    return <div >

            {open?<br/>:null}
        
            <span>
            --->&nbsp;
            </span>
            <span className="hoverer" onClick={toggle}>
                [{name}] {open?<span>[X]</span>:null}
            </span>
        
        <br/>
        {open?
        <div className="indenter" >
            {sensors.map((s, i)=><Sensor key={"sensor"+i} type={s.type} value={s.value} />)}
            <br/><br/>
        </div> : null}
    </div>

}

const Plants = (plantClusters)=>{
    const [open, setOpen] = useState(false);


    const toggle = ()=>{
        setOpen(!open);
    }

    

    useEffect(()=>{
    })

    if (!plantClusters){
        return null;
    }

    return <div>
        <span >
            --> <span className="hoverer" onClick={toggle}>  PLANTS   {open?<span>[X]</span>:null}</span>
        </span>
        
        {open?plantClusters.map(p=><Plant key={p.name} name={p.name} sensors={p.sensors} />):null}
    </div>

    
}

export default Plants;