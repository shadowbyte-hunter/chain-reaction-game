const board=document.getElementById('gamegrid');
 let totalmove=0;
for(let i=0;i<72;i++){ 
    const cell=document.createElement('div');
    cell.classList.add('cell');
    cell.id=`cell-${i}` 
    board.appendChild(cell);
    cell.setAttribute('cellowner','none');
    cell.setAttribute('celldots','0');
    cell.onclick=function(){
        handleMove(this);
        totalmove++;
    };
    cell.onmouseover = function() {
    let owner = cell.getAttribute('cellowner');

    if ( owner==='none'||owner === currentPlayer) {
        cell.classList.add('valid-hover');
        
    } 
    else if(owner!=currentPlayer) {
        cell.classList.add('invalid-hover');
    
    }
   
};

cell.onmouseout = function() {
    cell.classList.remove('valid-hover');
    cell.classList.remove('invalid-hover');
    cell.style.border = "1px solid rgb(101, 74, 142);"; 
};
}

const score={blue1:0,red1:0};
let currentPlayer='blue';
let gamestart=false;
function handleMove(cell){
    turntime=15;
    if(gamestart==false)
    {startTimer();
        gamestart=true;
    }
    let owner=cell.getAttribute('cellowner');
    let dots=parseInt(cell.getAttribute('celldots'));
    let index=parseInt(cell.id.replace('cell-',''));
    let capacity=getCapacity(index);
  
    const playercells=document.querySelectorAll(`[cellowner="${currentPlayer}"]`);
    const anydots=playercells.length>0;
    if((!anydots && owner==='none')||owner===currentPlayer){
        if(owner==='none'){ 
        dots=capacity-1;}
    else{dots++;
    }
    renderDots(cell,dots,currentPlayer);
   
 
}
   
if (owner === 'none') {
    if (currentPlayer === 'blue') { score.blue1 += dots; } 
    else { score.red1 +=dots; }
} 
else {
    if (currentPlayer === 'blue') { score.blue1 += 1; }
    else { score.red1 += 1; }
    updatescore();
}

 cell.setAttribute('celldots',dots);
    cell.setAttribute('cellowner',currentPlayer);
    if(dots>=capacity){
        explode(index,currentPlayer);}

    if(totalmove>=2){ 
    checkWinner();}
    currentPlayer=(currentPlayer==='blue'?'red':'blue');
    
    
}
 function renderDots(cell,count,colour){
    cell.innerHTML="";
    for( let i=0;i<count;i++){
        let dot=document.createElement('div');
            dot.classList.add('dot');
            dot.classList.add(colour+'dot');
            cell.appendChild(dot);
      
        
    }
 }

function getCapacity(index){
    let row=Math.floor(index/6);
    let col=index%6;
    if((row==0||row==11 )&&(col==0 || col==5) )
        return 2;
    if(row==0||row==11 ||col==0 || col==5)
        return 3;
    else
        return 4;
}
let blue2=0,red2=0;
function explode(index, colour) {
    let cell = document.getElementById(`cell-${index}`);
    let capacity = getCapacity(index);
    
    cell.setAttribute('celldots', '0');
    cell.setAttribute('cellowner', 'none');
    cell.innerHTML = "";

    let neighbors = getNeighbors(index);

    for (let i = 0; i < neighbors.length; i++) {
        let nIndex = neighbors[i];
        let nCell = document.getElementById(`cell-${nIndex}`);
        let nDots = parseInt(nCell.getAttribute('celldots')) + 1;
        let nOwner=nCell.getAttribute('cellowner');
    

        if (nOwner !== 'none' && nOwner !== colour) {
              if (colour === 'blue') {
                   score.blue1 +=1; 
    }   
              else {
                   score.red1 += 1;
    }
    updatescore();
}
    
       /* document.getElementById('blueS').innerHTML = blue1+blue2;
        document.getElementById('redS').innerHTML = red1+red2;*/
        nCell.setAttribute('celldots', nDots);
        nCell.setAttribute('cellowner', colour);
        renderDots(nCell, nDots, colour);

        
        let nCapacity = getCapacity(nIndex);
        if (nDots >= nCapacity) {
            
            setTimeout(function() {
                explode(nIndex, colour);
            }, 100);
        }
    }
}
function getNeighbors(index) {
    let neighbors = [];
    let row = Math.floor(index / 6);
    let col = index % 6;

    if (row > 0) neighbors.push(index - 6);    
    if (row < 11) neighbors.push(index + 6);   
    if (col > 0) neighbors.push(index - 1);    
    if (col < 5) neighbors.push(index + 1);    
    return neighbors;
}
let totaltime=180;
let turntime=15;
let gameMachine;
function startTimer() {
    clearInterval(gameMachine);
    
    gameMachine = setInterval(function() {
        totaltime = totaltime - 1;
        document.getElementById('totaltimer').innerHTML = "Total Time Left: " + totaltime + "s";

        turntime = turntime - 1;
        document.getElementById('individualtimer').innerHTML = "Turn Time: " + turntime + "s";

        if (totaltime <= 0) {
            gameOver("TIME OVER! Game ended after 3 minutes.");
        }
        
        if (turntime <= 0) {
            let loser = currentPlayer;
            let winner = (currentPlayer === 'blue') ? 'Red' : 'Blue';
            gameOver(loser + " took too long! " + winner + " wins!");
        }
    }, 1000);
}
function gameOver(text){
    clearInterval(gameMachine);
    alert(text);
    //document.getElementsById('gamegrid').style.pointer.events='none';
}

function checkWinner() {
    let blueCount = 0;
    let redCount = 0;
    for (let i = 0; i < 72; i++) {
        let cellOwner = document.getElementById('cell-' + i).getAttribute('cellowner');
        if (cellOwner === 'blue') {
            blueCount++;
        } else if (cellOwner === 'red') {
            redCount++;
        }
    }

    if (blueCount > 0 && redCount === 0) {
        gameOver("BLUE WINS! Board captured.");
    } else if (redCount > 0 && blueCount === 0) {
        gameOver("RED WINS! Board captured.");
    }
} 
function updatescore(){
    document.getElementById('blueS').innerHTML=score.blue1;
    document.getElementById('redS').innerHTML=score.red1;
}
           
           

//THIS IS THE END!!
//fahhhhhhhhhhhhh
//better luck next time
