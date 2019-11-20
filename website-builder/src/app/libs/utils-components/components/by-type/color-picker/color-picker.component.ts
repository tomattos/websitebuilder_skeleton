import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'wb-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input() color: string;
  @Output() updateColorEvent = new EventEmitter<string>();
  @ViewChild('colorPicker', { static: true }) canvasElRef: ElementRef;
  @ViewChild('circleControl', { static: true }) circleControl: ElementRef;
  ctx: CanvasRenderingContext2D;
  controlPosition: { x: number, y: number };
  mainColorBoardW: number;
  mainColorBoardH: number;
  sidebarW: number;
  sidebarH: number;
  circleStyle: { top: string, left: string };

  constructor() {
    this.mainColorBoardW = 209;
    this.mainColorBoardH = 180;
    this.sidebarW = 40;
    this.sidebarH = 180;
    this.circleStyle = {
      top: '0',
      left: '199px'
    };
  }

  ngOnInit() {
    this.ctx = this.canvasElRef.nativeElement.getContext('2d');

    this.initDraw(this.ctx);
    this.initControlPosition();
  }

  initDraw(ctx: CanvasRenderingContext2D) {
    const canvasWith = this.canvasElRef.nativeElement.width;
    const sidebarOffsetX = canvasWith - this.sidebarW;

    const mouseDown$: Observable<MouseEvent> = fromEvent(this.canvasElRef.nativeElement, 'mousedown');
    const mouseUp$: Observable<MouseEvent> = fromEvent(this.canvasElRef.nativeElement, 'mouseup');
    const mouseMove$: Observable<MouseEvent> = fromEvent(this.canvasElRef.nativeElement, 'mousemove');

    const source$ = mouseDown$.pipe(
      mergeMap(() => mouseMove$.pipe(takeUntil(mouseUp$)))
    );

    /* draw sidebar with main colors spector */
    this.drawSideBarPicker(ctx, this.sidebarW, this.sidebarH);

    /* draw main color board */
    this.drawMainColorBoard(ctx);

    /* listening the click event for handling pick color */
    source$.subscribe((e: MouseEvent) => {
      /* handle sidebar click */
      if (e.offsetX >= sidebarOffsetX && e.offsetY < this.sidebarH) {
        this.handleSidebarClickEvent(ctx, e);
      }

      /* handle main board click */
      if (e.offsetX <= this.mainColorBoardW && e.offsetY < this.mainColorBoardH) {
        this.handleMainBoardChangeEvent(ctx, e);
      }
    });
  }

  handleSidebarClickEvent(ctx: CanvasRenderingContext2D, e: MouseEvent) {
    this.pickColor(ctx, e);
    this.changeCircleControlPosition(204, 5);
  }

  handleMainBoardChangeEvent(ctx: CanvasRenderingContext2D, e: MouseEvent) {
    this.pickColor(ctx, e);

    this.changeCircleControlPosition(e.offsetX, e.offsetY);
  }

  changeCircleControlPosition(x: number, y: number) {
    this.circleStyle.left = `${x - 5}px`;
    this.circleStyle.top = `${y - 5}px`;
  }

  pickColor(ctx: CanvasRenderingContext2D, e: MouseEvent) {
    const rgb: Uint8ClampedArray = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    const hex = this.rgbToHex(rgb);

    this.updateColorEvent.emit(hex);
    this.drawMainColorBoard(ctx, undefined, undefined, hex);
  }

  rgbToHex([r, g, b]: Uint8ClampedArray): string {
    const hex = ((r << 16) | (g << 8) | b).toString(16);
    return `#${(`000000${hex}`).slice(-6)}`;
  }

  drawSideBarPicker(ctx: CanvasRenderingContext2D,
                    width: number,
                    height: number): void {
    const colorArr = [[0, '#ff0000'], [0.25, '#ffd200'], [0.53, '#00ccff'], [0.83, '#5500ff'], [1, '#ff0000']];
    const gradient = ctx.createLinearGradient(220, 0, 220, 180);

    colorArr.forEach(([position, color] : [number, string]) => gradient.addColorStop(position, color));

    ctx.fillStyle = gradient;
    ctx.fillRect(220, 0, width, height);
  }

  initControlPosition() {
    for (let i = 0; i <= 180; i++) {
      const rgb: Uint8ClampedArray = this.ctx.getImageData(0, i, 1, 1).data;
      const hex = this.rgbToHex(rgb);

      if (hex === this.color) {
        this.controlPosition = {
          x: 0,
          y: i
        };
        break;
      }
    }
  }

  drawMainColorBoard(ctx: CanvasRenderingContext2D,
                     width: number = this.mainColorBoardW,
                     height: number = this.mainColorBoardH,
                     color: string = this.color) {
    // Todo: change color point from local to store based
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    const grdWhite = ctx.createLinearGradient(0, 0, width, 0);
    grdWhite.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grdWhite.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grdWhite;
    ctx.fillRect(0, 0, width, height);

    const grdBlack = ctx.createLinearGradient(0, 0, 0, height);
    grdBlack.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grdBlack.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.fillStyle = grdBlack;
    ctx.fillRect(0, 0, width, height);
  }
}
