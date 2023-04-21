import { Component } from '@angular/core';
import { RouthHerwitzComponent } from 'app/routh-herwitz/routh-herwitz.component';

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
    this.table = new Array(this.numInputs);
    for (let i = 0; i < this.numInputs; i++) {
      this.table[i] = new Array(3);
      this.table[i].fill(0);
    }
  }
  takeInput(value: any, index: any) {
    this.values[index] = +value;
  }
  solve() {
    let coff = new Array(this.numInputs);
    for (let i = 0; i < this.numInputs; i++) {
      coff[i] = this.values[i];
    }
    let routh = new RouthHerwitzComponent([ 40, 100, 60, 90, 70, 40]);
    let result=routh.Solve();
    console.log(result);


  }
}
