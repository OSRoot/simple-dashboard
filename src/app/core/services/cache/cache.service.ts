import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, any> = new Map();

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, data: any): void {
    this.cache.set(key, data);
  }

  clear(): void {
    this.cache.clear();
  }
}
