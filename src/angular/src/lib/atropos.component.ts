import { Component, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import AtroposCore, { AtroposInstance } from 'atropos';

@Component({
  selector: 'atropos',
  template: ` <div [ngClass]="'atropos ' + class">
    <span [ngClass]="'atropos-scale ' + scaleClassName">
      <span [ngClass]="'atropos-rotate ' + rotateClassName">
        <span [ngClass]="'atropos-inner ' + innerClassName">
          <ng-content></ng-content>
          <span *ngIf="highlight" class="atropos-highlight"></span>
        </span>
        <span *ngIf="shadow" class="atropos-shadow"></span>
      </span>
    </span>
  </div>`,
  styles: [],
})
export class AtroposComponent implements OnInit {
  @Input() shadow: boolean | undefined;
  @Input() highlight: boolean | undefined;
  @Input() class: string = '';
  @Input() eventsEl: any;
  @Input() alwaysActive: any;
  @Input() activeOffset: any;
  @Input() shadowOffset: any;
  @Input() shadowScale: any;
  @Input() duration: any;
  @Input() rotate: any;
  @Input() rotateTouch: any;
  @Input() rotateXMax: any;
  @Input() rotateYMax: any;
  @Input() rotateXInvert: any;
  @Input() rotateYInvert: any;
  @Input() stretchX: any;
  @Input() stretchY: any;
  @Input() stretchZ: any;
  @Input() commonOrigin: any;
  @Input() scaleClassName: string = '';
  @Input() rotateClassName: string = '';
  @Input() innerClassName: string = '';
  @Output() onEnter = new EventEmitter();
  @Output() onLeave = new EventEmitter();
  @Output() onRotate = new EventEmitter();
  ref: AtroposInstance | undefined;
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initAtropos();
  }

  initAtropos() {
    this.ref = AtroposCore({ el: this.elementRef.nativeElement });
  }
}
