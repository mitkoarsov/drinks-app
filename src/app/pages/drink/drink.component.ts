import { inject, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, delay, tap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppStore } from '../../state/app.store';
import { DrinkDetails } from '../../models/drink.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DrinksService } from '../../services/drinks.service';

import { NotFoundComponent } from '../not-found/not-found.component';
import { ButtonComponent } from '../../components/shared/button.component';

/** Drink detail page component. */
@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NotFoundComponent, TranslatePipe],
  templateUrl: './drink.component.html',
})
export class DrinkComponent {
  loading: boolean = true;
  notFound: boolean = false;
  language$: Observable<string>;
  drink$: Observable<DrinkDetails | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private drinksService: DrinksService,
    private store: AppStore = inject(AppStore),
  ) {
    this.language$ = this.store.language$;
    this.drink$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return id
          ? (this.drinksService.getDrinkById$(id) as Observable<DrinkDetails | null>)
          : of(null);
      }),
      delay(275),
      tap((drink) => {
        this.loading = false;
        this.notFound = !drink || !drink.id;
      }),
      take(1),
    );
  }

  goHome(): void {
    this.router.navigate(['']);
  }
}
