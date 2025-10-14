import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { AppStore } from './state/app.store';
import { BrandConfigService } from './services/brand-config.service';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AgeGateComponent } from './components/shared/age-gate/age-gate.component';

/** Main application component serving as the root of the app. */
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, AgeGateComponent],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  private store: AppStore = inject(AppStore);
  private brandConfigService: BrandConfigService = inject(BrandConfigService);
  isAdult$: Observable<boolean | null> = this.store.isAdult$;

  ngOnInit(): void {
    // Always unhide app-root immediately so modal/header can show
    const appRoot: Element | null = document.querySelector('app-root');
    if (appRoot) appRoot.removeAttribute('hidden');
    this.brandConfigService.selectedBrand$.subscribe((brand) => {
      if (brand?.appName) {
        document.title = brand.appName;
      }
    });
  }
}
