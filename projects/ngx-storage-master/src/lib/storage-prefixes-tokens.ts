import { InjectionToken } from '@angular/core';

/**
 * Injection token for prefixing values in localStorage. Provide this in the module you want to have a prefix for.
 */
export const LOCAL_STORAGE_PREFIX = new InjectionToken<string>('LOCAL_STORAGE_PREFIX');

/**
 * Injection token for prefixing values in sessionStorage. Provide this in the module you want to have a prefix for.
 */
export const SESSION_STORAGE_PREFIX = new InjectionToken<string>('SESSION_STORAGE_PREFIX');
