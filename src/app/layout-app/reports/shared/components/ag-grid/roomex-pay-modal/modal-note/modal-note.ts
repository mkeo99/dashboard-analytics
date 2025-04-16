import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ICellRenderer, ICellRendererParams } from '@ag-grid-community/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RoomexPayReportData } from '@app/layout-app/reports/shared';
import { ModalContentComponent } from '@app/shared';

@Component({
  selector: 'rx-modal-note',
  templateUrl: './modal-note.html',
  styleUrls: ['./modal-note.scss'],
})
export class ModalNoteComponent implements ICellRenderer {
  @ViewChild('modalContent', { read: TemplateRef, static: true })
  private modalContent: TemplateRef<ModalContentComponent>;
  public params: ICellRendererParams;
  commentIcon = faCommentAlt;
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
