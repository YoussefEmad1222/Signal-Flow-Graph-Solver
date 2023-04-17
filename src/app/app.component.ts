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
      defaultLink: new joint.shapes.standard.Link(),
      linkPinning: false,
      validateConnection: function (
        cellViewS: any,
        magnetS: any,
        cellViewT: any,
        magnetT: any,
        end: any,
        linkView: any
      ) {
        // Prevent linking from input ports.
        if (magnetS && magnetS.getAttribute('port-group') === 'in')
          return false;
        // Prevent linking from output ports to input ports within one element.
        if (
          cellViewS === cellViewT &&
          magnetS.getAttribute('port-group') === 'out' &&
          magnetT.getAttribute('port-group') === 'in'
        )
          return false;
        // Prevent linking to input ports.
        return magnetT && magnetT.getAttribute('port-group') === 'in';
      },
    });
    let node = new joint.shapes.standard.Circle();
    node.position(100, 30);
    node.resize(75, 75);
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
    node2.resize(75, 75);
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

    var port1 = {
      label: {
        position: {
          name: 'left',
        },
        markup: [
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
      },
      attrs: {
        portBody: {
          magnet: true,
          r: 10,
          fill: '#023047',
          stroke: '#023047',
        },
      },
      markup: [
        {
          tagName: 'circle',
          selector: 'portBody',
        },
      ],
    };
    var port2 = {
      label: {
        position: {
          name: 'right',
        },
        markup: [
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
      },
      attrs: {
        portBody: {
          magnet: true,
          r: 10,
          fill: '#023047',
          stroke: '#023047',
        },
      },
      markup: [
        {
          tagName: 'circle',
          selector: 'portBody',
        },
      ],
    };
    node.addPort(port1);
    node2.addPort(port2);
    node.addTo(this.graph);
    node2.addTo(this.graph);

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
      console.log(elementView.model.attributes.position);
    });
    paper.on('link:mouseenter', function (linkView: any) {
      linkView.showTools();
    });
    paper.on('link:mouseleave', function (linkView: any) {
      linkView.hideTools();
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
