import { PointerEvent } from "./PointerEvent";

/**
 * Pointer Event Polyfill.
 */
export class PointerPolyfill {
  public static canvas: HTMLCanvasElement;

  /**
   * 注册画布，使其可以接收到 Pointer 事件
   * @param canvas - Oasis 运行的原生画布
   * @returns
   */
  static register(canvas: HTMLCanvasElement): void {
    if (window.PointerEvent) {
      return;
    }
    if (PointerPolyfill.canvas) {
      if (PointerPolyfill.canvas === canvas) {
        return;
      } else {
        PointerPolyfill.unregister();
      }
    }
    PointerPolyfill.canvas = canvas;
    canvas.addEventListener("touchstart", PointerPolyfill.onTouchStart);
    canvas.addEventListener("touchmove", PointerPolyfill.onTouchMove);
    canvas.addEventListener("touchend", PointerPolyfill.onTouchEnd);
    canvas.addEventListener("touchcancel", PointerPolyfill.onTouchCancel);
  }

  /**
   * 注销画布
   * @returns
   */
  static unregister() {
    if (PointerPolyfill.canvas) {
      const canvas = PointerPolyfill.canvas;
      canvas.removeEventListener("touchstart", PointerPolyfill.onTouchStart);
      canvas.removeEventListener("touchmove", PointerPolyfill.onTouchMove);
      canvas.removeEventListener("touchend", PointerPolyfill.onTouchEnd);
      canvas.removeEventListener("touchcancel", PointerPolyfill.onTouchCancel);
      PointerPolyfill.canvas = null;
    }
  }

  private static onTouchStart(evt: TouchEvent) {
    const { canvas } = PointerPolyfill;
    if (!canvas) {
      return;
    }
    var changedTouches = evt.changedTouches || evt.touches;
    for (var i = 0; i < changedTouches.length; i++) {
      // @ts-ignore
      canvas.onpointerdown(PointerEvent.createFromTouch("pointerdown", changedTouches[i]));
    }
  }

  private static onTouchEnd(evt: TouchEvent) {
    const { canvas } = PointerPolyfill;
    if (!canvas) {
      return;
    }
    var changedTouches = evt.changedTouches || evt.touches;
    for (var i = 0; i < changedTouches.length; i++) {
      var touch = changedTouches[i];
      // @ts-ignore
      canvas.onpointerup(PointerEvent.createFromTouch("pointerup", touch));
      // @ts-ignore
      canvas.onpointerout(PointerEvent.createFromTouch("pointerout", touch));
    }
  }

  private static onTouchMove(evt: TouchEvent) {
    const { canvas } = PointerPolyfill;
    if (!canvas) {
      return;
    }
    var changedTouches = evt.changedTouches || evt.touches;
    for (var i = 0; i < changedTouches.length; i++) {
      // @ts-ignore
      canvas.onpointermove(PointerEvent.createFromTouch("pointermove", changedTouches[i]));
    }
  }

  private static onTouchCancel(evt: TouchEvent) {
    const { canvas } = PointerPolyfill;
    if (!canvas) {
      return;
    }
    var changedTouches = evt.changedTouches || evt.touches;
    for (var i = 0; i < changedTouches.length; i++) {
      // @ts-ignore
      canvas.onpointerout(PointerEvent.createFromTouch("pointerout", changedTouches[i]));
    }
  }
}
