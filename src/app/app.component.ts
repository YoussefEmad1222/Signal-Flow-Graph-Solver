import { Component } from '@angular/core';
//import * as joint from 'jointjs';
const joint = require('jointjs/dist/joint.js');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
}
