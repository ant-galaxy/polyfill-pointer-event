/**
 * This module uses Mutation Observers to dynamically adjust which nodes will
 * generate Pointer Events.
 */
import { PointerPolyfill } from "./PointerPolyfill";

export class PEPObserver {
  private static _ins: PEPObserver;
  public static get ins(): PEPObserver {
    if (!this._ins) {
      this._ins = new PEPObserver();
    }
    return this._ins;
  }

  private _observer: MutationObserver;
  private _listenerList: HTMLCanvasElement[] = [];

  public initListener() {
    if (window.MutationObserver) {
      this._observer = new MutationObserver(this._onMutation.bind(this));
      this._observer.observe(document, {
        subtree: true,
        childList: true,
      });
      if (document.readyState === "complete") {
        const canvasNodeList = document.querySelectorAll("canvas");
        for (let i = canvasNodeList.length - 1; i >= 0; i--) {
          this._onAddElement(canvasNodeList[i]);
        }
      } else {
        document.addEventListener("readystatechange", () => {
          if (document.readyState === "complete") {
            const canvasNodeList = document.querySelectorAll("canvas");
            for (let i = canvasNodeList.length - 1; i >= 0; i--) {
              this._onAddElement(canvasNodeList[i]);
            }
          }
        });
      }
    }
  }

  private _onMutation(
    mutationList: MutationRecord[],
    observer: MutationObserver
  ) {
    for (let i = 0, n = mutationList.length; i < n; i++) {
      const mutation = mutationList[i];
      if (mutation.type === "childList") {
        this._flattenMutationTree(mutation.addedNodes, this._onAddElement);
        this._flattenMutationTree(mutation.removedNodes, this._onDelElement);
      }
    }
  }

  private _onAddElement(canvas: HTMLCanvasElement) {
    if (this._listenerList.indexOf(canvas) < 0) {
      this._listenerList.push(canvas);
      PointerPolyfill.registerCanvas(canvas);
    }
  }

  private _onDelElement(canvas: HTMLCanvasElement) {
    const index = this._listenerList.indexOf(canvas);
    if (index >= 0) {
      this._listenerList.splice(index, 1);
      PointerPolyfill.unregisterCanvas(canvas);
    }
  }

  private _flattenMutationTree(nodes: NodeList, handleFun: Function): void {
    // find children with touch-action
    for (let i = 0; i < nodes.length; i++) {
      const canvasList = this._findCanvas(nodes[i]);
      if (canvasList) {
        for (let j = canvasList.length - 1; j >= 0; j--) {
          handleFun(canvasList[j]);
        }
      }
    }
  }

  private _findCanvas(target: any): NodeListOf<HTMLCanvasElement> {
    if (target.querySelectorAll) {
      return target.querySelectorAll("canvas");
    } else {
      return null;
    }
  }
}
