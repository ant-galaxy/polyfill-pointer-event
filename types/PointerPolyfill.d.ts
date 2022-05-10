export declare class PointerPolyfill {
    static canvas: HTMLCanvasElement;
    static register(canvas: HTMLCanvasElement): void;
    static unregister(): void;
    private static onTouchStart;
    private static onTouchEnd;
    private static onTouchMove;
    private static onTouchCancel;
}
