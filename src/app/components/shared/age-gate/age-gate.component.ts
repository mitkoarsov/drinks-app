import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { AppStore } from '../../../state/app.store';
import { TranslatePipe } from '../../../pipes/translate.pipe';

import { LanguageBarComponent } from '../../layout/header/language-bar/language-bar.component';

/**
 *  Age gate component to verify if the user is an adult.
 *  Displays a modal asking for age confirmation before accessing the app.
 */
@Component({
  selector: 'app-age-gate',
  standalone: true,
  imports: [CommonModule, TranslatePipe, LanguageBarComponent],
  templateUrl: './age-gate.component.html',
})
export class AgeGateComponent {
  private store: AppStore = inject(AppStore);
  isAdult$: Observable<boolean | null> = this.store.isAdult$;

  setAdult(isAdult: boolean): void {
    this.store.setAdult(isAdult);
  }
}
