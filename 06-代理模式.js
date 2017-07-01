

// 图片预加载
var myImage = (function() {
  
  var node = document.createElement("img")
  document.body.appendChild(node)

  return {
    setSrc: function(src) {
      node.src = src
    }
  }
})

var proxy = (function() {
  
  var img = new Image;
  img.onload = function() {
    myImage.setSrc(this.src)
  }

  return {
    setSrc: function() {
      myImage.setSrc('loading.png')
      img.src = src
    }
  }
})

proxy.setSrc('/image/index.png')



// 合并http请求

var synchronousFile = function(id) {
  console.log('开始同步文件，id为: '+id)
}

var proxy = (function(){

  var cache = [], timer

  return function(id) {
    cache.push(id)
    if(timer) {
      return ;
    }

    timer = setTimeout(function() {
      synchronousFile(cache.join('. '))
      clearTimeout(timer)

      timer = null
      cache.length = 0
    }, 2000)
  }

})()

var checkboxs = document.getElementsByTagName('input')

for(var i=0; i<checkboxs.length; i++) {
  checkboxs[i].onclick = function() {
    if(this.checked === true) {
      proxy(this.id)
    }
  }
}


// 缓存代理

// 参考03-闭包，高阶函数