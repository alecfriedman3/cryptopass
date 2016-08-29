function fillTheDOM ($tree, classes, value){
  classes.forEach(function (name){
    var check = new RegExp(name.toLowerCase());
    $.each($tree, function (index, element){
      var elemName = element.getAttribute('name') ? element.getAttribute('name') : ''
      // var elemId = element.id ? element.id : ''
      if (!$(element).is(':submit') && $(element).is('input') && element.id.toLowerCase().split(' ').join('').match(check) || element.className.toLowerCase().split(' ').join('').match(check) || elemName.match(check) || (isValidType(name) && $(element).is(':' + name))){
        $(element).val(value)
      }
    })
  })
}

function walkTheDomAndSubmit (category, classes, siteName){
  classes.forEach(function (name){
    var check = new RegExp(name.toLowerCase());
    // $('[class*='+ name +']').trigger('click')
    $(category + '[type="submit"]').each(function (ind, elem){
      var elemName = elem.getAttribute('name') ? elem.getAttribute('name') : ''
      var elemVal = elem.getAttribute('value') ? elem.getAttribute('value') : ''
      if (/*($(elem).is('input') || $(elem).is('button')) && */elem.id.toLowerCase().split(' ').join('').match(check) || elem.className.toLowerCase().split(' ').join('').match(check) || elemName.match(check) || elemVal.match(check)){
        $(elem).trigger('click')
      }
    })
  })
}

function isValidType(name){
  if (name == 'text' || name == 'password' ) return true
  return false
}
module.exports = { fillTheDOM: fillTheDOM, walkTheDomAndSubmit: walkTheDomAndSubmit}
