/**
 * CREDIT: https://www.ag-grid.com/javascript-grid-cell-rendering-components/
 * Purpose: A cell rendering component for an ag-grid column field so that it displays a link and opens a modal
 * Example Ag-Grid implementation: { headerName: 'X', field: 'X', ----> cellRenderer: "modalLinkRenderer" <---- }
 */

import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ICellRenderer, ICellRendererParams } from '@ag-grid-community/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ModalContentComponent } from '@app/shared';

@Component({
  selector: 'child-cell',
  templateUrl: './modal-link-renderer.html',
  styleUrls: ['./modal-link-renderer.scss'],
})
export class ModalLinkRendererComponent implements ICellRenderer {
  @ViewChild('modalContent', { read: TemplateRef, static: true })
  private modalContent: TemplateRef<ModalContentComponent>;
  private modalRef: NgbModalRef;
  public params: ICellRendererParams;
  columnDefs = [];
  rowData = [];

  constructor(private modalService: NgbModal) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onOpenModal(event: MouseEvent) {
    event.preventDefault();
    this.modalRef = this.modalService.open(this.modalContent, {
      size: 'lg',
      windowClass: 'map-modal',
    });
  }

  onCloseModal() {
    this.modalRef.close();
  }

  refresh(): boolean {
    return false;
  }

  exportData() {}
}
