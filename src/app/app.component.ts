import { Component } from '@angular/core';
import Konva from 'konva';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'signal';
  stage:any;
  layer:any;
  
  ngOnit(){
    this.stage = new Konva.Stage({
      container: 'draw',
      width: innerWidth,
      height: innerHeight,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }
  addEdge(from:any, to:any){
  }
  addNode(nodename:string){
  }
  deleteNode(nodename:string){
  }
  deleteEdge(from:any, to:any){
  }
  editNode(nodename:string){
  }
  editEdge(form:any ,to:any){
  }
  Solve(startNode:string, endNode:string):any{
    return null
  }

}
