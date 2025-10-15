import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Drink card: image, name, accent background. Navigates to drink detail.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <a
      [routerLink]="['/drink', id]"
      class="block rounded-xl overflow-hidden shadow border border-gray-100 bg-white hover:shadow-lg hover:border-blue-200 transition group"
    >
      <img
        [src]="image"
        [alt]="name"
        class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
        [attr.loading]="loading"
      />
      <div class="bg-accent p-3">
        <div
          [ngClass]="
            isAlcoholic
              ? 'ml-1 inline-block border border-white text-white font-semibold rounded-full px-1.5 py-0 text-[10px] bg-transparent'
              : 'ml-1 inline-block border border-white text-accent font-semibold rounded-full px-1.5 py-0 text-[10px] bg-white'
          "
        >
          {{ isAlcoholic ? ('drink.alcoholic' | translate) : ('drink.nonAlcoholic' | translate) }}
        </div>
        <div class="font-semibold text-on-accent rounded px-2 py-1 truncate">{{ name }}</div>
      </div>
    </a>
  `,
})
export class CardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() image = '';
  @Input() isAlcoholic = false;
  @Input() loading: 'eager' | 'lazy' = 'lazy';
}
