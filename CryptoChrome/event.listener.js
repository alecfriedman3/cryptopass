function EventListener () {}

EventListener.prototype.on = function (eventName, cb) {
  this[eventName] = this[eventName] ? this[eventName] : []
  this[eventName].push(cb)
}

EventListener.prototype.emit = function (eventName, data) {
  this[eventName].forEach(function (cb) {
    cb(data);
  })
}

module.exports = EventListener;
