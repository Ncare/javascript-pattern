
// this 的指向

// 1. 作为对象的方法调用 ??  感觉作者表述准确 ===> 指向当前对象

var obj = {
  a: 1,
  getA: function() {
    alert(this === obj)  // true
    alert(this.a)        // 1
  }
}
obj.getA()


// 2, 作为普通函数调用 ?? 感觉作者表述准确 ===> 指向全局对象, 如window

name = 'ncare'  // 没加var

var getName = function() {
  return this.name
}

console.log(getName())

// callback 中的this会指向window

name = 'ncare';

var myObject = { 
  name: 'sven',    
  getName: function(){        
    return this.name;    
  }
};

var getName = myObject.getName;

console.log(myObject.getName())    // sven
console.log(getName());            // ncare

// 在strict模式下，函数的this不再指向window了。



// 3.构造器的调用

var A = function() {
  this.name = 'ncare'
}

var a = new A()
a.name           //  ncare, 返回this

// 假设

var B = function() {
  this.name = 'ncare'
  return {
    name: 'xmm'
  }
}

var b = new B()
console.log(b.name)  // xmm, 这里返回的就不是this

// 假设

var C = function() {
  this.name = 'ncare'
  return 'xmm'
}

var c = new C()
console.log(c.name)  // ncare, 返回this



// 4.call, apply
// call, apply 会动态改变this的指向
var obj = {
  name: 'ncare',
  getName: function() {
    return this.name
  }
}

var obj1 = {
  name: 'sven'
}

console.log(obj.getName())
console.log(obj.getName.call(obj1))



// this丢失 ?? 最常发生



// call apply ?? 
// 1. 改变this的指向

name = '111'
var obj1 = {
  name: '222'
}
var obj2 = {
  name: '333'
}

var getName = function() {
  return this.name
}

console.log(getName())
console.log(getName.call(obj1))
console.log(getName.call(obj2))


// 3. 借用其他对象方法

var A = function(name) {
  this.name = name
}

var B = function() {
  A.apply(this, arguments)
}

B.prototype.getName = function() {
  return this.name
}

var b = new B('ncare')
console.log(b.getName())

// 参数列表arguments 是一个类数组对象，但是它不能像数组一样，进行添加之类的操作
// 但是可以借用Array.prototype进行操作

(function(){
  Array.prototype.push.call(arguments, 3)
  console.log(arguments)
})(1, 2)