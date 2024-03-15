import { Injectable } from '@angular/core';

/**
 * Storage service
 *
 */
@Injectable()
export class StorageService {
  /**
   * Gets object from storage by key
   *
   * @param key object key
   */
  get(key: string): string {
    const item: string | null = localStorage.getItem(key);

    if (item !== null) {
      return item;
    }

    throw new Error('No data found');
  }

  /**
   * Sets object in storage
   *
   * @param key object key
   * @param data data to save
   */
  set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
