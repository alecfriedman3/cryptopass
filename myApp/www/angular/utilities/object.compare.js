
var compare = {
  compareAndMerge: function (merger, base){
    // console.log(merger, base);
    for(var key in merger){
      if(!merger[key].length){
        for (var j = 0; j < base[key].length; j++){
          if(base[key][j].deleted && !merger[key].filter(function(obj){return obj.id === base[key][j].id}).length){
            console.log('IN THE IFFFF');
            base[key].splice(j, 1);
          }
        }
      }
      for (var i = 0; i < merger[key].length; i++){
        // if the base object does not contain the merge, and the merge is not deleted, add the merge
        if (!base[key].filter(function (obj) { return obj.id == merger[key][i].id}).length /*&& !merger[key][i].deleted*/){
          base[key].push(merger[key][i])
          continue
        }
        for (var j = 0; j < base[key].length; j++){
          if (base[key][j].name == merger[key][i].name && merger[key][i].id == base[key][j].id /*&& !merger[key][i].deleted*/){
            // if the merging object was updated more frequently, overwrite it in the base
            if (moment(merger[key][i].lastUpdated, 'MMMM Do YYYY, h:mm:ss a').isAfter(moment(base[key][j].lastUpdated, 'MMMM Do YYYY, h:mm:ss a'))){
              base[key][j] = merger[key][i]
            }
          }
          if(base[key][j].deleted && !merger[key].filter(function(obj){return obj.id === base[key][j].id}).length){
            console.log('IN THE IFFFF');
            base[key].splice(j, 1);
          }
        }
      }
    }
    // console.log('here lies the base, it\'s not acidic', base)
    return base
  },
  compareAndDelete: function (merger, base){
    for (var key in merger){
      for (var i = 0; i < merger[key].length; i++){
        for (var j = 0; j < base[key].length; j++){
          if (merger[key][i].deleted && base[key][j].name == merger[key][i].name && merger[key][i].id == base[key][j].id){
            base[key].splice(j, 1)
          }
        }
      }
    }
    return base
  },
  compareAndUpdate: function (merger, base){
    return compare.compareAndDelete(merger, compare.compareAndMerge(merger, base))
  }
}

module.exports = compare;
