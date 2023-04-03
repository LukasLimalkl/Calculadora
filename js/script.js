// display
const  previousOperationText = document.querySelector('.display-superior');
const  currentOperationText = document.querySelector('.display-inferior');
// buttons
const buttons = document.querySelectorAll('.buttons-conteiner button');

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
      }

    // add digit to calculator screen

    addDigit(digit) {
        
        // Check if number already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
          return;
        }
    
        this.currentOperation = digit;
        this.updateScreen();
      }
    // process all cacl operations

    processOperation(operation) {
        // Check if current value is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
          // Change operation
          if (this.previousOperationText.innerText !== "") {
            this.changeOperation(operation);
          }
          return;
        }
    

    // get values

    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    
    switch (operation) {
        case "+":
          operationValue = previous + current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
        case "-":
          operationValue = previous - current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
        case "*":
          operationValue = previous * current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
        case "/":
          operationValue = previous / current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
        case "DEL":
          this.processDelOperator();
          break;
        case "CE":
          this.processClearCurrentOperator();
          break;
        case "C":
          this.processClearOperator();
          break;
        case "=":
          this.processEqualOperator();
          break;
        default:
          return;
      }
    }

    // changeValues
    updateScreen(
        operationValue = null,
        operation = null,
        current = null, 
        previous = null
    ) {
        if(operationValue === null){
            // append number to current vlaue
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if(previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }

    }

    changeOperation(operation){
        const mathOperations = ["*","-","+","/"];

        if(!mathOperations.includes(operation)){
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // dell digit

    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0 , -1);
    }

    processClearCurrentOperator(){
        this.currentOperationText.innerText = "";
    }

    processClearOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    
    }

    processEqualOperator(){
        let operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) =>{
        btn.addEventListener("click", (e) =>{
            const value = e.target.innerText;


            if(+value >= 0 || value === "."){
                calc.addDigit(value);
            }else{
                calc.processOperation(value);
            }
        });
});