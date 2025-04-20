import {useEffect, useState } from 'react';
import './App.css';
import {getChange, getMat , getVal, handleMove, isBingo,predict, setBlock, Table} from './components/Services';
import Values from './components/Values';

function App() {

  const [visted, setVisted] = useState([]);
  const [computer, setComputer] =  useState([]);
  const [data, setData] = useState([]);
  const [win , setWin] = useState('');
  const [computerVal, setComputerVal]= useState([]);
  const [userVals, setUserVals]= useState([]);
  const [reset , setReset] = useState(false);
  const [loading, setLoading] = useState(false);


  const updateBlock = (userVal)=>{
    if(win) return ;
    
    if(setBlock(userVal, visted)) return ;
    setUserVals((prev)=>[...prev, userVal]);
    if(handleMove(isBingo(data , visted), isBingo(computer ,visted, false), setWin)){
      setVisted([...visted]);
      return ;
    }

    setLoading(true);

     setTimeout(()=>{
      let val = predict(computer, visted);
      setBlock(val, visted);
      setComputerVal((prev)=>[...prev, val]);
      if(handleMove(isBingo(data , visted), isBingo(computer ,visted, false), setWin)){
        setVisted([...visted]);
        setLoading(false);
        return ;  
      }
      setVisted([...visted]);
      setLoading(false);
     }, 1200);
  }

  useEffect(() => {
    setData(getMat());
    setComputer(getMat());
    setVisted(()=>getVal());
    setWin('');
    setComputerVal([]);
    setUserVals([]);
  }, [reset]);

  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>BINGO GAME</h1>
      <Values values={userVals}  player="You"/>
      <Values values={computerVal}  player="opponent"/>
      <br></br>
      <div  className='tablesblock'>
        <Table loading={loading} data={data} visted={visted} updateBlock={updateBlock} player='You'/>
        {win && <Table data={computer} visted={getChange(computer, visted)}  player="Opponet"/>}
      </div>
      <br></br>
      {win && 
      <div>
        <p> {win}</p>
        <button className='button' onClick={()=>setReset(!reset)}> RESET</button>
      </div>}
      {!win && <button className='button' onClick={()=>setWin("Computer wins!")}> GIVE UP</button>}
    </div>
  );
}

export default App;
