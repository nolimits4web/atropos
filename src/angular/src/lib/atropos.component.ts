import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import AtroposCore, { AtroposInstance, AtroposOptions } from 'atropos';

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
  @Input() class: string = '';
  @Input() eventsEl: AtroposOptions['eventsEl'];
  @Input() shadow: AtroposOptions['shadow'];
  @Input() highlight: AtroposOptions['highlight'];
  @Input() alwaysActive: AtroposOptions['alwaysActive'];
  @Input() activeOffset: AtroposOptions['activeOffset'];
  @Input() shadowOffset: AtroposOptions['shadowOffset'];
  @Input() shadowScale: AtroposOptions['shadowScale'];
  @Input() duration: AtroposOptions['duration'];
  @Input() rotate: AtroposOptions['rotate'];
  @Input() rotateTouch: AtroposOptions['rotateTouch'];
  @Input() rotateXMax: AtroposOptions['rotateXMax'];
  @Input() rotateYMax: AtroposOptions['rotateYMax'];
  @Input() rotateXInvert: AtroposOptions['rotateXInvert'];
  @Input() rotateYInvert: AtroposOptions['rotateYInvert'];
  @Input() stretchX: AtroposOptions['stretchX'];
  @Input() stretchY: AtroposOptions['stretchY'];
  @Input() stretchZ: AtroposOptions['stretchZ'];
  @Input() commonOrigin: AtroposOptions['commonOrigin'];
  @Input() scaleClassName: string = '';
  @Input() rotateClassName: string = '';
  @Input() innerClassName: string = '';
  @Output() onEnter = new EventEmitter<Parameters<AtroposOptions['onEnter']>>();
  @Output() onLeave = new EventEmitter<Parameters<AtroposOptions['onLeave']>>();
  @Output() onRotate = new EventEmitter<Parameters<AtroposOptions['onRotate']>>();
  ref: AtroposInstance | undefined;
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initAtropos();
  }

  getConfig() {
    return {
      eventsEl: this.eventsEl,
      alwaysActive: this.alwaysActive,
      activeOffset: this.activeOffset,
      shadowOffset: this.shadowOffset,
      shadowScale: this.shadowScale,
      duration: this.duration,
      rotate: this.rotate,
      rotateTouch: this.rotateTouch,
      rotateXMax: this.rotateXMax,
      rotateYMax: this.rotateYMax,
      rotateXInvert: this.rotateXInvert,
      rotateYInvert: this.rotateYInvert,
      stretchX: this.stretchX,
      stretchY: this.stretchY,
      stretchZ: this.stretchZ,
      commonOrigin: this.commonOrigin,
      shadow: this.shadow,
      highlight: this.highlight,
    };
  }

  ngOnChanges(changedParams: SimpleChanges) {
    this.ref.params = this.getConfig();
  }

  initAtropos() {
    this.ref = AtroposCore({ el: this.elementRef.nativeElement, ...this.getConfig() });
  }
}
