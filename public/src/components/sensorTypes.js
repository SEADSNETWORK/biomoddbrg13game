import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const SensorType = ({name, description})=>{
    const [open, setOpen] = useState(false);

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
            {description}
            <br/><br/>
        </div> : null}
    </div>

}

const SensorTypes = ()=>{
    const sensorTypes = useSelector(state => state.data.sensorTypes)
    const [open, setOpen] = useState(false);

    const toggle = ()=>{
        setOpen(!open);
    }

    if (!sensorTypes){
        return null;
    }

    return <div>
        <span >
            --> <span className="hoverer" onClick={toggle}>  SENSORTYPES   {open?<span>[X]</span>:null}</span>
        </span>
        
        {open?sensorTypes.map(st=><SensorType key={st.name} name={st.name} description={st.description} />):null}
    </div>

    
}

export default SensorTypes;