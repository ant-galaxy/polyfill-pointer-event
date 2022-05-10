import { PointerPolyfill } from "./PointerPolyfill";

export class PointerEvent extends Event {
  public pointerType: string;
  public pointerId: number;
  public offsetX: number;
  public offsetY: number;

  /**
   * Pointer Event.
   * @param type - Event Type
   */
  constructor(type: string) {
    super(type);
  }

  /**
   * 使用 Touch 填充 PointerEvent.
   * @param pointerType - PointerType
   * @param touch - Source Data
   * @returns
   */
  public static createFromTouch(pointerType: string, touch: Touch): PointerEvent {
    var evt = new PointerEvent(pointerType);
    evt.pointerType = "touch";
    evt.pointerId = (touch.identifier || 0) + 2;
    evt.offsetX = touch.pageX - PointerPolyfill.canvas.offsetLeft;
    evt.offsetY = touch.pageY - PointerPolyfill.canvas.offsetTop;
    return evt;
  }
}
