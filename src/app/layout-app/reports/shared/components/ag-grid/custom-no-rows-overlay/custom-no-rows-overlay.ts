import { ChangeDetectionStrategy, Component } from '@angular/core';

import { INoRowsOverlayParams } from '@ag-grid-community/core';

@Component({
  selector: 'rx-custom-ag-no-rows',
  templateUrl: './custom-no-rows-overlay.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomNoRowsOverlayComponent {
  // tslint:disable-next-line:no-any
  public params: INoRowsOverlayParams | any; // Ag-Grid ticket - AG-3353	Standardize all callbacks

  agInit(params: INoRowsOverlayParams): void {
    this.params = params;
  }

  get hasAnyColumnsVisible(): boolean {
    return (
      this.params &&
      !!this.params.api.columnController.allDisplayedColumns.length
    );
  }
}
