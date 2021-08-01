import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })


export class ScrollerService {
    constructor(private viewportScroller: ViewportScroller) { }

    onClickScroll(elementId: string): void {
        this.viewportScroller.scrollToAnchor(elementId);
    }
}