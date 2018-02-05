inputTypeEnum = {
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
	if (state == stateEnum.STATE_INT1 && getType(inputValue) == inputTypeEnum.TYPE_NUMBER) {
		int1 = displayWrite(inputValue, true);
	} else if (state == stateEnum.STATE_INT1 && getType(inputValue) == inputTypeEnum.TYPE_DECIMAL) {
		if (int1.indexOf(".") == -1) {
			int1 = displayWrite(".", true);
		}
	} else if (state == stateEnum.STATE_INT1 && getType(inputValue) == inputTypeEnum.TYPE_CLEAR) {
		int1 = "";
		displayWrite("0");
	} else if (state == stateEnum.STATE_INT1 && getType(inputValue) == inputTypeEnum.TYPE_OPERATOR) {
		operator = inputValue;
		state = stateEnum.STATE_INT2;
		displayOverwrite = true;
	} else if (state == stateEnum.STATE_INT2 && getType(inputValue) == inputTypeEnum.TYPE_NUMBER) {
		int2 = displayWrite(inputValue, true);
	} else if (state == stateEnum.STATE_INT2 && getType(inputValue) == inputTypeEnum.TYPE_DECIMAL) {
		if (int2.indexOf(".") == -1) {
			int2 = displayWrite(".", true);
		}
	} else if (state == stateEnum.STATE_INT2 && getType(inputValue) == inputTypeEnum.TYPE_EQUALS) {
		state = stateEnum.STATE_OUTPUT;
		int1 = displayWrite(eval("Number(" + int1 + ")" + operator + "Number(" + int2 + ")"));
		displayOverwrite = true;
	} else if (state == stateEnum.STATE_INT2 && getType(inputValue) == inputTypeEnum.TYPE_OPERATOR) {
		int1 = displayWrite(eval("Number(" + int1 + ")" + operator + "Number(" + int2 + ")"));
		displayOverwrite = true;
		operator = inputValue;
	} else if (state == stateEnum.STATE_INT2 && getType(inputValue) == inputTypeEnum.TYPE_CLEAR) {
		if (int2 == "") {
			state = stateEnum.STATE_INT1;
			int1 = "";
			operator = "";
		}
		int2 = "";
		displayWrite("0");
	} else if (state == stateEnum.STATE_OUTPUT && getType(inputValue) == inputTypeEnum.TYPE_NUMBER) {
		state = stateEnum.STATE_INT1;
		int1 = displayWrite(inputValue);
	}
}