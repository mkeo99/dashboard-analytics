import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

import {
  Column,
  Constants,
  IHeaderGroup,
  IHeaderParams,
} from '@ag-grid-community/core';

// For further information: https://www.ag-grid.com/javascript-grid-header-rendering/
@Component({
  selector: 'rx-custom-ag-header',
  templateUrl: './custom-ag-header.html',
  styleUrls: ['./custom-ag-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAgGridHeaderComponent implements IHeaderGroup {
  public params: IHeaderParams;
  public filterActive = false;
  public filterVisible = false;

  constructor(private cd: ChangeDetectorRef) {}

  @ViewChild('filterButton', { read: ElementRef, static: false })
  public filterButton: ElementRef;

  @HostListener('mouseenter') onMouseEnter() {
    this.filterVisible = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.filterVisible = false;
  }

  @HostListener('click') onMouseClick() {
    this.changedSorting();
  }

  agInit(params: IHeaderParams): void {
    this.params = params;

    this.params.column.addEventListener(
      Column.EVENT_MENU_VISIBLE_CHANGED,
      this.setFilterActive.bind(this)
    );
  }

  onFilterButtonClicked($event: MouseEvent): void {
    $event.stopPropagation();
    this.params.showColumnMenu(this.filterButton.nativeElement);
  }

  changedSorting(): void {
    const sort = this.params.column.getSort();
    if (!sort) {
      this.params.setSort(Constants.SORT_DESC);
    } else if (sort === Constants.SORT_DESC) {
      this.params.setSort(Constants.SORT_ASC);
    } else if (sort === Constants.SORT_ASC) {
      this.params.setSort('');
    }
  }

  setFilterActive({ column }: IHeaderParams) {
    this.filterActive = column.isFilterActive() || column.isMenuVisible();
    this.cd.markForCheck();
  }

  public get sortIcon(): string {
    const sort = this.params.column.getSort();
    if (!sort) {
      return '';
    }
    return `ag-icon-${sort}`;
  }
}
