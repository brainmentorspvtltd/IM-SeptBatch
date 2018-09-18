// const calcOperations = {
//   add(firstNumber, secondNumber) {
//     return parseInt(firstNumber) + parseInt(secondNumber);
//   },

//   sub(firstNumber, secondNumber) {
//     return firstNumber - secondNumber;
//   },
//    mul(firstNumber, secondNumber) {
//     return firstNumber * secondNumber;
//   },
//    div(firstNumber, secondNumber) {
//     return firstNumber / secondNumber;
//   }

// }
function docalc(firstNumber, secondNumber, operator){
  var expression = firstNumber+operator+secondNumber;
  console.log("expression is ",expression);
  return eval(expression);
}


