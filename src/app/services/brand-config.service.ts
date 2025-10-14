import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject } from 'rxjs';

export interface BrandConfig {
  name: string;
  appName: string;
  logoUrl: string;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  apiBaseUrl: string;
  defaultLanguage: string;
  features: {
    search: boolean;
    filters: boolean;
    pagination: boolean;
    [key: string]: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class BrandConfigService {
  private brands: BrandConfig[] = [];
  private selectedBrandSubject = new BehaviorSubject<BrandConfig | null>(null);
  selectedBrand$ = this.selectedBrandSubject.asObservable();

  constructor(private http: HttpClient) {}

  async loadBrands(): Promise<BrandConfig[]> {
    if (this.brands.length) return this.brands;
  const brandFiles = ['brands/clasico.json', 'brands/country.json', 'brands/dolce.json'];
    const results = await Promise.all(
      brandFiles.map((file) => firstValueFrom(this.http.get<BrandConfig>(file))),
    );
    this.brands = results;
    // Set initial selected brand if not set
    if (!this.selectedBrandSubject.value && results.length) {
      this.selectedBrandSubject.next(results[0]);
    }
    return this.brands;
  }

  setSelectedBrand(brand: BrandConfig) {
    this.selectedBrandSubject.next(brand);
  }

  getSelectedBrand(): BrandConfig | null {
    return this.selectedBrandSubject.value;
  }

  getBrands(): BrandConfig[] {
    return this.brands;
  }
}
