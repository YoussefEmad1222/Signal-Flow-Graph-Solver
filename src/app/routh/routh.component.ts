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
  cols:any;
  entered: boolean = false;
  table: any;
  state: string= 'stable';
  changes: number = 0;
  solved: boolean = false;

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
    let routh = new RouthHerwitzComponent(coff);

    let result:[number, Array<string[]>] = routh.Solve();

    console.log(result[1][0].length);
    this.cols = new Array(result[1][0].length);
    for (let i = 0; i < result[1][0].length; i++) {
      this.cols[i] = i;
    }
    this.table = result[1];
    this.state = result[0] == 0 ? 'stable' : 'unstable';
    this.changes = result[0];
    this.solved = true;
  }
}
