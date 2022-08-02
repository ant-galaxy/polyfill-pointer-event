export class PointerEvent extends UIEvent {
  public pointerType: string;
  public pointerId: number;
  public offsetX: number;
  public offsetY: number;
  public button: number = 0;
  public buttons: number = 1;

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
  public static createFromTouch(
    pointerType: string,
    touch: Touch,
    target: HTMLCanvasElement
  ): PointerEvent {
    var evt = new PointerEvent(pointerType);
    evt.pointerType = "touch";
    evt.pointerId = (touch.identifier || 0) + 2;
    evt.offsetX = touch.pageX - target.offsetLeft;
    evt.offsetY = touch.pageY - target.offsetTop;
    return evt;
  }
}
