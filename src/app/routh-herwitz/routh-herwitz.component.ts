import { TypeofExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { ceil, floor, number, string } from 'mathjs';

@Component({
  selector: 'app-routh-herwitz',
  templateUrl: './routh-herwitz.component.html',
  styleUrls: ['./routh-herwitz.component.css']
})
export class RouthHerwitzComponent {
  private even: Array<string>;
  private odd: Array<string>;
  private steps: Array<string[]>;

  constructor(coff : Array<number>) {
    let even_start = coff.length%2==1;
    this.even = Array<string>(ceil(coff.length/2));
    this.odd = Array<string>(floor(coff.length/2));
    for (let i = 0; i < coff.length; i++) {
      if (even_start) this.even[i/2] = String(coff[i]);
      else this.odd[i/2] = String(coff[i]);
      even_start = !even_start;
    }
    this.steps = Array<string[]>(coff.length-1);
  }

  Solve() {
    let first: Array<string>, second: Array<string>;
    let done = false, alternate = false, all_real = true;
    let length = this.even.length + this.odd.length - 2, changes = 0, wanted = this.even.length - 1;
    if (this.even.length > this.odd.length) {
      first = this.even;
      second = this.odd;
    } else {
        first = this.odd;
        second = this.even;
        alternate = true;
    }
    for (let i=0; i < length && !done; i++) {
        if (parseFloat(first[0]) != Number(first[0]) && parseFloat(second[0]) != Number(second[0]) && Number(second[0])/Number(first[0]) < 0) changes++;
        if (alternate) wanted--;
        alternate = !alternate;
        var next : Array<string> = [];
        for (let j=1; j < wanted; j++) {
            let x = Number(second[0]) * Number(first[j]) - Number(second[j]) * Number(first[0]);
            if (Number(second[0]) != 0){
              x /= Number(second[0]);
              next[j-1] = String(x);
            } else if (parseFloat(second[j])==0||parseFloat(first[0])==0) {
              
            } else{
              next[j-1] = "";
              all_real = false;
            }
        }
        for (let j=wanted-1; j >= 0; j++) {
          if (Number(next[j]) == 0) {
            next[j] = "0";
            if (j == 0) {
              done = true;
              all_real = true;
            }
          } else break;
        }
        first = second;
        second = next;
    }
    if (all_real) return changes;
    return 0;
  }
}
