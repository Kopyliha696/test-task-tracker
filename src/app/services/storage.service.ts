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
  get(key: string) {
    const item = localStorage.getItem(key);

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
  set(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
