import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '../../../pipes/translate.pipe';
import { BrandConfigService, BrandConfig } from '../../../services/brand-config.service';

/**  Footer component displaying site information and links. */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  template: `
    <footer class="bg-primary text-on-primary text-sm py-6 flex flex-col items-center mt-8">
      <span class="mb-2">&copy;2025 {{ config?.appName || ('footer.appName' | translate) }}</span>
      <span class="mb-3">
        {{ 'footer.dataFrom' | translate }}
        <a href="https://www.thecocktaildb.com/" target="_blank" class="underline hover:text-white">
          TheCocktailDB
        </a>
      </span>
      <div class="flex flex-wrap gap-6 justify-center">
        <a [routerLink]="['/about']" class="hover:text-white">{{ 'footer.about' | translate }}</a>
        <a href="https://github.com/mitkoarsov/drinks-app" target="_blank" class="hover:text-white">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/mitkoarsov/" target="_blank" class="hover:text-white">
          Mitko Arsov
        </a>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  config: BrandConfig | null = null;
  constructor(private brandConfigService: BrandConfigService) {
    this.brandConfigService.selectedBrand$.subscribe((brand) => {
      this.config = brand;
    });
  }
}
