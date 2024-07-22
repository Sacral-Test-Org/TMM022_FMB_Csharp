import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormInitializationComponent } from './form-initialization.component';

@NgModule({
  declarations: [FormInitializationComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormInitializationComponent]
})
export class FormInitializationModule { }
