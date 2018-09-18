//const init=()=>document.querySelector("#result").innerText = 0;
  //window.addEventListener("load",()=>document.querySelector("#result").innerText = 0);
  window.addEventListener("DOMContentLoaded",init);
  function init(){
    document.querySelector("#result").innerText = 0;
    bindEvents();
  }

  function bindEvents(){
    var buttons = document.querySelectorAll("button");
    for(let button of buttons){
      button.addEventListener("click",doOperation);
    }
  }


  function doOperation(){
    var operationName = this.getAttribute("data-opr") ;
    var operator=this.getAttribute("data-sign");
    var sum  = 0;
 var firstNumber = document.querySelector("#firstnumber").value;
  var secondNumber = document.querySelector("#secondnumber").value;
  sum  = docalc(firstNumber,secondNumber,operator);
  //  sum = calcOperations[operationName](firstNumber,secondNumber);
  //   if(operationName=='+'){
//     sum = calcOperations.add(firstNumber, secondNumber);
//   }
//   else
//   if(operationName=='-'){
//     sum = calcOperations.sub(firstNumber, secondNumber);
//   }
  document.querySelector("#result").innerText = sum;
  }