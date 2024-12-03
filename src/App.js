import './App.css';
import ROSLIB from 'roslib';
import { useState , useEffect} from 'react';

const ros = new ROSLIB.Ros({
  url: 'ws://10.181.15.175:64205'
});

const sub_current = new ROSLIB.Topic({
    ros : ros,
    name : '/to_wpc',
    messageType : 'geometry_msgs/Point'
});

const pub_target = new ROSLIB.Topic({
    ros : ros,
    name : '/from_wpc',
    messageType : 'geometry_msgs/Point'
});

function CurrentView()
{
  const [cur_pos, setPosition] = useState({x:0.0, y:0.0, r : 0.0});

  useEffect(()=>{
    sub_current.subscribe((msg)=>{
      setPosition({
        x: msg.x,
        y: msg.y,
        r: msg.z
      });
    });

    return () =>{
      sub_current.unsubscribe();
    };
  }, []);

  return(
    <div>
      <p style={{ fontSize: "48px" }}>Current Pose</p>
      <p>x:{cur_pos.x}</p>
      <p>y:{cur_pos.y}</p>
      <p>rotation:{cur_pos.r}</p>
    </div>
  );
  
}

function TargetPublisher()
{
  const send = (tx, ty, tz) =>{
    const msg = new ROSLIB.Message({
        x : tx,
        y : ty,
        z : tz
    });

    pub_target.publish(msg);
  };

  const [x, SetX] = useState(0.0);
  const [y, SetY] = useState(0.0);
  const [z, SetZ] = useState(0.0);

  const xHandler = (event) =>{
    const inputValue = parseFloat(event.target.value);
    if(!isNaN(inputValue))
    {
      SetX(inputValue);
    }
  };

  const yHandler = (event) =>{
    const inputValue = parseFloat(event.target.value);
    if(!isNaN(inputValue))
    {
      SetY(inputValue);
    }
  };
    
  const zHandler = (event) =>{    
    const inputValue = parseFloat(event.target.value);
    if(!isNaN(inputValue))
    {
      SetZ(inputValue);
    }
  };

  const Click = () => {
      send(x, y, z);
  }

  return(
    <div>
      <p style={{ fontSize: "48px" }}>Target Pose</p>
      <label htmlFor="xInput">x:</label>
      <input
          type="number"
          id="xInput"
          value={x}
          onChange={xHandler}
      />
      <p></p>
      <label htmlFor="yInput">y:</label>
      <input
          type="number"
          id="yInput"
          value={y}
          onChange={yHandler}
      />
      <p></p>
      <label htmlFor="zInput">rotation:</label>
      <input
          type="number"
          id="zInput"
          value={z}
          onChange={zHandler}
      />
      <p></p>
      <button onClick={Click} style={{
          fontSize: '24px', 
          padding: '40px 80px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer', }}>Publish</button>
      </div>
  );
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
            <CurrentView />
            <TargetPublisher />
      </header>
    </div>
  );
}



export default App;
