import { Component } from '@angular/core';
import { Model } from 'backbone';
//import * as joint from 'jointjs';
import { node } from './node';
const joint = require('jointjs/dist/joint.js');

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  title = 'Signal';
  graph: any;
  paper: any;
  id: number = 2;
  model: any;
  results: any = false;
  adjList: Map<string, node[] | undefined> | undefined;

  ngOnInit() {
    this.adjList = new Map<string, node[] | undefined>();
    this.graph = new joint.dia.Graph();
    this.paper = new joint.dia.Paper({
      el: document.getElementById('paper'),
      model: this.graph,
      width: innerWidth,
      height: innerHeight,
      snapLabels: true,
      background: {
        color: '#c4cbcb',
      },
      interactive: {
        linkMove: true,
      },
      linkPinning: false,
      defaultLink: () =>
        new joint.shapes.standard.Link({
          attrs: {
            wrapper: {
              cursor: 'default',
            },
          },
        }),
      defaultConnectionPoint: { name: 'boundary' },
      validateConnection: function (
        cellViewS: any,
        magnetS: any,
        cellViewT: any,
        magnetT: any,
        end: any,
        linkView: any
      ) {
        if (cellViewS === cellViewT) return false;
        return magnetT && magnetT.getAttribute('port-group') === 'in';
      },
      validateMagnet: function (cellView: any, magnet: any) {
        return magnet.getAttribute('magnet') !== 'passive';
      },
    });

    var portsIn = {
      position: {
        name: 'left',
      },
      attrs: {
        portBody: {
          magnet: 'passive',
          r: 5,
          fill: '#023047',
          stroke: '#023047',
        },
      },
      label: {
        position: {
          name: 'left',
          args: { y: 6 },
        },
        markup: [
          {
            tagName: 'text',
            selector: 'label',
            className: 'label-text',
          },
        ],
      },
      markup: [
        {
          tagName: 'circle',
          selector: 'portBody',
        },
      ],
    };

    var portsOut = {
      position: {
        name: 'right',
      },
      attrs: {
        portBody: {
          magnet: true,
          r: 5,
          fill: '#b0adc5',
          stroke: '#023047',
        },
      },
      label: {
        position: {
          name: 'right',
          args: { y: 6 },
        },
        markup: [
          {
            tagName: 'text',
            selector: 'label',
            className: 'label-text',
          },
        ],
      },
      markup: [
        {
          tagName: 'circle',
          selector: 'portBody',
        },
      ],
    };

    var model = (this.model = new joint.shapes.standard.Rectangle({
      position: { x: 200, y: 200 },
      size: { width: 60, height: 60 },
      attrs: {
        root: {
          magnet: false,
        },
        body: {
          fill: '#E74C3C',
          rx: 20,
          ry: 20,
          strokeWidth: 2,
        },
        label: {
          text: '1',
          fill: '#ECF0F1',
          fontSize: 18,
          fontVariant: 'Tahoma',
          fontWeight: 'bold',
        },
      },
      id: '1',
      ports: {
        groups: {
          in: portsIn,
          out: portsOut,
        },
      },
    }));

    model.addPorts([
      {
        group: 'in',
      },
      {
        group: 'out',
      },
    ]);
    this.graph.addCell(model);

    var model2 = model.clone().translate(300, 0).attr('label/text', '2');
    model2.set('id', '2');
    this.graph.addCell(model2);

    // Register events
    this.paper.on('link:mouseenter', (linkView: any) => {
      showLinkTools(linkView);
    });

    this.paper.on('link:mouseleave', (linkView: any) => {
      linkView.removeTools();
    });

    function showLinkTools(linkView: any) {
      var tools = new joint.dia.ToolsView({
        tools: [
          new joint.linkTools.Remove({
            distance: '30%',
            markup: [
              {
                tagName: 'circle',
                selector: 'button',
                attributes: {
                  r: 7,
                  fill: '#f6f6f6',
                  stroke: '#ff5148',
                  'stroke-width': 3,
                  cursor: 'pointer',
                },
              },
              {
                tagName: 'path',
                selector: 'icon',
                attributes: {
                  d: 'M -3 -3 3 3 M -3 3 3 -3',
                  fill: 'none',
                  stroke: '#ff5148',
                  'stroke-width': 2,
                  'pointer-events': 'none',
                },
              },
            ],
          }),
          new joint.linkTools.Vertices(),
          new joint.linkTools.Segments(),
        ],
      });

      linkView.addTools(tools);
      linkView.showTools();
    }

    var toolsView = new joint.dia.ToolsView({
      tools: [new joint.elementTools.Remove()],
    });

    var toolsView2 = new joint.dia.ToolsView({
      tools: [new joint.elementTools.Remove()],
    });

    var elementView = model.findView(this.paper);
    var elementView2 = model2.findView(this.paper);
    elementView.addTools(toolsView);
    elementView2.addTools(toolsView2);
    elementView.hideTools();
    elementView2.hideTools();

    this.paper.on('element:mouseenter', function (elementView: any) {
      elementView.showTools();
    });

    this.paper.on('element:mouseleave', function (elementView: any) {
      elementView.hideTools();
    });
  }

  addNode() {
    let newNode = this.model
      .clone()
      .translate(200, 200)
      .attr('label/text', this.id.toString());

    newNode.set('id', this.id.toString());
    newNode.size(60, 60);
    newNode.addTo(this.graph);
    let toolsView = new joint.dia.ToolsView({
      tools: [new joint.elementTools.Remove()],
    });
    let elementView = newNode.findView(this.paper);
    elementView.addTools(toolsView);
    elementView.hideTools();
    this.id++;
  }

  addLink() {
    let from = document.getElementById('from-in') as HTMLInputElement;
    let to = document.getElementById('to-in') as HTMLInputElement;
    let gain = document.getElementById('gain-in') as HTMLInputElement;
    let node1 = this.graph.getCell(from.value);
    let node2 = this.graph.getCell(to.value);
    let transferfn = gain.value;
    var connectedLinks1 = this.graph.getConnectedLinks(node1, {
      inbound: false,
      outbound: true,
    });

    var newNode: node = new node(to.value, gain.value);
    var arr: node[] | undefined;
    if (this.adjList?.get(from.value) === undefined) {
      arr = [];
      arr?.push(newNode);
      console.log('here');
      console.log(arr);
    } else {
      arr = this.adjList?.get(from.value);
      arr?.push(newNode);
    }

    this.adjList?.set(from.value, arr);

    var links = this.graph.getConnectedLinks(node1, { outbound: true });
    links = links.concat(
      this.graph.getConnectedLinks(node2, { inbound: true })
    );

    // Find the link that connects the two nodes
    var link = null;
    for (var i = 0; i < links.length; i++) {
      var sourceId = links[i].get('source').id;
      var targetId = links[i].get('target').id;
      if (
        (sourceId === node1.id && targetId === node2.id) ||
        (sourceId === node2.id && targetId === node1.id)
      ) {
        link = links[i];
        break;
      }
    }

    link.appendLabel({
      markup: [
        {
          tagName: 'circle',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        label: {
          text: transferfn,
          fill: '#b5654a',
          r: 20,
          fontSize: 23,
          fontWeight: 'bold',
          textAnchor: 'middle',
          yAlignment: 'middle',
          pointerEvents: 'none',
        },
        body: {
          ref: 'label',
          fill: '#ffffff',
          stroke: '#000000',
          strokeWidth: 2,
          r: 'calc(s)',
          cx: 0,
          cy: 0,
        },
        position: {
          distance: 0.7,
        },
      },
    });
    console.log(this.adjList);
  }

  solve() {
    this.results = true;
  }
}
