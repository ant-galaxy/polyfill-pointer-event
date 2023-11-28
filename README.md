# Pointer Event Polyfill

<p align='left'>
<b>English</b> | <a href="https://github.com/galacean/polyfill-pointer-event/blob/main/README.zh-CN.md">简体中文</a>
<!-- Contributors: Thanks for geting interested, however we DON'T accept new transitions to the README, thanks. -->
</p>

<br>

![image](https://user-images.githubusercontent.com/7768919/167619363-b358b4af-c3c2-4aa9-a2d7-a7b04cb84330.png)

This polyfill can solve the problem of `onPointerXXX` callback exceptions in the Galacean script life cycle due to some browsers not supporting `PointerEvent`.

## Usage

### Install the npm package (please use the latest version of the package)

```sh
npm install @galacean/pointer-polyfill
```

### import

```javascript
import "@galacean/pointer-polyfill";
```

## QA

### Q:Need to judge whether `PointerEvent` is supported before importing?

A：Unnecessary.

### Q.Why not write directly into the engine?

A：Pointer is the future, so this adaptation may not be needed in the near future.
