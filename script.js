let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}


function handleSymbol(symbol){
    
    switch(symbol){
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;
        case '=': 
       
            if(previousOperator === null){
                    return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0,buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×': 
        case '÷':
            handleMath(symbol);
            break;
            
    }
   
    //buffer=symbol;
}

function handleMath(symble){
 
    if(buffer === '0'){
        return;
    }
   
    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
    //if(previousOperator === null) {   
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }

    previousOperator = symble;
    buffer = '0';
    
   
   
}

function flushOperation(intBuffer){
   
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }
    else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }
    else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }
    else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
    
}



function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}


function init(){
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })

    
}

init();
