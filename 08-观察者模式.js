
var Observer = (function() {

  var _message = {}

  return {
    
    subsribe: function(type, fn) {
      if(!_message[type]) {
        _message[type] = []
      }

      _message[type].push(fn)
    },

    unsubscribe: function(type, fn) {
      if(!_message[type] || Object.prototype.toString.call(_message[type]) !== '[object Array]') return ;

      for(var i=_message[type].length-1; i>=0; i--) {
        _message[type][i] === fn && _message[type].splice(i, 1)
      }
    },

    publish: function(type, args) {
      if(!_message[type]) return ;

      var events = {
        type: type,
        args: args
      }
      
      for(var i=0; i<_message[type].length; i++) {
        _message[type][i].call(this, events)
      }
    }
  }
})();


Observer.subsribe('price', function(e) {
  console.log(e)
})

Observer.publish('price', {msg: '传递参数'})