import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { ButtonComponent } from './button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [SpinnerComponent, HeaderComponent, ButtonComponent],
  declarations: [SpinnerComponent, HeaderComponent, ButtonComponent],
})
export class SharedModule {}
