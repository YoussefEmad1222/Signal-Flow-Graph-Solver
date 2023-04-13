import { Component } from '@angular/core';
import Konva from 'konva';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'signal';
  stage: any;
  layer: any;
  public nodeCr: string = '';
  public edgeFromCr: string = '';
  public edgeToCr: string = '';
  public edgeValCr: string = '';
  public oldNodeName: string = '';
  public newNodeName: string = '';
  public edgeFrom: string = '';
  public edgeTo: string = '';
  public newEdgeVal: string = '';
  public start: string = '';
  public end: string = '';

  ngOnit() {
    this.stage = new Konva.Stage({
      container: 'draw',
      width: innerWidth,
      height: innerHeight,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }
  addEdge() {
    this.edgeFromCr = '';
    this.edgeToCr = '';
    this.edgeValCr = '';
  }
  addNode() {
    this.nodeCr = '';
  }
  editNode() {
    this.oldNodeName = '';
    this.newNodeName = '';
  }
  editEdge() {
    this.edgeFrom = '';
    this.edgeTo = '';
    this.newEdgeVal = '';
  }
  Solve(): any {
    this.start = '';
    this.end = '';
  }
}
