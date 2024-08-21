import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { ToastComponent } from './components/toast/toast.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FormatDateTimePipe } from './pipes/format-date-time.pipe';


@NgModule({
  declarations: [
    DeleteModalComponent,
    ImageUploadComponent,
    PaginatorComponent,
    EmptyListComponent,
    ToastComponent,
    SafeHtmlPipe,
    FormatDateTimePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    DeleteModalComponent,
    ImageUploadComponent,
    PaginatorComponent,
    EmptyListComponent,
    ToastComponent,
    SafeHtmlPipe,
    FormatDateTimePipe
  ]
})
export class SharedModule { }
