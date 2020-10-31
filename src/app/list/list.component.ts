import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public selectedToggle = true;
  public tempValues = [];
  public selectedProviders = [];
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];
  public test: number = 1
  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('selectedProviders')) {
      this.selectedToggle = JSON.parse(localStorage.getItem('selectedToggle'))
      this.selectedProviders = JSON.parse(localStorage.getItem('selectedProviders'))
    }
  }

  changeToggle() {
    if (this.selectedToggle === true) {
      for (let i of this.tempValues) {
        if (i !== false && !this.selectedProviders.includes(i)) {
          this.selectedProviders.push(i)
        }
      }
    }
    else {
      for (let i = 0; i < this.selectedProviders.length; i++) {
        if (this.tempValues.includes(this.selectedProviders[i])) {
          this.selectedProviders.splice(i, 1)
        }
      }
    }
    this.tempValues = []
    this.selectedToggle = !this.selectedToggle
    localStorage.setItem('selectedToggle', JSON.stringify(this.selectedToggle))

    localStorage.setItem('tempValues', JSON.stringify(this.tempValues))
    localStorage.setItem('selectedProviders', JSON.stringify(this.selectedProviders))
  }

  addProvider(provider, checked) {
    if (checked) {
      this.tempValues.push(provider)
    }
    else {
      for (let selectedTempValue = 0; selectedTempValue < this.tempValues.length; selectedTempValue++) {
        if (this.tempValues[selectedTempValue] === provider) {
          this.tempValues[selectedTempValue] = false
        }
      }

    }

  }

}
