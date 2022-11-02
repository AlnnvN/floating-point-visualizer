const numberInput = document.getElementById('number-input');
const exponentInput = document.getElementById('exponent-input');
const mantissaInput = document.getElementById('mantissa-input');
const bitDOM = {
    number: document.getElementById('bit-num-dom'),
    text: document.getElementById('bit-text-dom')
}
const resultDOM = {
    sign:document.getElementById('sign-result-dom'),
    exponent: document.getElementById('exponent-result-dom'),
    mantissa:document.getElementById('mantissa-result-dom')
}
const inputs = [numberInput,exponentInput,mantissaInput];
var floatingResult;
var bitCount = 0;
const slider = {
    number: document.getElementById('number-slider'),
    exponent: document.getElementById('exponent-slider'),
    mantissa: document.getElementById('mantissa-slider')
}

Update();

AddEventListeners();



//FUNCTIONS

function findFloatingPoint(number, EXPONENT_BITS, MANTISSA_BITS){
    const NON_SIGN_BITS = EXPONENT_BITS + MANTISSA_BITS;

    const sign = Math.sign(number) === -1 ? 1 : 0;

    let exponent = Math.floor(Math.log(Math.abs(number))/Math.log(2));

    const start = 2**exponent;
    const end = 2**(exponent+1);

    exponent = (exponent + binarySum(EXPONENT_BITS-2))  //& binarySum(EXPONENT_BITS-1); 

    const percentage = (Math.abs(number)-start)/(end-start);
    const mantissa = Math.round((2**MANTISSA_BITS)*percentage);

    let floating = (sign << NON_SIGN_BITS | exponent << MANTISSA_BITS | mantissa).toString(2);


    //EXCEPTIONS
    if(number === 0 || number.toString() === 'NaN') //fixes number = NaN
    {
        for (let i = 1; i <= MANTISSA_BITS+EXPONENT_BITS; i++) {
            floating = floating + '0';
        };  
    }
    else{ //if there is a number assigned

        if(sign === 0) //fixes initial zero for positive numbers
        {
            floating = '0' + floating;
        }
        if(exponent-binarySum(EXPONENT_BITS-2) <= 0) //fixes initial zero for negative exponents
        {
            floating = '0' + floating;      
        }
    }

    //FUNCTIONS
    function binarySum(exponent){
        let sum = 0;
        for (let i = 0; i <= exponent; i++){
            sum+=2**i;
        }
        return sum;
    }

    return floating;
}

function Update(){ 

    //assigning input values to the slider
    slider.number.value = numberInput.value; 
    slider.exponent.value = exponentInput.value;
    slider.mantissa.value = mantissaInput.value;
    //

    let isReady = (exponentInput.value != 0 && mantissaInput.value != 0)
    CountBits();

    if(isReady)
    {
        let floating = findFloatingPoint(parseFloat(numberInput.value),parseInt(exponentInput.value),parseInt(mantissaInput.value))
        resultDOM.sign.innerHTML = floating[0] //assigns sign to the final result
        //slices the final result string in 2 different parts (exponent and mantissa)
        resultDOM.exponent.innerHTML = floating.slice(1,parseInt(exponentInput.value)+1)
        resultDOM.mantissa.innerHTML = floating.slice(parseInt(exponentInput.value)+1);
    }
    else{
        ClearResults();
    }


    //FUNCTIONS

    function CountBits(){
        let exp = parseInt(exponentInput.value)
        let man = parseInt(mantissaInput.value)

        //bit counting
        bitCount = 0;
        if(isReady){ bitCount += 1;}
        if(exp.toString() != 'NaN'){ bitCount+=exp; }
        if(man.toString() != 'NaN'){ bitCount+=man; }

        bitDOM.number.innerHTML = bitCount;  
        
        //treatment for >= 32 bit input
        if((exp+man+1) >= 32){ 
            isReady = false; 
            bitDOM.number.classList.add('text-danger');
            bitDOM.text.classList.add('text-danger');
        }else{
            bitDOM.number.classList.remove('text-danger');
            bitDOM.text.classList.remove('text-danger');
        }
    }

    function ClearResults(){
        resultDOM.sign.innerHTML = "";
        resultDOM.exponent.innerHTML = "";
        resultDOM.mantissa.innerHTML = "";
    }
}

function AddEventListeners() {
    inputs.forEach(input => {
        input.addEventListener('keydown', () => {
            Update();
        });
        input.addEventListener('keyup', () => {
            Update();
        });
        input.addEventListener('change', () => {
            Update();
        });
    });

    slider.number.addEventListener('input', () => {
        numberInput.value = slider.number.value;
        Update();
    });
    slider.exponent.addEventListener('input', () => {
        exponentInput.value = slider.exponent.value;
        Update();
    });
    slider.mantissa.addEventListener('input', () => {
        mantissaInput.value = slider.mantissa.value;
        Update();
    });
}