import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CurrencyFacade } from './shared/state/facades/currency.facade';

@Component({
  selector: 'rx-layout-app',
  templateUrl: './layout-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAppComponent implements OnInit {
  constructor(private currencyFacade: CurrencyFacade) {}
  ngOnInit() {
    this.currencyFacade.loadList();
  }
}
