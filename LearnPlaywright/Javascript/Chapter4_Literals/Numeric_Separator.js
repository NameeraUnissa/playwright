let million = 1_000_000; //Numeric separator
let binary = 0b1010_1010; //Numeric separator in binary literal
let octal = 0o744_744;
let hexSep = 0xFF_FF_FF; //Numeric separator in hexadecimal literal
console.log("Million:",million);
console.log("Binary:",binary);
console.log("Octal:",octal);
console.log("Hexadecimal with separator:",hexSep);

//BigInt literal
let bigInt = 1234567890123456789012345678901234567890n;
let big2= 0x1fffffffffffffn; //BigInt literal with hexadecimal notation
let bigFormNum= 1_000_000_000_000_000_000n; //BigInt literal with numeric separator
console.log("BigInt:",bigInt);
console.log("BigInt with hexadecimal notation:",big2);
console.log("BigInt with numeric separator:",bigFormNum);

//Special Numeric Values
let infinity = Infinity;
console.log("Infinity:",infinity);

let negInfinity = -Infinity;
console.log("Negative Infinity:",negInfinity);

let typeofInfinity = typeof infinity;
console.log("Type of Infinity:",typeofInfinity);

let nanValue = NaN;
console.log("NaN:",nanValue);