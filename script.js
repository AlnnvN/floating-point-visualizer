const numberInput = document.getElementById('number-input');
const exponentInput = document.getElementById('exponent-input');
const mantissaInput = document.getElementById('mantissa-input');
const bitDOM = document.getElementById('bit-dom')

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
})



//functions
function findFloatingPoint(number, EXPONENT_BITS, MANTISSA_BITS){
    const NON_SIGN_BITS = EXPONENT_BITS + MANTISSA_BITS;

    const sign = Math.sign(number) === -1 ? 1 : 0;

    let exponent = Math.floor(Math.log(Math.abs(number))/Math.log(2));
    const start = 2**exponent;
    const end = 2**(exponent+1);
    exponent = (exponent + binarySum(EXPONENT_BITS-2)) & binarySum(EXPONENT_BITS-1); 
   
    const percentage = (Math.abs(number)-start)/(end-start);
    const mantissa = Math.round((2**MANTISSA_BITS)*percentage);

    const floating = sign<<NON_SIGN_BITS | exponent<<MANTISSA_BITS | mantissa;
    
    function binarySum(exponent){
        let sum = 0;
        for (let i = 0; i <= exponent; i++){
            sum+=2**i;
        }
        return sum;
    }
    console.log(floating.toString(2));
    return floating.toString(2);
}

function Update(){ 
    bitCount = 0;
   
    let floating = findFloatingPoint(parseFloat(numberInput.value),parseInt(exponentInput.value),parseInt(mantissaInput.value))
    let sign;

    if(Math.sign(numberInput.value) === 1){
        document.getElementById('sign-result-dom').innerHTML = '0'
        sign = 0;
    }
    else{
        document.getElementById('sign-result-dom').innerHTML = floating[0]
        sign = 1;
    }

    document.getElementById('expo').innerHTML = floating.slice(0+sign,parseInt(exponentInput.value)+sign)//floating.slice(0+sign,exponentInput+sign);
    document.getElementById('mant').innerHTML = floating.slice(parseInt(exponentInput.value)+sign);

    if(numberInput.value != 0){bitCount+=1;}
    if(exponentInput.value != 0){bitCount+=parseInt(exponentInput.value);}
    if(mantissaInput.value != 0){bitCount+=parseInt(mantissaInput.value);}

    bitDOM.innerHTML = bitCount;
}
