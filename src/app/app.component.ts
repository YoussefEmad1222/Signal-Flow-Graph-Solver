import { Component } from '@angular/core';
import { Model } from 'backbone';
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
  public paper: any;
  public model: any;
  ngOnInit() {
    let namespace = joint.shapes;
    this.graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    this.paper = new joint.dia.Paper({
      el: document.getElementById('draw'),
      width: innerWidth,
      height: innerHeight,
      gridSize: 1,
      model: this.graph,
      cellViewNamespace: namespace,
      linkPinning: false, // Prevent link being dropped in blank paper area
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
        // Prevent linking from output ports to input ports within one element
        if (cellViewS === cellViewT) return false;
        // Prevent linking to output ports
        return magnetT && magnetT.getAttribute('port-group') === 'in';
      },
      validateMagnet: function (cellView: any, magnet: any) {
        // Note that this is the default behaviour. It is shown for reference purposes.
        // Disable linking interaction for magnets marked as passive
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
          r: 7,
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
          r: 7,
          fill: '#E6A502',
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

    var model = (this.model = new joint.shapes.standard.Circle({
      position: { x: 125, y: 50 },
      size: { width: 90, height: 90 },
      attrs: {
        root: {
          magnet: false,
        },
        body: {
          fill: '#8ECAE6',
        },
        label: {
          text: 'R(s)',
          fontSize: 16,
          y: -10,
        },
      },
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

    var model2 = model.clone().translate(300, 0).attr('label/text', 'C(s)');

    this.graph.addCells(model, model2);

    // Register events
    this.paper.on('link:mouseenter', (linkView: any) => {
      showLinkTools(linkView);
    });

    this.paper.on('link:mouseleave', (linkView: any) => {
      linkView.removeTools();
    });

    // Actions
    function showLinkTools(linkView: any) {
      var tools = new joint.dia.ToolsView({
        tools: [
          new joint.linkTools.Remove({
            distance: '50%',
            markup: [
              {
                tagName: 'circle',
                selector: 'button',
                attributes: {
                  r: 7,
                  fill: '#f6f6f6',
                  stroke: '#ff5148',
                  'stroke-width': 2,
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
        ],
      });
      linkView.addTools(tools);
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
    this.paper.on('blank:pointerdown', (evt: any, x: any, y: any) => {
      if (this.nodeCr === '') return;
      let circ = this.model
        .clone()
        .translate(x, y)
        .attr('label/text', this.nodeCr);
      circ.size(50, 50);
      circ.addTo(this.graph);
      let toolsView = new joint.dia.ToolsView({
        tools: [new joint.elementTools.Remove()],
      });
      let elementView = circ.findView(this.paper);
      elementView.addTools(toolsView);
      elementView.hideTools();
      this.nodeCr = '';
    });
  }

  Solve(): any {
    this.start = '';
    this.end = '';
  }
}
