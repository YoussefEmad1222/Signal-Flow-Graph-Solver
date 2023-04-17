import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public nodeCr: string = '';
  public start: string = '';
  public end: string = '';

  ngOnit() {}

  addNode() {
    this.nodeCr = '';
  }

  Solve(): any {
    this.start = '';
    this.end = '';
  }
}
