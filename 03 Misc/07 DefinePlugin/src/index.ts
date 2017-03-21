import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StudentComponent } from './components/student/studentComponent';

@NgModule({
  declarations: [StudentComponent],
  imports: [BrowserModule],
  bootstrap: [StudentComponent],
})
class AppModule {

}

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

