# Pointer Event Polyfill

![image](https://user-images.githubusercontent.com/7768919/167619363-b358b4af-c3c2-4aa9-a2d7-a7b04cb84330.png)

这个 Polyfill 可以解决由于部分浏览器不支持 PointerEvent 从而引发 Oasis 脚本生命周期中 onPointerXXX 回调异常的问题。
## Usage

### 安装 npm 包 (请使用最新版本的包)

```sh
npm install @oasis-engine/pointer-polyfill
```

### 导入

```javascript
// 无需其他操作
import "@oasis-engine/pointer-polyfill";
```

## QA

### 需要判断是否支持 Pointer 再导入吗？

答：不需要，导入的包内部已经做了兼容。

### 既然这块代码官方还是提供了，为什么不直接写进引擎内？

答：Pointer 是未来趋势，所以这段适配可能在不久之后就不需要了。
