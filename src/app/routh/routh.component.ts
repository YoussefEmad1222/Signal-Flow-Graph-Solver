import { Component } from '@angular/core';

@Component({
  selector: 'app-routh',
  templateUrl: './routh.component.html',
  styleUrls: ['./routh.component.css']
})
export class RouthComponent {
numInputs: any;
values:number[]=[];
entered:boolean=false;

takeinput(value:any) {
  this.numInputs = value;
  console.log("generated");
  console.log(this.numInputs);
  for (let i = 0; i < this.numInputs; i++) {
    this.values.push(i);
  }
  this.entered=true;
}

}
