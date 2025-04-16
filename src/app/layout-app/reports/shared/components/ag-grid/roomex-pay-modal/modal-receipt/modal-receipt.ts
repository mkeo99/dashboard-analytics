import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ICellRenderer, ICellRendererParams } from '@ag-grid-community/core';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RoomexPayReportData } from '@app/layout-app/reports/shared';
import { ModalContentComponent } from '@app/shared';

@Component({
  selector: 'rx-modal-receipt',
  templateUrl: './modal-receipt.html',
  styleUrls: ['./modal-receipt.scss'],
})
export class ModalReceiptComponent implements ICellRenderer {
  @ViewChild('modalContent', { read: TemplateRef, static: true })
  private modalContent: TemplateRef<ModalContentComponent>;
  public params: ICellRendererParams;
  attachmentIcon = faPaperclip;
  rowData: RoomexPayReportData;

  constructor(private modalService: NgbModal) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.rowData = params.data as RoomexPayReportData;
  }

  onOpenModal(event: MouseEvent) {
    event.preventDefault();
    this.modalService.open(this.modalContent, {
      size: 'lg',
      windowClass: 'ag-grid-modal',
    });
  }

  onCloseModal() {
    this.modalService.dismissAll();
  }

  refresh(): boolean {
    return false;
  }
}
