function calculateDistances() {
	var t = document.getElementById("outputTable");
	if (t != null) t.remove();
	var re = /^\d*$/;
	if (document.getElementById("startDistance").value.search(re) || document.getElementById("endDistance").value.search(re)) {
		alert("Inputs must be integers.");
		return;
	}
	var opt = document.getElementById("calcSelect");
	var startDistance = Number(document.getElementById("startDistance").value);
	var endDistance = Number(document.getElementById("endDistance").value);
	if (endDistance == "") endDistance = 0;
	if (startDistance > endDistance) {
		var temp = startDistance;
		startDistance = endDistance;
		endDistance = temp;
	}
	var table = document.createElement("table");
	table.id = "outputTable";
	table.setAttribute("cellspacing", "0");
	var tableTitle = table.insertRow(0);
	tableTitle.className = "title";
	tableTitle.insertCell(0).innerHTML = "Miles";
	tableTitle.insertCell(1).innerHTML = "Kilometres";
	var isEven = false;
	for (i = startDistance; i <= endDistance; i++) {
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
