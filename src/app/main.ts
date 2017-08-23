import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/operator/filter';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
