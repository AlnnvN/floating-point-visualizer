
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
    console.log(floating.toString(2));

    function binarySum(exponent){
        let sum = 0;
        for (let i = 0; i <= exponent; i++){
            sum+=2**i;
        }
        return sum;
    }
}
