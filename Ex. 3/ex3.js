typeEnum = {
	TYPE_NUMBER : 0,
	TYPE_OPERATOR : 1,
	TYPE_DECIMAL : 2,
	TYPE_CLEAR : 3,
	TYPE_EQUALS : 4
}
stateEnum = {
	STATE_INT1 : 0,
	STATE_INT2 : 1,
	STATE_OUTPUT : 2
}

var state = stateEnum.STATE_INT1;
var currentDisplay = "";
var int1 = "";
var int2 = "";
var operator = "";
var displayOverwrite = false;

function getType(inputValue) {
	var outVal;
	if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(inputValue) != -1) {
		outVal = inputTypeEnum.TYPE_NUMBER;
	} else if (["+", "-", "*", "/"].indexOf(inputValue) != -1) {
		outVal = inputTypeEnum.TYPE_OPERATOR;
	} else if (inputValue == ".") {
		outVal = inputTypeEnum.TYPE_DECIMAL;
	} else if (inputValue == "clear") {
		outVal = inputTypeEnum.TYPE_CLEAR;
	} else if (inputValue == "=") {
		outVal = inputTypeEnum.TYPE_EQUALS;
	}
	return outVal;
}

function displayWrite(number, append) {
	var textbox = document.getElementById("outBox");
	if (currentDisplay == "0" && number != ".") currentDisplay = "";
	if (append && !displayOverwrite) {
		if (currentDisplay.length < 8) {
			currentDisplay += number;
		}
	} else {
		if (number.length > 8) {
			currentDisplay = number.substring(0, 7) + "&#x2026";
		} else {
			currentDisplay = number;
		}
	}
	textbox.innerHTML = currentDisplay;
	displayOverwrite = false;
	return currentDisplay;
}

function nextState(inputValue) {

}