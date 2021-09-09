let buffer = 0;
let operation = null;
let shouldClear = false;

const buttons = document.querySelector(".calc");
const display = document.querySelector(".calc-display");

function applyOperation(ls, rs, op) {
  console.log(`calculating ${ls} ${op} ${rs}`);
  switch (op) {
    case "-":
      return ls - rs;
    case "+":
      return ls + rs;
    case "÷":
      return (ls / rs).toFixed(2);
    case "x":
      return ls * rs;
  }
}

function handleClick(e) {
  let newText = "";

  if (display.innerText != "0") newText = display.innerText;

  switch (e.target.innerText) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (shouldClear) {
        shouldClear = false;
        newText = "";
      }
      newText = newText.concat(e.target.innerText);
      break;

    case "C":
      buffer = 0;
      newText = "0";
      break;

    case "←":
      if (display.innerText) {
        newText =
          display.innerText.length > 1 ? display.innerText.slice(0, -1) : "0";
      }
      break;

    case "-":
    case "+":
    case "÷":
    case "x":
      if (operation && buffer) {
        shouldClear = true;
        buffer = applyOperation(
          parseInt(buffer),
          parseInt(display.innerText),
          operation
        );
        newText = buffer.toString();
      } else {
        buffer = display.innerText;
        newText = "0";
      }

      operation = e.target.innerText;
      break;

    case "=":
      if (operation && buffer) {
        buffer = applyOperation(
          parseInt(buffer),
          parseInt(display.innerText),
          operation
        );
        newText = buffer.toString();
      }
      operation = null;
      break;

    default:
      break;
  }

  if (newText && newText != display.innerText) display.innerText = newText;
}

buttons.addEventListener("click", handleClick);
