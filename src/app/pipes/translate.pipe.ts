import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private sub: Subscription;
  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.sub = this.translate.translationsChanged$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }
  transform(key: string, params?: Record<string, string | number>): string {
    return this.translate.translate(key, params);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
