import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslatePipe } from '../../../../pipes/translate.pipe';

export interface BrandConfigOption {
  name: string;
  appName: string;
  logoUrl: string;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
}

/**
 *  Dropdown to switch between different brand configurations.
 *  Emits brandChange event when a new brand is selected.
 */
@Component({
  selector: 'app-brand-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="relative w-[120px] text-center">
      <label for="brand-switcher-select" class="block text-xs font-medium text-white mb-1">
        {{ 'brandSwitcher.selectBrand' | translate }}
      </label>
      <select
        id="brand-switcher-select"
        [(ngModel)]="selected"
        (ngModelChange)="onChange($event)"
        class="w-full px-2 py-1 rounded border truncate bg-white text-gray-900 appearance-none"
      >
        <option
          *ngFor="let option of options"
          [ngValue]="option"
          [selected]="option.appName === selected.appName"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  `,
})
export class BrandSwitcherComponent {
  @Input() options: BrandConfigOption[] = [];
  @Input() selected!: BrandConfigOption;
  @Output() brandChange = new EventEmitter<BrandConfigOption>();

  onChange(option: BrandConfigOption) {
    this.brandChange.emit(option);
  }
}
