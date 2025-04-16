import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'rx-pagination-controls',
  templateUrl: './pagination-controls.component.html',
  styleUrls: ['./pagination-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationControlsComponent implements OnInit, OnChanges {
  @Input() length: number;
  @Input() currentPage: number;
  @Input() showPageSizeOptions: boolean;
  @Input() filteredRows: number;
  @Output() changePageView = new EventEmitter<number>();
  @Output() changePageSize = new EventEmitter<number>();
  pageSizeOptions: number[] = [20, 50, 100]; // Default
  @Input() pageSize: number = this.pageSizeOptions[0];
  isFiltering: boolean;
  totalItems: number;
  numberOfPages: number;
  range: number[];

  ngOnInit() {
    this.renderPaginationRange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filteredRows.firstChange) {
      this.isFiltering = true;
      this.renderPaginationRange();
    }
    if (changes.filteredRows.currentValue === this.length) {
      this.isFiltering = false;
    }
  }

  goToPageNum(pageNum: number) {
    if (pageNum === this.currentPage) {
      return;
    }
    this.currentPage = pageNum;
    this.changePageView.emit(this.currentPage);
  }

  renderPaginationRange() {
    if (!this.isFiltering) {
      this.numberOfPages = Math.ceil(this.length / this.pageSize);
      this.totalItems = this.length;
    } else {
      this.numberOfPages = Math.ceil(this.filteredRows / this.pageSize);
      this.totalItems = this.filteredRows;
    }
    this.range = [...Array(this.numberOfPages).keys()];
  }

  onPageSizeChanged(event: { target: { value: string } }) {
    this.changePageSize.emit(Number(event.target.value));
    this.currentPage = 1;
    this.renderPaginationRange();
  }
}
