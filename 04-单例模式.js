
//

var Single = function(name) {
  this.name = name
  this.instance = null
}

Single.prototype.getName = function() {
  return this.name
}

Single.getInstance = function(name) {
  if(!this.instance) {
    this.instance = new Single(name)
  }
  return this.instance
}

var a = Single.getInstance('ncare')
var b = Single.getInstance('xxx')

console.log(a===b)



// 透明的单例模式
// 缓存代理建立单例模式
var createDiv = function(html) {

  this.html = html
  this.init()
}

createDiv.prototype.init = function() {
  
  var div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}

var proxySingle = (function() {

  var instance = null
  return function(html) {
    if(!instance) {
      instance = new createDiv(html)
    }

    return instance
  }
})()


var a = proxySingle('xxx')
var b = proxySingle('yyy')
console.log(a===b)


// javascript 本身就是无类语言
// 传统的这种实现方式，无疑是多此一举

// 一个全局变量 var a = {}
// 其实就是单例模式
// 但是要尽量避免使用全部变量

// 使用命名空间将变量包含起来