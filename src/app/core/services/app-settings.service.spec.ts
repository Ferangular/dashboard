import { TestBed } from '@angular/core/testing';
import { AppSettingsService } from './app-settings.service';

describe('AppSettingsService', () => {
  let service: AppSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSettingsService],
    });
    service = TestBed.inject(AppSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have config method', () => {
    expect(service.config).toBeDefined();
  });

  it('should return app configuration', () => {
    const config = service.config;
    expect(config).toBeDefined();
    expect(config.appName).toBeDefined();
    expect(config.logo).toBeDefined();
  });
});
