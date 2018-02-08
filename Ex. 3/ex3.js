// Written by Joseph Brown 1603488 for CE212 Assignment 1

typeEnum = {
	NUMBER : 0,
	OPERATOR : 1,
	DECIMAL : 2,
	CLEAR : 3,
	EQUALS : 4
}
stateEnum = {
	INT1 : 0,
	INT2 : 1
}

var state = stateEnum.INT1;
var currentDisplay = "";
var int1 = "";
var int2 = "";
var operator = "";
var displayOverwrite = false;

function getType(inputValue) {
	if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(inputValue) != -1) {
		return typeEnum.NUMBER;
	} else if (["+", "-", "*", "/"].indexOf(inputValue) != -1) {
		return typeEnum.OPERATOR;
	} else if (inputValue == ".") {
		return typeEnum.DECIMAL;
	} else if (inputValue == "clear") {
		return typeEnum.CLEAR;
	} else if (inputValue == "=") {
		return typeEnum.EQUALS;
	} else {
		return -1;
	}
}

function displayWrite(number, append) {
	var textbox = document.getElementById("outBox");
	if (currentDisplay == "0" && number != ".") displayOverwrite = true;
	if (number == "." && currentDisplay.indexOf(".") != -1) {
		displayOverwrite = false;
		return currentDisplay;
	}
	if (append && !displayOverwrite) {
		if (currentDisplay.length < 8) {
			currentDisplay += number;
		}
	} else {
		if (String(number).length > 8) {
			currentDisplay = String(number).substring(0, 7) + "&#x2026";
		} else {
			currentDisplay = number;
		}
	}
	textbox.innerHTML = currentDisplay;
	displayOverwrite = false;
	return currentDisplay;
}

function calculatorClear() {
	int1 = "";
	int2 = "";
	operator = "";
	displayWrite("0");
	state = stateEnum.INT1;
}

function calculateOutput() {
	var out = eval("Number(" + int1 + ")" + operator + "Number(" + int2 + ")");
	displayWrite(out);	
	return out;
}

function nextState(inputValue) {
	var inputType = getType(inputValue);
	if (state == stateEnum.INT1) {
		if (inputType == typeEnum.NUMBER) {
			int1 = displayWrite(inputValue, true);
		} else if (inputType == typeEnum.OPERATOR) {
			operator = inputValue;
			state = stateEnum.INT2;
			displayOverwrite = true;
		} else if (inputType == typeEnum.DECIMAL) {
			int1 = displayWrite(".", true);
		} else if (inputType == typeEnum.CLEAR) {
			calculatorClear();
		}
	} else if (state == stateEnum.INT2) {
		if (inputType == typeEnum.NUMBER) {
			int2 = displayWrite(inputValue, true);
		} else if (inputType == typeEnum.OPERATOR) {
			int1 = calculateOutput();
			operator = inputValue;
			displayOverwrite = true;
		} else if (inputType == typeEnum.DECIMAL) {
			int1 = displayWrite(".", true);
		} else if (inputType == typeEnum.CLEAR) {
			if (int2 != "") {
				displayWrite("0");
				int2 = "";
			} else {
				calculatorClear();
			}
		} else if (inputType == typeEnum.EQUALS) {
			int1 = calculateOutput();
			state = stateEnum.INT1;
			operator = "";
			displayOverwrite = true;
		}
	}
	console.log(int1 + " " + int2);
}

















