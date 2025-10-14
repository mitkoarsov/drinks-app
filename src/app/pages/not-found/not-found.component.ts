import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../components/shared/button.component';

/** 404 Not Found page component. */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="m-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div class="relative mb-2 flex flex-col items-center">
        <span
          class="block text-8xl font-extrabold text-blue-500 animate-bounce select-none drop-shadow-lg"
        >
          404
        </span>
      </div>
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Lost in the Mix?</h1>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">
        Looks like you’ve shaken things up a bit too much. This page doesn’t exist, but you can
        always get back to the homepage for another round!
      </p>
      <app-button (btnClick)="goHome()">Back to Homepage</app-button>
    </div>
  `,
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['']);
  }
}
