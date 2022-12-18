export class PointerEvent {
  public pointerType: string;
  public pointerId: number;
  public offsetX: number;
  public offsetY: number;
  public button: number = 0;
  public buttons: number = 1;

  /**
   * 使用 Touch 填充 PointerEvent.
   * @param pointerType - PointerType
   * @param touch - Source Data
   * @returns
   */
  public static createFromTouch(
    pointerType: string,
    touch: Touch,
    target: HTMLCanvasElement
  ): UIEvent {
    var evt = new UIEvent(pointerType);
    // @ts-ignore
    evt.pointerType = "touch";
    // @ts-ignore
    evt.pointerId = (touch.identifier || 0) + 2;
    const rect = target.getBoundingClientRect();
    // @ts-ignore
    evt.clientX = touch.clientX;
    // @ts-ignore
    evt.clientY = touch.clientY;
    // @ts-ignore
    evt.offsetX = touch.clientX - rect.left;
    // @ts-ignore
    evt.offsetY = touch.clientY - rect.top;
    return evt;
  }
}
