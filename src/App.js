import logo from './moti_auto.svg';
import './App.css';
import { useState } from 'react';
import ROSLIB from 'roslib';

const ros = new ROSLIB.Ros({
  url : 'ws://192.168.11.65:9090'
});
const topic = new ROSLIB.Topic({
  ros : ros,
  name : '/from_iphone',
  messageType : 'std_msgs/Int32'
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Button />
        </p>
        
      </header>
    </div>
  );
}

function Button()
{
  const send = (value) =>{
    const msg = new ROSLIB.Message({
      data : value
    });

    topic.publish(msg);
  };

  const [count, setCount] = useState(0);
  const handleClick = () =>{
    setCount(count + 1);
    send(count);
  }
  
  return(
    <button onClick={handleClick} style={{
       fontSize: '24px', 
       padding: '40px 80px',
       backgroundColor: '#4CAF50', // 背景色
       color: 'white',            // テキストの色
       border: 'none',            // ボーダーを非表示
       borderRadius: '5px',       // 角を丸くする
       cursor: 'pointer', }}>{count}</button>
  );
}

export default App;
