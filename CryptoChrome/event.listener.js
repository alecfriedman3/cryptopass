function EventListener () {}

EventListener.prototype.on = function (eventName, cb) {
  this[eventName] = this[eventName] ? this[eventName] : []
  this[eventName].push(cb)
}

EventListener.prototype.emit = function (eventName, data) {
  console.log('listener here', this)
  if (!this[eventName]) throw new Error('event not registered')
  this[eventName].forEach(function (cb) {
    cb(data);
  })
}

module.exports = EventListener;
