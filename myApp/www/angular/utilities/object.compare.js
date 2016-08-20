
module.exports = {
  compareAndMerge: function (merger, base){
    for(var key in merger){
      for (var i = 0; i < merger[key].length; i++){
        // if the base object does not contain the merge, and the merge is not deleted, add the merge
        if (!base[key].filter(function (obj) { return obj.id == merger[key][i].id}).length /*&& !merger[key][i].deleted*/){
          base[key].push(merger[key][i])
          continue
        }
        for (var j = 0; j < base[key].length; j++){
          if (base[key][j].name == merger[key][i].name && merger[key][i].id == base[key][j].id /*&& !merger[key][i].deleted*/){
            // if the merging object was updated more frequently, overwrite it in the base
            if (merger[key][i].lastUpdated > base[key][j].lastUpdated){
              base[key][j] = merger[key][i]
            }
          }
        }
      }
    }
    return base
  },
  compareAndDelete: function (merger, base){
    for (var key in merger){
      for (var i = 0; i < merger[key].length; i++){
        for (var j = 0; j < base[key].length; j++){
          if (merger[key][i].deleted && base[key][j].name == merger[key][i].name && merger[key][i].id == base[key][j].id && merger[key][i].lastUpdated > base[key][j].lastUpdated){
            base[key].splice(j, 1)
          }
        }
      }
    }
    return base
  },
  compareAndUpdate: function (merger, baser){
    return this.compareAndDelete(merger, this.compareAndMerge(merger, base))
  }
}

