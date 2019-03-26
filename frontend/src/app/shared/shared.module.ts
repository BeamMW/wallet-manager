import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTitleComponent } from './components';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [
    StatusTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusTitleComponent
  ]
})
export class SharedModule { }
