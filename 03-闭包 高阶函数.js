
// 闭包

// 变量声明为加入var, 则变量会转为全局变量
// 变量生存周期，全局变量是永久的
// var 声明局部变量，函数退出时候，就会被销毁
// 但是

function A() {

  var a = 1
  return function() {
    a++
    console.log(a)
  }
}

var f = A()

f()
f()
f()


// 这就形成了闭包结构, a的值得以保持

/*
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
*/

for(var i=0; i<nodes.length; i++) {
  (function(i){
    nodes[i].onclick = function() {
      console.log(i)
    }
  })(i)
}

// 让i的值能够得到保持


// 数据缓存
var mult = (function() {
  
  var cache = {}
  return function() {
    
    var args = Array.prototype.join.call(arguments, ',')
    if(args in cache) {
      return cache[args]
    }
    var a = 1
    for(var i=0; i<arguments.length; i++) {
      a = a * arguments[i]
    }
    return cache[args] = a
  }
})()

console.log(mult(1, 2, 3))
console.log(mult(1, 2, 3, 4))
console.log(mult(1, 2, 3))


// 提炼函数
var mult = (function() {
  
  var cache = {}

  var calculate = function() {
    var a = 1;
    for(var i=0; i<arguments.length; i++) {
      a = a * arguments[i]
    }
    return a
  }

  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if(args in cache) {
      return cache[args]
    }

    return cache[args] = calculate.apply(null, arguments)
  }
})()

console.log(mult(1, 2, 3))
console.log(mult(1, 2, 3, 4))
console.log(mult(1, 2, 3))


// 延续局部变量的寿命
// 实现命令模式


// 高阶函数
// 函数可以作为参数传递

var appendDiv = function(callback) {
  for(var i=0; i<20; i++) {
    var div = document.createElement('div')
    div.innerHTML = i
    document.body.appendChild(div)
    if(typeof callback === 'function') {
      callback(div)
    }
  }
}

appendDiv(function(node) {
  node.style.display = 'none';
})


// 函数可以作为返回值

var isType = function(type) {
  
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }
}

var isArray = isType('Array')

console.log(isArray([1, 2, 3]))


// 单例模式

// 面向切面编程AOP
// 把一个函数 动态织入 另一函数中
// 装饰器
Function.prototype.before = function(beforefn) {
  
  var _self = this
  return function() {
    
    beforefn.apply(this, arguments)
    return _self.apply(this, arguments)
  }
}

Function.prototype.after = function(afterfn) {

  var _self = this
  return function() {
    
    var res = _self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return res
  }
}

var func =  function() {
  console.log('2')
}

func = func.before(function() {
  console.log('1')
}).after(function() {
  console.log('3')
})

func()


// 函数柯里化
// 生成器

var cost = (function() {
  
  var args = []
  return function() {

    if(arguments.length === 0) {
      var money = 0
      for(var i=0; i<args.length; i++) {
        money += args[i]
      }
      return money
    } else {
      [].push.apply(args, arguments)
    }
  }
})()

cost(100)
cost(200)

console.log(cost())


// 柯里化
var currying = function(fn) {

  var args = []

  return function() {
    if(arguments.length === 0) {
      return fn.apply(this, args)
    }else {
      [].push.apply(args, arguments)
      return arguments.callee
    }
  }
}

var cost = (function() {

  var money = 0
  return function() {
    for(var i=0; i<arguments.length; i++) {
      money += arguments[i]
    }
    return money
  }
})()

var cost = currying(cost)

cost(100)
cost(100)

console.log(cost())


// 函数节流