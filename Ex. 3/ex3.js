var displayNum = "0";
var val1 = "";
var val2 = "";
var operator = "";
var state = 1;

function updateDisplay() {
	document.getElementById("outBox").innerHTML = displayNum;
}
function clearDisplay() {
	displayNum = "0";
	var operators = ["+", "-", "*", "/"];
	for (i = 0; i < operators.length; i++) {
		document.getElementById(operators[i]).className = "operator";
	}
}

function numberPress(value) {
	if (state == 3) {
		clearDisplay();
	}
	if (displayNum == "0") { 
		displayNum = value; 
	} else if (displayNum.length < 8) {
		displayNum += value;
	}
	updateDisplay();
}

function dotPress() {
	if (displayNum.indexOf(".") == -1) {
		displayNum += ".";
	}
	updateDisplay();
}

function clearPress() {
	var cl = document.getElementById("clear");
	if (state == 2 && displayNum != "0") {
		val2 = "";
		displayNum = 0;
		updateDisplay();
	} else {
		val2 = "";
		val1 = "";
		operator = "";
		state = 1;
		clearDisplay();
		updateDisplay();
	}
}

function operatorPress(operator) {
	if (state == 2) {
		equalsPress();
		val1 = displayNum;
	} else {
		val1 = displayNum;
	}
	state = 2;
	clearDisplay();
	this.operator = operator;
	var btn = document.getElementById(operator);
	btn.className = "operator active";
}

function equalsPress() {
	if (state == 2) {
		val2 = displayNum;
		clearDisplay();
		eval("displayNum = Number(" + val1 + ") " + operator + " Number(" + val2 + ")");
		val1 = "";
		val2 = "";
		operator = "";
		state = 3;
		updateDisplay();
	}
}