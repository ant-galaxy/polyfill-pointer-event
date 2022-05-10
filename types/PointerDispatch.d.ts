export declare class PointerPolyfill {
    private canvas;
    register(canvas: HTMLCanvasElement): void;
    private onTouchStart;
    private onTouchEnd;
    private onTouchMove;
    private onTouchCancel;
    unregister(): void;
}
