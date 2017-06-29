
// js new的创建

function Person(name) {
  this.name = name
}

Person.prototype.getName = function() {
  return this.name
}

var person = new Person('ncare')


// new 的实现

var objectFactory = function() {

  var obj = new Object()

  Constructor = [].shift.call(arguments) // shift 数组中删除第一个元素，并返回
  console.log(Constructor)
  obj.__proto__ = Constructor.prototype

  var res = Constructor.apply(obj, arguments)

  return typeof res === 'object' ? res : obj
}

var person1 = objectFactory(Person, 'ncare')




// 某些解释器提供__proto__隐藏属性，即某个对象的__proto__属性默认会指向
// 它的构造器的原型

var obj = new Object()
console.log(obj.__proto__ === Object.prototype)


// javascript每个对象都是Object.prototype克隆而来的，但是对象的构造器
// 并不仅限于它

var obj = {name: 'ncare'}
var Func = function() {}

Func.prototype = obj

var func = new Func()
func.name               // ncare

// 遍历func所有属性，未找到name 属性
// 查找name 属性被委托给func构造器的原型，而func.__proto__ = Func.prototype
// 而Func.prototype = obj, 因此

var A = function() {}
A.prototype = {name: 'ncare'}

var B = function() {}
B.prototype = new A()

var b = new B()
console.log(b.name)      // ncare


// 遍历b所有属性，未找到name属性
// 委托给b的构造器原型，而b.__proto__ = B.prototype, B.prototype由new A()创建出来对象
// 在A()中依然未找到name属性，然后委托给A的prototype

// 假设在A.prototype 仍然没有找到该属性，则会传递到Object.prototype, 显然Object.prototype
// 没有改属性，而Object.prototype的原型为null, 因此到这里传递结束，返回undefined