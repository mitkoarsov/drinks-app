# Drinks App (White-Label, Multi-Brand, Multi-Language)

This Angular app is fully white-label and multi-brand, with all UI, branding, and features controlled by JSON config files. The app is designed for easy rebranding and extension for any client or use-case.

## Features

- **Drinks list:** Grid of drinks (image + name) from TheCocktailDB API
- **Drink details:** Image, name, ingredients, instructions (multi-language)
- **Non-adult mode:** If the user is not an adult (age gate), only non-alcoholic drinks are shown
- **Sorting:** Drinks can be sorted by name (A-Z and Z-A)
- **Pagination:** Drinks list is paginated for better UX
- **Multi-language:** UI supports EN, FR, ES, DE, IT; language can be switched at runtime
- **Multi-brand:** Multiple brands can be configured and switched at runtime
- **Dynamic theming:** Colors, logo, and app name are set at runtime from the brand JSON
- **Accessible & responsive**
- **Error handling:** 404 and loading states

## How UI Elements Are Managed via JSON

All UI branding and many features are controlled by a JSON config file for each brand, located in `public/brands/`. Example:

```json
{
  "appName": "MyBrand",
  "logoUrl": "brands/mybrand/logo.svg",
  "theme": {
    "primaryColor": "#123456",
    "accentColor": "#abcdef"
  }
}
```

### What you can control in the JSON:

- **App name:** Used in header, footer, About page
- **Logo:** Used in header
- **Theme colors:** Set as CSS variables for all UI

### How to rebrand or extend:

1. Create a new JSON config for your brand in `public/brands/`
2. Add or change properties as needed (name, logo, colors, features)
3. Select the brand in the UI or set as default
4. The app updates instantly with the new branding and features

### Design decisions & trade-offs

- **Flat, editable config:** Easy to add new brands or features by editing JSON, but not all UI customizations are exposed for simplicity
- **No hardcoded brand logic:** All brand-specific logic is in the config, keeping the codebase generic
- **Feature flags:** New UI features can be toggled or added by extending the config and reading it in components

## Tech

- Angular 20.3.5
- Angular Router
- TheCocktailDB API
- Tailwind CSS 3.4.18
- @ngrx/component-store, RxJS
- Prettier, ESLint, TypeScript

## Run locally

```bash
ng serve
```

Open [http://localhost:4200/](http://localhost:4200/)

## Demo

**Live:** [https://mitkoarsov.github.io/drinks-app/](https://mitkoarsov.github.io/drinks-app/)
