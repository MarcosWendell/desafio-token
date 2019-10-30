import { ApplyCssErrorComponent } from './apply-css-error/apply-css-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStyleComponent } from './card-style/card-style.component';

@NgModule({
  declarations: [ApplyCssErrorComponent, CardStyleComponent],
  imports: [CommonModule],
  exports: [ApplyCssErrorComponent, CardStyleComponent]
})
export class SharedModule {}
