import { Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { DrinkComponent } from './pages/drink/drink.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'drink/:id', component: DrinkComponent },
  { path: '**', component: NotFoundComponent },
];
