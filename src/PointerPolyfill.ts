import { PEPObserver } from "./PEPObserver";
import { PointerEvent } from "./PointerEvent";

/**
 * Pointer Event Polyfill.
 */
export class PointerPolyfill {
  static registerPointerPolyFill() {
    if (!window.PointerEvent) {
      // @ts-ignore
      window.PointerEvent = PointerEvent;
      PEPObserver.ins.initListener();
    }
  }

  /**
   * 注册画布，使其可以接收到 Pointer 事件
   * @param canvas - Oasis 运行的原生画布
   * @returns
   */
  static registerCanvas(canvas: HTMLCanvasElement): void {
    canvas.addEventListener("touchstart", PointerPolyfill.onTouchStart);
    canvas.addEventListener("touchmove", PointerPolyfill.onTouchMove);
    canvas.addEventListener("touchend", PointerPolyfill.onTouchEnd);
    canvas.addEventListener("touchcancel", PointerPolyfill.onTouchCancel);
  }

  /**
   * 注销画布
   * @returns
   */
  static unregisterCanvas(canvas: HTMLCanvasElement) {
    canvas.removeEventListener("touchstart", PointerPolyfill.onTouchStart);
    canvas.removeEventListener("touchmove", PointerPolyfill.onTouchMove);
    canvas.removeEventListener("touchend", PointerPolyfill.onTouchEnd);
    canvas.removeEventListener("touchcancel", PointerPolyfill.onTouchCancel);
  }

  private static onTouchStart(evt: TouchEvent) {
    evt.cancelable && evt.preventDefault();
    const target = evt.target as HTMLCanvasElement;
    var changedTouches = evt.changedTouches || evt.touches;
    for (var i = 0, n = changedTouches.length; i < n; i++) {
      const pointerEvent = PointerEvent.createFromTouch(
        "pointerdown",
        changedTouches[i],
        target
      );
      // @ts-ignore
      pointerEvent.button = 0;
      // @ts-ignore
      pointerEvent.buttons = 1;
      target.dispatchEvent(pointerEvent);
    }
  }

  private static onTouchEnd(evt: TouchEvent) {
    evt.cancelable && evt.preventDefault();
    const target = evt.target as HTMLCanvasElement;
    var changedTouches = evt.changedTouches || evt.touches;
    for (var i = 0, n = changedTouches.length; i < n; i++) {
      var touch = changedTouches[i];
      const upPointerEvent = PointerEvent.createFromTouch(
        "pointerup",
        touch,
        target
      );
      // @ts-ignore
      upPointerEvent.button = 0;
      // @ts-ignore
      upPointerEvent.buttons = 0;
      target.dispatchEvent(upPointerEvent);
      const outPointerEvent = PointerEvent.createFromTouch(
        "pointerout",
        touch,
        target
      );
      // @ts-ignore
      outPointerEvent.button = 0;
      // @ts-ignore
      outPointerEvent.buttons = 0;
      target.dispatchEvent(outPointerEvent);
    }
  }

  private static onTouchMove(evt: TouchEvent) {
    evt.cancelable && evt.preventDefault();
    const target = evt.target as HTMLCanvasElement;
    var changedTouches = evt.changedTouches || evt.touches;
    for (var i = 0, n = changedTouches.length; i < n; i++) {
      const pointerEvent = PointerEvent.createFromTouch(
        "pointermove",
        changedTouches[i],
        target
      );
      // @ts-ignore
      pointerEvent.button = 0;
      // @ts-ignore
      pointerEvent.buttons = 1;
      target.dispatchEvent(pointerEvent);
    }
  }

  private static onTouchCancel(evt: TouchEvent) {
    evt.cancelable && evt.preventDefault();
    const target = evt.target as HTMLCanvasElement;
    var changedTouches = evt.changedTouches || evt.touches;
    for (var i = 0, n = changedTouches.length; i < n; i++) {
      const pointerEvent = PointerEvent.createFromTouch(
        "pointercancel",
        changedTouches[i],
        target
      );
      // @ts-ignore
      pointerEvent.button = -1;
      // @ts-ignore
      pointerEvent.buttons = 0;
      target.dispatchEvent(pointerEvent);
    }
  }
}
