const numberInput = document.getElementById('number-input');
const exponentInput = document.getElementById('exponent-input');
const mantissaInput = document.getElementById('mantissa-input');
const bitDOM = document.getElementById('bit-dom')
const resultDOM = {
    sign:document.getElementById('sign-result-dom'),
    exponent: document.getElementById('exponent-result-dom'),
    mantissa:document.getElementById('mantissa-result-dom')
}
const inputs = [numberInput,exponentInput,mantissaInput];
var floatingResult;
var bitCount = 0;

Update();

inputs.forEach(input=>{
    input.addEventListener('keydown',()=>{
        Update();
    });
    input.addEventListener('keyup',()=>{
        Update();
    });
    input.addEventListener('change',()=>{
        Update();
    });
})

//functions
function findFloatingPoint(number, EXPONENT_BITS, MANTISSA_BITS){
    const NON_SIGN_BITS = EXPONENT_BITS + MANTISSA_BITS;

    const sign = Math.sign(number) === -1 ? 1 : 0;

    let exponent = Math.floor(Math.log(Math.abs(number))/Math.log(2));
    const start = 2**exponent;
    const end = 2**(exponent+1);
    exponent = (exponent + binarySum(EXPONENT_BITS-2))  //& binarySum(EXPONENT_BITS-1); 

    const percentage = (Math.abs(number)-start)/(end-start);
    const mantissa = Math.round((2**MANTISSA_BITS)*percentage);
    let floating = sign<<NON_SIGN_BITS | exponent<<MANTISSA_BITS | mantissa;
    
    function binarySum(exponent){
        let sum = 0;
        for (let i = 0; i <= exponent; i++){
            sum+=2**i;
        }
        return sum;
    }
   
    if(sign === 0)
    {
        floating = '0' + floating.toString(2);
        console.log(floating + "SIGN POSITIVE")
    }
    
    if(exponent-binarySum(EXPONENT_BITS-2) < 0)
    {
        floating = '0' + floating.toString(2);
        console.log(floating + "NEGATIVE EXPONENT")
    }

    if(number === 0)
    {
        for (let i = 0; i < MANTISSA_BITS+EXPONENT_BITS; i++) {
            floating = floating.toString(2) + '0';
        };
        console.log(floating + "NUMBER IS ZERO")
    }    

    return floating.toString(2);
}

function Update(){ 
    bitCount = 0;
    let isReady = (exponentInput.value != 0 && mantissaInput.value != 0)
    let floating = findFloatingPoint(parseFloat(numberInput.value),parseInt(exponentInput.value),parseInt(mantissaInput.value))
    let sign;

    if(isReady)
    {
        if(numberInput.value === ''){
            numberInput.value = 0;
            floating = findFloatingPoint(parseFloat(numberInput.value),parseInt(exponentInput.value),parseInt(mantissaInput.value))
        }
        if(Math.sign(numberInput.value) === 1){
            resultDOM.sign.innerHTML = '0'
            sign = 0;
        }
        else{
            resultDOM.sign.innerHTML = floating[0]
            sign = 1;
        }
        resultDOM.exponent.innerHTML = floating.slice(1,parseInt(exponentInput.value)+1)//floating.slice(0+sign,exponentInput+sign);
        resultDOM.mantissa.innerHTML = floating.slice(parseInt(exponentInput.value)+1);
    }
    else{
        resultDOM.sign.innerHTML = "";
        resultDOM.exponent.innerHTML = "";
        resultDOM.mantissa.innerHTML = "";
    }
    if(numberInput.value != 0){bitCount+=1;}
    if(exponentInput.value != 0){bitCount+=parseInt(exponentInput.value);}
    if(mantissaInput.value != 0){bitCount+=parseInt(mantissaInput.value);}

    bitDOM.innerHTML = bitCount;
}
