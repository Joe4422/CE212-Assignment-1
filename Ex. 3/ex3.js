function createWordList(location) {
  var wordList = [];
  var textFile = new XMLHttpRequest();
  var re = /<.*?>/
  console.log("init done");
  textFile.onreadystatechange = function() {
    if (textFile.readyState == 4) {
      var textOut = textFile.responseText;
      textOut = textOut.replace(/<.*?>/g, "");
      textOut = textOut.replace(/\s+/g, " ");
      textOut = textOut.trim(/\s+/g);
      var textOutArray = textOut.split(/\s+/);
    }
  }
  textFile.open("GET", location);
  textFile.send();
  console.log("opened text");
  return wordList;
}

function countWords(wordList) {
  
}
