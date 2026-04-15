// This file is required for Vitest and loads recursively all the .spec files

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import 'zone.js/testing';

// Initialize the Angular testing environment for Vitest
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Import all spec files
const specFiles = import.meta.glob('./**/*.spec.ts');
for (const path in specFiles) {
  specFiles[path]();
}
