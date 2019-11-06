import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  kwhPrice: number = 0.13;
  amps: number = 50;
  voltage: number = 240;
  hours: number = 5;
  minutes: number = 0;
  selectedOption: string = 'Time';
  distance: number = 150;

  private hoursNeeded(): number {
    let hoursNeeded: number = 0;
    if (this.selectedOption == 'Time') {
      hoursNeeded = (this.hours + (this.minutes / 60));
    }
    else {
      let min: number = Number.parseFloat(this.minMilesPerHourChargeRate);
      let max: number = Number.parseFloat(this.maxMilesPerHourChargeRate);
      hoursNeeded = this.distance / ((max + min) / 2);
    }

    return hoursNeeded;
  }

  get calculatedPrice(): string {
    // amps * volts = watts
    // (watts / 1000) * kwhPrice * (hours + minutes)


    return '' + ((this.amps * this.voltage) / 1000) * this.kwhPrice * this.hoursNeeded();
  }

  get hoursToCharge(): string {
    if (this.selectedOption == 'Time') {
      return '';
    }
    else {
      let hours = Math.floor(this.hoursNeeded());
      let minutes = Math.floor(60 * (this.hoursNeeded() - hours));

      return hours + "h, " + minutes + "m";
    }
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

  get outletDescription(): string {
    if(this.amps == 80 && this.voltage == 240) {
      return "Tesla Wall Charger"
    }
    else if (this.amps == 50 && this.voltage == 240) {
      return "NEMA 14-50 Outlet"
    }
    else if (this.amps == 15 && this.voltage == 120) {
      return "Standard Outlet"
    }
    else {
      return "Custom Outlet (" + this.amps + " amps, " + this.voltage +" volts)";
    }
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
