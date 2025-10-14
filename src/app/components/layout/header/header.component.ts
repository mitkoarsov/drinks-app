import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppStore } from '../../../state/app.store';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { BrandConfigService, BrandConfig } from '../../../services/brand-config.service';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { LanguageBarComponent } from './language-bar/language-bar.component';
import { BrandSwitcherComponent } from './brand-switcher/brand-switcher.component';

/**
 *  Header component containing logo, search bar, language selector, and brand switcher.
 *  Applies selected brand theme to the application.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchBarComponent,
    LanguageBarComponent,
    BrandSwitcherComponent,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() ready = new EventEmitter<void>();

  brands: BrandConfig[] = [];
  config: BrandConfig | null = null;
  selectedBrand: BrandConfig | null = null;

  constructor(
    private appStore: AppStore,
    private brandConfigService: BrandConfigService,
  ) {
    this.loadBrands();
  }

  async loadBrands(): Promise<void> {
    this.brands = await this.brandConfigService.loadBrands();

    // Set initial brand to match config or first brand
    const initial: BrandConfig = this.brands[0];
    this.selectedBrand = initial;
    this.applyTheme(initial.theme);
    this.config = { ...initial };
    this.brandConfigService.setSelectedBrand(initial);

    // Notify root component that theme is ready
    this.ready.emit();
  }

  onBrandChange(option: { appName: string }): void {
    // Find the full BrandConfig by appName
    const brand: BrandConfig | undefined = this.brands.find(
      (brand) => brand.appName === option.appName,
    );

    if (!brand) return;

    this.selectedBrand = brand;
    this.config = { ...brand };
    this.applyTheme(brand.theme);
    this.brandConfigService.setSelectedBrand(brand);
  }

  applyTheme(theme: { primaryColor: string; accentColor: string }): void {
    document.documentElement.style.setProperty('--primary', theme.primaryColor);
    document.documentElement.style.setProperty('--accent', theme.accentColor);
  }

  onLogoClick(): void {
    this.appStore.setPage(1);
  }
}
