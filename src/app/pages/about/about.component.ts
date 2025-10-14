import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { BrandConfigService } from '../../services/brand-config.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AsyncPipe, TranslatePipe],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  brandConfiguration$ = inject(BrandConfigService).selectedBrand$;
}
