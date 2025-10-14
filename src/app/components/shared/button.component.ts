import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 *  Reusable button component with configurable type and disabled state.
 *  Emits btnClick event on button click.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      (click)="btnClick.emit($event)"
      class="px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed themed-btn"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Output() btnClick = new EventEmitter<Event>();
}
