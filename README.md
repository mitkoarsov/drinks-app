# White-Label App

This is a white-label drinks app built with Angular. All UI, branding, and features are driven by a JSON config file. The app can be rebranded and extended for any client.

## Features

- Drinks list: Grid of drinks (image + name) from [TheCocktailDB API](https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic)
- Drink details: Image, name, ingredients, instructions (multi-language) from [TheCocktailDB API](https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id})
- White-label: All branding (logo, colors, app name, etc.)
- Dynamic theming: CSS variables set at runtime from config
- Localization: UI in EN, FR, ES, DE, IT; runtime language switching
- Age gate: Modal for age verification
- Accessible & responsive
- Error handling: 404 and loading states

## White-Labeling

The app reads a `brand-config.json` file at startup. This file defines:

- `appName`: Brand name
- `logoUrl`: Brand logo
- `theme`: Primary/accent colors
- Other brand-specific settings

**Example `brand-config.json`:**

```json
{
  "appName": "Eliq Spirits",
  "logoUrl": "/assets/brands/eliq/logo.svg",
  "theme": {
    "primaryColor": "#be185d",
    "accentColor": "#f472b6"
  }
}
```

### How to Rebrand

1. Create a new JSON config (change name, logo, colors, features)
2. Place it in `assets/brands/`
3. Select the brand in the UI or set as default
4. The app updates UI and branding instantly

### How the JSON Config Controls the UI

The `brand-config.json` file directly controls the following UI elements:

- **App name:** Used in the header, footer, and About page. Changing `appName` in the JSON updates all these places instantly.
- **Logo:** The `logoUrl` path is used for the header logo. Swap the logo by changing the URL in the config.
- **Theme colors:** The `theme.primaryColor` and `theme.accentColor` values are injected as CSS variables. This changes the look of all buttons, links, and highlights throughout the app.
- **Feature toggles:** You can add boolean flags (e.g., `showSearch`, `showBrandSwitcher`) to the config. The app reads these and conditionally shows/hides the search bar, brand switcher, or other UI features without code changes.
- **Custom links/text:** You can extend the config to include custom footer links or About page text. The app will render these dynamically if present.

**Example:**

```json
{
  "appName": "MyBrand",
  "logoUrl": "/assets/brands/mybrand/logo.svg",
  "theme": {
    "primaryColor": "#123456",
    "accentColor": "#abcdef"
  },
  "features": {
    "showSearch": false,
    "showBrandSwitcher": true
  },
  "footerLinks": [{ "label": "Contact", "url": "/contact" }]
}
```

**Design trade-offs:**

- The config is flat and easy to edit, but not all possible UI customizations are exposed (for simplicity).
- Adding new features is as simple as adding a new property to the config and reading it in the relevant component.
- This approach keeps the codebase generic and brand-agnostic, but requires discipline to avoid hardcoding brand-specific logic in the app.

## Tech

- Angular 20.3.5
- Tailwind CSS 3.4.18
- @ngrx/component-store, RxJS
- Angular Router
- TheCocktailDB API
- Prettier, ESLint, TypeScript

## Run locally

```bash
ng serve
```

Open [http://localhost:4200/](http://localhost:4200/)

## Demo

**Live:** [https://GetEliq.github.io/Eliq-drinks-app-Mitko/](https://GetEliq.github.io/Eliq-drinks-app-Mitko/)

---

**Design notes:**

- All branding/theming is runtime-configurable (WLA-first)
- Minimal bundle, fast load, accessible, modular
