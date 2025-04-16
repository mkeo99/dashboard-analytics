import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';

import { AppVersionService } from '@core/services';

import { isPWA } from './core/utils';
import { IosModalComponent } from './shared';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'rx-clientsite-ui';

  constructor(
    private deviceService: DeviceDetectorService,
    private modalService: NgbModal,
    private readonly appVersionService: AppVersionService
  ) {}

  ngOnInit(): void {
    this.appVersionService.setAppVersion();
  }

  ngAfterViewInit(): void {
    this.openIosModal();
  }

  openIosModal() {
    const isIOS: boolean =
      this.deviceService.os === 'iOS' || this.deviceService.device === 'iPad';
    if (isIOS && !isPWA()) {
      this.modalService.open(IosModalComponent, {
        size: 'lg',
        centered: true,
        windowClass: 'ios-pwa-modal',
      });
    }
  }
}
