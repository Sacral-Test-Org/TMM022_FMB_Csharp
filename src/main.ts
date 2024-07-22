import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Main entry point for Angular application
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));