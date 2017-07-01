
// 封装一系列的算法，根据条件进行调用


var InputStrategy = (function(){

  var strategy = {
    isNumber: function(value) {
      return Object.prototype.toString.call(value) === '[object Array]'
    }, 
    phone: function(value) {
      return /^1[3578]\d{9}$/.test(value)
    }
  }

  return {
    
    check: function(type, value) {
      value = value.replace(/^\s+|\s+$/g, '')
      return strategy[type] ? strategy[type](value) : '没有该类型的检测方法'
    },

    addStragegy: function(type, fn) {
      strategy[type] = fn
    }
  }
})()

InputStrategy.addStragegy('mail', function(value) {
  return /^(\W+)(@\w+)(\.\w+)+$/.test(value)
})

var isMail = InputStrategy.check('mail', 'ncare@gmail.com')
