var isEven = false;

function calculateDistances() {
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
	var table = document.getElementById("outputTable");
	for (i = startDistance; i <= endDistance; i++) {
		if (opt.value == 0) {
			var out = i * 1.6093;
			var newRow = table.insertRow(-1);
			if (!isEven) newRow.className = "odd";
			var miles = newRow.insertCell(0);
			var kilometres = newRow.insertCell(1);
			if (i == endDistance) {
				miles.className = "bottom";
				kilometres.className = "bottom";
			}
			miles.innerHTML = i;
			kilometres.innerHTML = out.toFixed(2);
			isEven = !isEven;
		} else {
			var out = i / 1.6093;
			var newRow = table.insertRow(-1);
			if (!isEven) newRow.className = "odd";
			var miles = newRow.insertCell(0);
			var kilometres = newRow.insertCell(1);
			if (i == endDistance) {
				miles.className = "bottom";
				kilometres.className = "bottom";
			}
			kilometres.innerHTML = i;
			miles.innerHTML = out.toFixed(2);
			isEven = !isEven;
		}
	}
}
