import { Component } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
//import * as joint from 'jointjs';
const joint = require('jointjs/dist/joint.js');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public nodeCr: string = '';
  public start: string = '';
  public end: string = '';
  public graph: any;
  ngOnit() {
    this.graph = new joint.dia.Graph();
    let paper = new joint.dia.Paper({
      el: jQuery('#draw'),
      width: innerWidth + 100,
      height: innerHeight + 100,
      gridSize: 10,
      model: this.graph,
    });
    let node = new joint.shapes.basic.Rect({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 30 },
      attrs: {
        rect: { fill: 'blue' },
        text: { text: 'my box', fill: 'white' },
      },
    });
    this.graph.addCell(node);
    let node2 = node.clone();
    node2.translate(300);
    this.graph.addCell(node2);
    let link = new joint.dia.Link({
      source: { id: node.id },
      target: { id: node2.id },
    });
    this.graph.addCells([node, node2, link]);
  }

  addNode() {
    this.nodeCr = '';
  }

  Solve(): any {
    this.start = '';
    this.end = '';
  }
}
