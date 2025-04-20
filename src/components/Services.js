export function getMat() {
    let set = new Array(25).fill(false);
    let input = Array.from({ length: 5 }, () => new Array(5).fill(0));
    for(let i =0; i<5; i++){
        for(let j =0; j<5; j++){
            let num = Math.floor(Math.random() * 25) + 1;
            while(set[num-1]){
                num = Math.floor(Math.random() * 25) + 1;
            }
            set[num-1] = true;
            input[i][j] = num;
        }
    }
    return input;
 }

 export function getChange(computer, visted) {
    let newvisted = [...visted];

    for(let i=0; i<newvisted.length; i++){
      if(newvisted[i] === 'c') newvisted[i] = 'v';
    }
    isBingo(computer, newvisted);
    return newvisted;
 }

 export function isBingo(user, visted, b = true) {

    let count =0, j =0;

    for(let i =0; i<5; i++){
        for(j =0; j<5 && visted[user[i][j]]; j++);
        if(j === 5){
          for(j =0; j<5 && b; j++)  visted[user[i][j]] = 'c';
          count++;
        }
        for(j =0; j<5 && visted[user[j][i]]; j++);
        if(j === 5){
          for(j =0; j<5 && b; j++) visted[user[j][i]] = 'c';
          count++;
        }
    }

    for(j =0; j<5 && visted[user[j][j]]; j++);
    if(j === 5){
      for(j =0; j<5 && b; j++) visted[user[j][j]] = 'c';
      count++;
    }
    
     for(j =0; j<5 && visted[user[j][4-j]]; j++);
     if(j === 5){
      for(j =0; j<5 && b; j++) visted[user[j][4-j]] = 'c';
      count++;
    }
    
     return count;
 }

 export const getVal = () => new Array(26).fill('');

 export function setBlock(val, visted) {
    val = parseInt(val);  
    if (visted[val]) {
      alert("Already visited this block");
      return true;
    }
  
    visted[val] = 'v';
    return false;
  }

  export const handleMove= (curr, opp, setWin)=>{
    curr = curr >= 5;
    opp = opp >=5;
    if(curr || opp){
      setWin(curr&&opp ? "draw" : curr ? "You win!" : "Computer wins!");
      return true;
    }
    return false; 
  }
  

export function predict(computer, visted) {
  let count =6, j =0, val = new Set();

  let one = new Set(), two = new Set(), tempcount1 =0, tempcount2 =0;

  const updateVal = (cellVal = new Set(), freq) => {
    if(freq > 0 && freq < count){
      count = freq;
      val = cellVal;
    }
    else if(freq === count){
      cellVal.forEach(k =>  val.add(k));
    }

  }

  for(j =0; j<5; j++){
    if(!visted[computer[j][j]]){
      tempcount1++;
      one.add(computer[j][j]);
    }
    if(!visted[computer[j][4-j]]){
      tempcount2++;
      two.add(computer[j][4-j]);
    }
  }  

  updateVal(one, tempcount1);
  updateVal(two, tempcount2);
  
  for(var i =0; i<5; i++){
    tempcount1 =0;
    tempcount2 =0;
    one = new Set();
    two = new Set();
      for(j =0; j<5; j++){
        if(!visted[computer[i][j]]){
          tempcount1++;
          one.add(computer[i][j]);
        }
      }
      for(j =0; j<5; j++){
        if(!visted[computer[j][i]]){
          tempcount2++;
          two.add(computer[j][i]);
        }
      }
      updateVal(one, tempcount1);
      updateVal(two, tempcount2);
    }

    let max = -1, predictedValue = -1;
    
    for(let value of val){
      visted[value] = 'v';
      count = isBingo(computer, visted, false);
      visted[value] = '';
      if(max < count){
        max = count;
        predictedValue = value;
      }
    }

   return predictedValue;
}

export function Table({data, visted, updateBlock = ()=>{}, loading = false, player}) { 
  return(  
    <div>
      <h2>{player}</h2>
      <div className="section">
        {loading &&<div className="outterloading"> <div class="loader"></div> </div>}
        <table>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td className={ visted[cell]==='c' ? "marked" : visted[cell] ? 'crossed' : 'uncrossed'} key={cellIndex} onClick={()=>updateBlock(cell) } >{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    </div>
  
)};