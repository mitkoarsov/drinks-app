import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { BrandConfigService } from '../../services/brand-config.service';

import { ButtonComponent } from '../../components/shared/button.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AsyncPipe, TranslatePipe, ButtonComponent],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  brandConfiguration$ = inject(BrandConfigService).selectedBrand$;

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['']);
  }
}
