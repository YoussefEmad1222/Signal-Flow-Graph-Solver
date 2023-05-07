import { DeclareFunctionStmt } from "@angular/compiler";
import { node } from "./graph/node";
import { inArray } from "jquery";

export class operations{
    private adjlist = new Map<string , node[] | undefined>()
    private pathlist : String[][]
    private pathgain : String[][]
    private temppathlist : String[][]
    private temppathgain : String[][]
    private loopslist : String[][]
    private loopsgain : String[][]
    private nontouchingloops : number[][]
    private deltas : String[]
    constructor(adjlist :Map<string , node[] | undefined>){
        this.adjlist = adjlist;
        this.pathgain = [];
        this.pathlist = [];
        this.loopslist = [];
        this.loopsgain = [];
        this.nontouchingloops = [];
        this.temppathgain = [];
        this.temppathlist = [];
        this.deltas = [];
    }


    getforwardpathes(source : string , distinaton : string) : String[][]{
        this.getpathes(source , distinaton);
        this.pathlist = this.temppathlist;
        this.pathgain = this.temppathgain;
        this.temppathgain = [];
        this.temppathlist = [];
        return this.pathlist;
    }

    getforwardgains(source : string , distinaton : string) : String[][]{
        this.pathlist = this.getforwardpathes(source , distinaton);
        return this.pathgain;
    }

    getpathes(source : string , distinaton : string){
        var visited = new Map<string, Boolean | undefined>();

        this.adjlist.forEach((value: node[] | undefined, key: string) => {
            visited.set(key, false);
        });

        var path = [] , gain  =Array<String>();
        path.push(source);
        this.dfs(source , distinaton , visited , path , gain);
    }

    dfs(vertex : string , distinaton : string , visited :Map<string , Boolean | undefined> , path : any[] , gain : any[] ){
        if(vertex == distinaton){
            const pathFound = path.slice();
            const gainFound = gain.slice();
            this.temppathlist.push(pathFound);
            this.temppathgain.push(gainFound );
        }else
        {
            visited.set(vertex , true);
            if(this.adjlist.get(vertex) != null){
                for(let child of this.adjlist.get(vertex) as node[] ){
                    var c = child.name  , v = child.weight;
                    if(c != vertex && !visited.get(c)){

                        path.push(c);
                        gain.push(v);
                        this.dfs(c , distinaton , visited , path , gain);
                        path.pop();
                        gain.pop();
                    }
                }

            }
            visited.set(vertex , false);
        }
    }



    getcycles(){

        var tempadjlist = this.adjlist;
        this.adjlist.forEach((value: node[] | undefined, key: string) => {

            var child_list = value as node[];
            for( let child of child_list){
                var c = child.name , v = child.weight;
                if(c == key){
                    this.loopslist.push([c]);
                    this.loopsgain.push([v]);
                }else{
                    this.getpathes(c , key);
                    for(let i = 0 ; i < this.temppathlist.length ; i++){
                        var templist = Array<String>();
                        templist.push( key );
                        for(let j = 0 ; j <  this.temppathlist[i].length;j++){
                            templist.push(this.temppathlist[i][j]);
                        }
                        this.loopslist.push(templist);
                    }
                    for(let i = 0 ; i < this.temppathgain.length ; i++){
                        var templist = Array<String>();
                        templist.push(v);
                        for(let j = 0 ; j <  this.temppathgain[i].length;j++){
                            templist.push(this.temppathgain[i][j]);
                        }
                        this.loopsgain.push(templist);
                    }
                    this.temppathgain = [];
                    this.temppathlist = [];
                }

            }
            this.adjlist.delete(key);
        });
        this.adjlist = tempadjlist;
    }

    getcycleslist() : String[][]{
        return this.loopslist;
    }

    getcyclesgain() : String[][]{
        return this.loopsgain;
    }

    calc_nontouchingloops(){
        for(let i = 0 ; i <  this.loopslist.length ; i++){
            var touchinglist =Array<number>();

            for(let j = 0 ; j < this.loopslist[i].length;  j++){
                for( let x  = 0 ; x < this.loopslist.length ; x++){
                    for(let y = 0 ; y < this.loopslist[x].length;y++){
                        if(this.loopslist[i][j] == this.loopslist[x][y] && x != i){
                            touchinglist.push(x);
                        }
                    }
                }
            }

            var nontouchinglist = Array<number>();

            for( let x  = 0 ; x < this.loopslist.length ; x++){
                var temp = true;
                for(let y = 0 ; y < touchinglist.length;y++){
                    if(x == touchinglist[y] ){
                        temp = false;
                    }
                }

                if(temp){
                    nontouchinglist.push(x);
                }
            }

            this.nontouchingloops.push(nontouchinglist);
        }
    }

    getnontouchingloops(){
        return this.nontouchingloops;
    }

    helpingFind_nontouching(n :  number)  : number[][]{
        this.nontouchingloops = [];
        let nodeMap = new Map<String, number>();
        let loops: number[] = [];
        for (let i = 0; i < this.loopslist.length; i++) {
          this.getPartial(i, n, loops, nodeMap);
        }
        return this.nontouchingloops;
    }
    getPartial(i: number, n: number, loops: number[], nodeMap: Map<String, number>) {
        let left = n - 1;
        let currentLoop = this.loopslist[i];
        let nodes = new Map(nodeMap);

        let loopsNums = loops.slice();
        loopsNums.push(i);
        if (left == 0) {
            this.nontouchingloops.push(loopsNums);
            return;
        }

        for (let i = 0; i < currentLoop.length; i++) {
            nodes.set(currentLoop[i], 1);
        }


        for (let j = i + 1; j < this.loopslist.length; j++) {
            let flag = true;
            let toCheck = this.loopslist[j];

            for (let x = 0; x < toCheck.length; x++) {
                if (nodes.has(toCheck[x])) {
                flag = false;
                break;
                }
            }
            if (flag) {
                this.getPartial(j, left, loopsNums, nodes);
            }
        }
    }


    denominator(){
        var s = "1 ";
        if(this.loopslist.length){
            s += "- (";
        }
        for(let i = 0 ; i <  this.loopslist.length ; i++){
            for(let j = 0 ; j < this.loopsgain[i].length ; j++){
                s += this.loopsgain[i][j];
                if(j != this.loopsgain[i].length-1){
                    s+= "*";
                }else if(i != this.loopslist.length -1){
                    s+= "+";
                }
            }
            if(i == this.loopslist.length -1){
                s += ")"
            }
        }

        let i = 2;
        while (true) {
          let array =this.helpingFind_nontouching(i);
          if (array.length == 0) break;
          var s2 = "(";
          for(let i = 0; i <  array.length ; i++){
            for(let x = 0 ; x <  array[i].length ; x++){
                for(let j = 0 ; j < this.loopsgain[array[i][x]].length ; j++){
                    s2 += this.loopsgain[array[i][x]][j];
                    if(j != this.loopsgain[array[i][x]].length-1 || (j == this.loopsgain[array[i][x]].length-1 && x!= array[i].length-1)){
                        s2+= "*";
                    }
                }
                if(x == array[i].length-1 && i != array.length-1){
                    s2 += "+ ";
                }
            }
            if(i == array.length -1 ){
                s2+= ")";
            }else{

            }
          }
          if(s2.length>0){
            if (i%2)
              s += "- " + s2;
            else
              s += "+ " + s2;
          }
          i++;
        }

        return s;

    }

    numerator(){
        var  loops = this.loopslist;
        var gain = this.loopsgain;
        var s = "";
        for(var i = 0; i < this.pathlist.length ; i++)
        {
            this.loopslist = [];
            this.loopsgain = [];
            s+= "("
            for(var x = 0 ; x <  this.pathgain[i].length; x++){
              if(x===this.pathgain[i].length-1){
                s+= this.pathgain[i][x];
              }
              else s+= this.pathgain[i][x]+ "*";
            }
            s += ")"

            for(var x = 0; x < loops.length; x++){
                var t = true;
                for(var y = 0 ; y < loops[x].length; y++){
                    for(var j = 0 ; j < this.pathlist[i].length; j++){
                        if(loops[x][y] === this.pathlist[i][j]){
                            t = false;
                        }
                    }
                }
                if(t){
                    this.loopslist.push(loops[x]);
                    this.loopsgain.push(gain[x]);
                }
            }
            if(this.loopslist.length >= 1){
                s+= "*(" + this.denominator() + ") ";
                this.deltas.push(this.denominator());
            }else{
                this.deltas.push("1");
            }
            if(i != this.pathlist.length-1){
                s+= "+ ";
            }
        }
        return s;



    }

    getdeltas(){
        return this.deltas;
    }


}
