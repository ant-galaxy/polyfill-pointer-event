export declare class PointerEvent extends Event {
    pointerType: string;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    constructor(type: string);
    static createFromTouch(type: string, touch: Touch): PointerEvent;
}
