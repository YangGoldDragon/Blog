<script setup>
</script>
## 模块化（Commonjs、 Es6 module、AMD）

### 为什么需要模块化？

 <p>网上很多资料说的理由很多，比如说全局污染、依赖混乱、导入导出、无法复用，在我看来，其实都可以归类到一个问题，就是为了解决代码组织的分化问题，因为代码是一块很大的逻辑，必须通过模块化的手段来进行分化，使得其组织逻辑清晰，易于使用和维护。</p>

### Commonjs

<p>一开始是node专用，所以设计成了值引用的方式，同步加载、运行时加载、值拷贝、不支持tree-shaking</p>

<p>需要注意的是：exports 是 module.exports 的引用，最终导出的是 module.exports
如果你直接写 exports = {}，引用断了，无效。记住：永远用 module.exports 最安全</p>

### Es6 module

<p>它是es6规范中引入的新范式，官方标准，支持浏览器 + node, 未来的唯一标准。</p>

<p>与Commonjs刚好相反的是，它是异步加载、编译时加载、值引用、支持tree-shaking</p>

### AMD

<p>这是以前sea.js中的模块规范，现在基本上看不到了，这里就不讨论了，现在主要的模块规范还是Commonjs和Es6 module</p>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";

</style>
