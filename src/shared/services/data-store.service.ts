import { Injectable } from '@angular/core';

@Injectable()
export class DataStoreService {
  private key: string = "teslahome.energy.";

  // Setup our defaults
  constructor() {
    if(!this.kwhPrice) {
      this.kwhPrice = 0.13;
    }

    if(!this.amps) {
      this.amps = 50;
    }

    if(!this.voltage) {
      this.voltage = 240;
    }

    if(!this.hours) {
      this.hours = 5;
    }

    if(!this.minutes) {
      this.minutes = 0;
    }

    if(!this.selectedOption) {
      this.selectedOption = 'Time';
    }

    if(!this.distance) {
      this.distance = 150;
    }
  }

  get kwhPrice(): number {
    return Number.parseFloat(localStorage.getItem(this.key + "kwhPrice"));
  }

  set kwhPrice(value: number) {
    localStorage.setItem(this.key + "kwhPrice", '' + value);
  }


  get amps(): number {
    return Number.parseFloat(localStorage.getItem(this.key + "amps"));
  }

  set amps(value: number) {
    localStorage.setItem(this.key + "amps", '' + value);
  }


  get voltage(): number {
    return Number.parseFloat(localStorage.getItem(this.key + "voltage"));
  }

  set voltage(value: number) {
    localStorage.setItem(this.key + "voltage", '' + value);
  }


  get hours(): number {
    return Number.parseFloat(localStorage.getItem(this.key + "hours"));
  }

  set hours(value: number) {
    localStorage.setItem(this.key + "hours", '' + value);
  }


  get minutes(): number {
    return Number.parseFloat(localStorage.getItem(this.key + "minutes"));
  }

  set minutes(value: number) {
    localStorage.setItem(this.key + "minutes", '' + value);
  }

  get selectedOption(): string {
    return localStorage.getItem(this.key + "selectedOption");
  }

  set selectedOption(value: string) {
    if (value == 'Time' || value == 'Distance') {
      localStorage.setItem(this.key + "selectedOption", value);
    }
  }

  get distance(): number {
    return Number.parseFloat(localStorage.getItem(this.key + "distance"));
  }

  set distance(value: number) {
    localStorage.setItem(this.key + "distance", '' + value);
  }

}
