module.exports = function nameFormat (name) {
  if (name.toLowerCase() === "home") return "Home"
  name = name[0].toLowerCase()+name.substring(1)
  var re = /[A-Z]/g
  var capitalsArr = name.match(re);
  var wordsArr = name.split(re);
  for (var i = 1; i < wordsArr.length; i ++) {
    wordsArr[i] = capitalsArr[i-1]+wordsArr[i]
  }
  var title = wordsArr.join(" ")
  title = title[0].toUpperCase()+title.substring(1)
  if (title[title.length-1] === "y") {
    title = title.slice(0, -1)+"ies"
  } else if (name[name.length-1] !== "s"){
    title += "s"
  }
  return title
}
