import { Component } from '@angular/core';
import { DataStoreService } from '../shared/services/data-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dataStoreService: DataStoreService) {

  }

  private hoursNeeded(): number {
    let hoursNeeded: number = 0;
    if (this.dataStoreService.selectedOption == 'Time') {
      hoursNeeded = (this.dataStoreService.hours + (this.dataStoreService.minutes / 60));
    }
    else {
      let min: number = Number.parseFloat(this.minMilesPerHourChargeRate);
      let max: number = Number.parseFloat(this.maxMilesPerHourChargeRate);
      hoursNeeded = this.dataStoreService.distance / ((max + min) / 2);
    }

    return hoursNeeded;
  }

  get calculatedPrice(): string {
    // amps * volts = watts
    // (watts / 1000) * kwhPrice * (hours + minutes) * 0.8 (efficiency)
    return '' + ((this.dataStoreService.amps * this.dataStoreService.voltage) / 1000) * 0.8 * this.dataStoreService.kwhPrice * this.hoursNeeded();
  }

  get hoursToCharge(): string {
    if (this.dataStoreService.selectedOption == 'Time') {
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
    let value = this.dataStoreService.amps * this.dataStoreService.voltage * 0.0028333333333333;

    if(this.dataStoreService.distanceType == 'Kilometers') {
      value *= 1.609;
    }

    return Number.parseFloat('' + value).toFixed(1);

  }

  get minMilesPerHourChargeRate(): string {
    // 15 * 120 = 1800 = 4mph = 0.0022222222222222
    let value = this.dataStoreService.amps * this.dataStoreService.voltage * 0.0022222222222222;

    if(this.dataStoreService.distanceType == 'Kilometers') {
      value *= 1.609;
    }

    return Number.parseFloat('' + value).toFixed(1);
  }

  get maxMilesAddedPerHour() {
    return Number.parseFloat('' + (this.dataStoreService.hours + (this.dataStoreService.minutes / 60)) * Number(this.maxMilesPerHourChargeRate)).toFixed(0);
  }

  get minMilesAddedPerHour() {
    return Number.parseFloat('' + (this.dataStoreService.hours + (this.dataStoreService.minutes / 60)) * Number(this.minMilesPerHourChargeRate)).toFixed(0);
  }

  get outletDescription(): string {
    if(this.dataStoreService.amps == 80 && this.dataStoreService.voltage == 240) {
      return "Tesla Wall Charger"
    }
    else if (this.dataStoreService.amps == 50 && this.dataStoreService.voltage == 240) {
      return "NEMA 14-50 Outlet"
    }
    else if (this.dataStoreService.amps == 15 && this.dataStoreService.voltage == 120) {
      return "Standard Outlet"
    }
    else {
      return "Custom Outlet (" + this.dataStoreService.amps + " amps, " + this.dataStoreService.voltage +" volts)";
    }
  }

  nema1450() {
    this.dataStoreService.amps = 50;
    this.dataStoreService.voltage = 240;
  }

  amp(amps: number) {
    this.dataStoreService.amps = amps;
    this.dataStoreService.voltage = 120;
  }

  teslaWallCharger() {
    this.dataStoreService.amps = 80;
    this.dataStoreService.voltage = 240;
  }
}
