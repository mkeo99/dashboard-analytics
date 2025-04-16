import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { QuickFilterComponent } from './quick-filter.component';

@NgModule({
  imports: [SharedModule],
  declarations: [QuickFilterComponent],
  exports: [QuickFilterComponent],
})
export class QuickFilterModule {}
