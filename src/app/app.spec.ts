import { TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';

import { App } from './app';
import { AccessibilityWidgetComponent } from './components/accessibility-widget.component/accessibility-widget.component';
import { AppSettingsService } from './core/services/app-settings.service';
import { SidebarService } from './core/services/sidebar.service';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { SidebarComponent } from './shared/components/layout/sidebar/sidebar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        RouterOutlet,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        AccessibilityWidgetComponent,
      ],
      providers: [AppSettingsService, SidebarService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as App;
    expect(app).toBeTruthy();
  });

  it('should have isFooterVisible signal', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as App;
    expect(app.isFooterVisible()).toBeDefined();
  });

  it('should toggle footer visibility', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as App;
    const initialState = app.isFooterVisible();
    app.toggleFooter();
    expect(app.isFooterVisible()).toBe(!initialState);
  });
});
