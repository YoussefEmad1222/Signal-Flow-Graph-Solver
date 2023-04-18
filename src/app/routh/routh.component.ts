import { Component } from '@angular/core';

@Component({
  selector: 'app-routh',
  templateUrl: './routh.component.html',
  styleUrls: ['./routh.component.css'],
})
export class RouthComponent {
  numInputs: any;
  values: number[] = [];
  entered: boolean = false;
  table: any;
  takeinput(value: any) {
    if (this.entered) {
      this.values = [];
      this.numInputs = 0;
      this.entered = false;
    }
    if (value == '' || value == null || value == undefined) {
      return;
    }
    this.numInputs = +value;
    this.numInputs += 1;
    console.log('generated');
    console.log(this.numInputs);
    let number = new Array(this.numInputs);
    this.values = number;
    for (let i = 0; i < this.numInputs; i++) {
      number[i] = i;
    }
    this.entered = true;
  }
  takeInput(value: any,index: any) {
   this.values[index] = +value;
  }
   solve() {
    console.log(this.values);
    this.table = new Array(this.numInputs);
    for (let i = 0; i < this.numInputs; i++) {
      this.table[i] = new Array(3);
      this.table[i].fill(0);
    }
  }
}
