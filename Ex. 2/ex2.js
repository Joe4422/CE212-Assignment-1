function generateTable() {
  var sections =  [
                    {name:"Dynamic Table", maxMark:20},
                    {name:"Intellij Usage", maxMark:10},
                    {name:"Calendar Control", maxMark:30},
                    {name:"Active Form", maxMark:20},
                    {name:"Object Database", maxMark:20}
                  ];
  table = document.getElementById("markTable");
  for (i = 0; i < sections.length; i++) {
    var newRow = table.insertRow(-1);
    var section = newRow.insertCell(0);
    section.innerHTML = sections[i].name;
    var max = newRow.insertCell(1);
    max.innerHTML = sections[i].maxMark;
    var comments = newRow.insertCell(2);
    var commentsBox = document.createElement("textarea");
    commentsBox.placeholder = "Enter Comments";
    commentsBox.className = "commentsBox";
    commentsBox.setAttribute("rows", "5");
    commentsBox.setAttribute("cols", "50");
    comments.appendChild(commentsBox);
    var mark = newRow.insertCell(3);
    var markSelect = document.createElement("select");
    markSelect.setAttribute("onchange", "updateMark()");
    markSelect.className = "markSelector";
    for (j = 0; j <= sections[i].maxMark; j++) {
      var opt = document.createElement("option");
      opt.value = j;
      opt.innerHTML = j;
      markSelect.appendChild(opt);
    }
    mark.appendChild(markSelect);
  }
}

function updateMark() {
  var markSelectors = document.getElementsByClassName("markSelector");
  var totalMark = 0;
  for (i = 0; i < markSelectors.length; i++) {
    totalMark += Number(markSelectors[i].value);
  }
  document.getElementById("mark").innerHTML = "<b>Total mark:</b> " + totalMark;
}
