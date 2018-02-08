// Written by Joseph Brown 1603488 for CE212 Assignment 1

var startDistance;
var endDistance;

function getDistances() {
	startDistance = Number(document.getElementById("startDistance").value);
	endDistance = Number(document.getElementById("endDistance").value);
	if (endDistance == "") endDistance = startDistance + 10;
	calculateDistances();
}

function updatePlaceholder() {
	document.getElementById("endDistance").setAttribute("placeholder", Number(document.getElementById("startDistance").value) + 10);
}

function calculateDistances() {
	var t = document.getElementById("outputTable");
	if (t != null) t.remove();
	var re = /^\d*$/;
	var re2 = /^\d+$/;
	if (document.getElementById("startDistance").value.search(re2) || document.getElementById("endDistance").value.search(re)) {
		alert("Inputs must be non-negative integers.");
		return;
	}
	var opt = document.getElementById("calcSelect");
	var counter = "i++";
	var arrow = "&#x25BE";
	var endCond = "i <= endDistance";
	if (startDistance > endDistance) {
		counter = "i--";
		endCond = "i >= endDistance";
		arrow = "&#x25B4";
	}
	var table = document.createElement("table");
	table.id = "outputTable";
	table.setAttribute("cellspacing", "0");
	var tableTitle = table.insertRow(0);
	tableTitle.className = "title";
	tableTitle.insertCell(0).innerHTML = "Miles";
	tableTitle.insertCell(1).innerHTML = "Kilometres";
	var arrowCell = tableTitle.insertCell(2);
	arrowCell.innerHTML = arrow;
	arrowCell.className = "arrow";
	arrowCell.setAttribute("onclick", "changeSort();");
	var isEven = false;
	for (i = startDistance; eval(endCond); eval(counter) ) {
		var newRow = table.insertRow(-1);
		if (!isEven) newRow.className = "odd";
		var miles = newRow.insertCell(0);
		var kilometres = newRow.insertCell(1);
		if (opt.value == 0) {
			var out = i * 1.6093;
			miles.innerHTML = i;
			kilometres.innerHTML = out.toFixed(2);
		} else {
			var out = i / 1.6093;
			kilometres.innerHTML = i;
			miles.innerHTML = out.toFixed(2);
		}
		isEven = !isEven;
	}
	document.body.appendChild(table);
}

function changeSort() {
	var temp = startDistance;
	startDistance = endDistance;
	endDistance = temp;
	calculateDistances();
}