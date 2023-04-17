import { Component } from '@angular/core';
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
  ngOnInit() {
    let namespace = joint.shapes;
    this.graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    let paper = new joint.dia.Paper({
      el: document.getElementById('draw'),
      width: innerWidth,
      height: innerHeight,
      gridSize: 1,
      model: this.graph,
    });
    let node = new joint.shapes.standard.Circle();
    node.position(100, 30);
    node.resize(50, 50);
    node.attr({
      body: {
        fill: 'orange',
        stroke: 'black',
        strokeWidth: 2,
      },
      label: {
        text: 'R(s)',
        fill: 'white',
      },
    });

    let node2 = new joint.shapes.standard.Circle();
    node2.position(innerWidth - 400, 30);
    node2.resize(50, 50);
    node2.attr({
      body: {
        fill: 'green',
        stroke: 'black',
        strokeWidth: 2,
      },
      label: {
        text: 'C(s)',
        fill: 'white',
      },
    });
    this.graph.addCell(node);
    this.graph.addCell(node2);
    let toolview = new joint.dia.ToolsView({
      tools: [new joint.elementTools.Remove()],
    });
    let toolview2 = new joint.dia.ToolsView({
      tools: [new joint.elementTools.Remove()],
    });
    node.findView(paper).addTools(toolview);
    node2.findView(paper).addTools(toolview2);
    paper.on('element:mouseenter', function (elementView: any) {
      elementView.showTools();
    });
    paper.on('element:mouseleave', function (elementView: any) {
      elementView.hideTools();
    });
    paper.on('element:pointerclick', function (elementView: any) {
      console.log(elementView.model.attributes.attrs.label.text);
    });
    
  }
  addNode() {
    this.nodeCr = '';
  }

  Solve(): any {
    this.start = '';
    this.end = '';
  }
}
