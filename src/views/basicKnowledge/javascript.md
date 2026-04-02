<script setup>
</script>
## 数据类型
###### 1.基本类型
* string, number, boolean, undefined, null, symbol, bigint  7种原始类型。
* es6新增了一种类型叫做symbol(符号),表示独一无二的值，只能通过Symbol函数生成，由于他生成的是原始值，所以不用new。
* bigint也是es6之后新增的，目的是为了处理超大数值。如何使用？在数字后面加个n,比如10n，或者BigInt("9007199254740995"); 
* null不是一个对象，虽然typeof null  === 'object', 但null指的是空值，即声明了一个变量并且有值，但他的值是一个空值。
* undefined指声明了一个变量但未定义它的值。
###### 2.引用类型
* 在JS中，所有非原始类型的值我们都可以认为是引用类型。主要包含的是object，array和function属于object的子类型。
###### 3.非引用类型（基本类型）和引用类型的差别
* 非引用类型的值是固定的，无法改变。引用类型的值是一个指针，你可以把它想象成一个地址，这个地址可以叫A，也可以叫B，C等等，虽然他们的名字不同，但是他们的内容是相同的。所以引用类型可以有不同名字，但他们指向的是同一个地址，他们的内容是相同的。
###### 4.类型转换
* Symbol.toPrimitive(obj, type)，当一个对象转换为原始值时，调用此函数。
* 如何使a == 1 && a==2为true ?
```Javascript
const a = {
    value: 0,
    valueOf: function(){
        return ++this.value
    }
}
console.log(a == 1 && a==2);
```
###### 5.如何判断数据类型
* typeof可以判断基本类型，无法判断引用类型的子类型。
* instanceof判断对象是否在原型链上。例：
```Javascript
const str1 = 'str1'
str1 instanceof String   //打印出false，因为str1被包装成对象以后又被置为null释放，
他是原始类型值，所以不存在于原型链上。
const str2 = new String('str2')
str2 instanceof String //true
```
* 手动实现instanceof
```Javascript
    /*
    ** @obj 实例对象
    ** @func 构造函数
    */
    function myInstanceof(obj, func) {
      if (typeof obj !== 'object' || obj === null) {
        return false;
      }
      let protoype = Object.getPrototypeOf(obj) //拿到参数原型对象
      while (true) {
        //查到原型链尽头，还未找到
        if (protoype == null) return false;
        //找到了
        if (protoype == func.prototype) return true;
        protoype = Object.getPrototypeOf(protoype);
      }
    }
    //测试案例
    console.log(myInstanceof('str1', String)) //false
    console.log(myInstanceof(new String('str2'), String)) //true
```
* 利用原型链上的toString方法
```
Object.prototype.toString.call(data)
//例：
Object.prototype.toString.call(000) //打印出[object Number]
Object.prototype.toString.call('000') //打印出[object String]
``` 

## 作用域
首先我们要明白什么是作用域。通俗点讲作用域就是变量起作用的地方。作用域又分为静态作用域和动态作用域。而JavaScript就是静态作用域的语言
###### 静态作用域和动态作用域
静态作用域就是在变量定义的时候已经确定了它的作用范围。而动态作用作用域是在变量使用时确定作用范围。举个栗子：
```javascript
const val = 1;
function foo(){
  console.log(val);
}
function bar(){
  let value = 2;
  foo();
}
bar();
```
大家猜猜输出结果是多少？没错，是1，因为当foo执行时，foo内的 val会先去foo定义的地方开始查找，而不是foo执行的地方查找。这就是称之为静态作用域的原因，因为他的查找方向是静态的，从定义的时候就已确定。
顺便补充一句，在JavaScript中，静态作用域也叫做词法作用域。
那么，什么是动态作用域呢？这个，聪明的你们应该可以根据静态作用域反着来看就知道了，我就不啰嗦了。
###### 作用域链
在ES5中，只有全局作用域和函数作用域，当JS引擎访问某个变量时，如果在当前作用域找不到，就会去当前作用域（这里一定是指的它的静态作用域，即它声明的地方，而不是它调用的地方）的父作用域查找，一级一级网上找，直到全局作用域，如果还没找到话就会报错，这样的逐级查找就像是一根链条一样，所以也叫作用域链。
######  闭包
* 定义：闭包也称闭包函数，可以访问其他函数作用域（包括全局作用域）的函数我们称之为闭包函数。
* 闭包的作用：
1.创建私有变量
2.创建模块，实现模块化开发，防止全局变量污染，其实感觉跟第一点是同样的效果。
* 闭包的应用形式：
1.函数作为参数
2.函数作为返回值
3.包含自由变量的回调函数
```Javascript
//输出什么?
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  });
}
//如何依次输出？
//第一种
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    });
  })(i); //想想为什么i会传值给j, var fn = function(j){}; fn(i);  i是不是等于j了？
}
//第二种
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  });
}
```


## 模块

### 为什么需要模块化？

 <p>网上很多资料说的理由很多，比如说全局污染、依赖混乱、导入导出、无法复用，在我看来，其实都可以归类到一个问题，就是为了解决代码组织的分化问题，通过模块化的手段来进行分化，使得其组织逻辑清晰，易于使用和维护。</p>

### Commonjs

<p>一开始是在node端用于文件操作，所以设计成了同步的方式，采用了值类型，在运行时加载，所以无法被tree-shaking。而且node原生支持，浏览器端需要通过webpack/vite等打包器来处理，原理是模块加载器 +  缓存对象 + 导入/导出</p>

<p>需要注意的是：exports 是 module.exports 的引用，最终导出的是 module.exports
如果你直接写 exports = {}，引用断了，无效。记住：永远用 module.exports 最安全</p>

### Es6 module

<p>它是es6规范中引入的新范式，官方标准，支持浏览器 + node, 未来的唯一标准。</p>

<p>与commonjs刚好相反的是，它设计成了异步模式，采用类引用类型，所以他支持异步加载，在编译时加载、支持tree-shaking，他的原理与commonjs类似，编译后的代码结构也是模块加载器 +  缓存对象 + 导入/导出。</p>

### AMD

<p>这是以前sea.js中的模块规范，现在基本上看不到了，这里就不讨论了，现在主要的模块规范还是Commonjs和Es6 module</p>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";

</style>
