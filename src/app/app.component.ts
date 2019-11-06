import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  kwhPrice: number = 0.09;
  amps: number = 50;
  voltage: number = 240;
  hours: number = 2;
  minutes: number = 15;

  get calculatedPrice(): number {
    // amps * volts = watts
    // (watts / 1000) * kwhPrice * (hours + minutes)
    return ((this.amps * this.voltage) / 1000) * this.kwhPrice * (this.hours + (this.minutes / 60));
  }


  get maxMilesPerHourChargeRate(): string {
    // 50 * 240 = 12000 = 34mph = 0.0028333333333333‬
    return Number.parseFloat('' + this.amps * this.voltage * 0.0028333333333333).toFixed(1);
  }

  get minMilesPerHourChargeRate(): string {
    // 15 * 120 = 1800 = 4mph = 0.0022222222222222
    return Number.parseFloat('' + this.amps * this.voltage * 0.0022222222222222).toFixed(1);
  }

  get maxMilesAddedPerHour() {
    return Number.parseFloat('' + (this.hours + (this.minutes / 60)) * Number(this.maxMilesPerHourChargeRate)).toFixed(0);
  }

  get minMilesAddedPerHour() {
    return Number.parseFloat('' + (this.hours + (this.minutes / 60)) * Number(this.minMilesPerHourChargeRate)).toFixed(0);
  }


  nema1450() {
    this.amps = 50;
    this.voltage = 240;
  }

  amp(amps: number) {
    this.amps = amps;
    this.voltage = 120;
  }

  teslaWallCharger() {
    this.amps = 80;
    this.voltage = 240;
  }
}
