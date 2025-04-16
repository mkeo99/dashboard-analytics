import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ModalNoteComponent } from './modal-note/modal-note';
import { ModalReceiptComponent } from './modal-receipt/modal-receipt';
import { RoomexPayFormComponent } from './roomex-pay-form/roomex-pay-form';

@NgModule({
  imports: [SharedModule],
  declarations: [
    ModalNoteComponent,
    ModalReceiptComponent,
    RoomexPayFormComponent,
  ],
  exports: [ModalNoteComponent, ModalReceiptComponent],
})
export class RoomexPayModalModule {}

export * from './modal-note/modal-note';
export * from './modal-receipt/modal-receipt';
