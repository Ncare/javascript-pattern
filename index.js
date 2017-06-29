
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