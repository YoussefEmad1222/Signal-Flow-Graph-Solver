import { TypeofExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { abs, ceil, floor, number, string } from 'mathjs';

@Component({
  selector: 'app-routh-herwitz',
  templateUrl: './routh-herwitz.component.html',
  styleUrls: ['./routh-herwitz.component.css']
})
export class RouthHerwitzComponent {
  private first: Array<string>;
  private second: Array<string>;
  private steps: Array<string[]>;
  private done: number;

  constructor(coff : Array<number>) {
    let first_start = true;
    this.first = Array<string>(ceil(coff.length/2));
    this.second = Array<string>(ceil(coff.length/2));
    let step = Array<string>(ceil(coff.length/2));
    this.steps = Array<string[]>(coff.length);
    this.second[this.second.length-1] = "0";
    this.done = 0;
    for (let i = 0; i < step.length; i++) {
      this.first[i] = String(coff[i*2]);
      if (i*2!=coff.length-2) this.second[i] = String(coff[i*2+1]);
      if (this.second[i]=="0") this.done++;
      step[i] = "0"
    }
    for (let i = 0; i < coff.length; i++) this.steps[i] = step;
  }

  Solve() {
    let done = false, alternate = false, all_zero = true;
    let changes = 0, wanted = this.first.length - 1;
    this.first.length > this.second.length ? this.second[this.second.length-1] = "0" : alternate = true;
    if (this.second[0] == "0") this.second[0] = Number(this.first[0])>0 ? "p" : "n" ;
    else if (Number(this.second[0])/abs(Number(this.second[0]))!=Number(this.first[0])/abs(Number(this.first[0]))) changes++;
    this.steps[0] = this.first;
    if (this.done==this.second.length) return [changes, this.steps];
    this.steps[1] = this.second;
    for (let i=0; i < this.steps.length - 2 && !done; i++) {
      if (alternate) wanted--;
      alternate = !alternate;
      var next : Array<string> = [];
      for (let j=1; j < wanted; j++) {
        if (isNaN(Number(this.second[0]))) {
          if (isNaN(Number(this.second[j]))) {
            if (isNaN(Number(this.first[0]))) {
              if (isNaN(Number(this.first[j]))) {
                if (abs(this.first[0].charCodeAt(0)-this.second[0].charCodeAt(0))-abs(this.first[j].charCodeAt(0)-this.second[j].charCodeAt(0))<7&&abs(this.first[j].charCodeAt(0)-this.second[0].charCodeAt(0))<3) {
                  if (this.first[0]==this.second[j]&&this.first[j]==this.second[0]) next[j-1] = this.second[0].toLowerCase();
                  else if (this.first[0]!=this.second[j]&&this.first[j]!=this.second[0]) next[j-1] = this.second[0].toLowerCase();
                  else if (this.first[j]==this.second[0]) next[j-1] = this.second[0];
                  else if (this.second[0].toUpperCase()==this.second[0]) next[j-1] = this.second[0]=="N" ? "P" : "N" ;
                  else next[j-1] = this.second[0]=="n" ? "p" : "n" ;
                } else if (this.first[j].toUpperCase()==this.first[j]&&this.second[0].toUpperCase()==this.second[0]) next[j-1] = this.first[j];
                else if (this.first[0].toLowerCase()==this.first[0]&&this.second[j].toLowerCase()==this.second[j]) next[j-1] = this.first[j];
                else if (abs(this.first[j].charCodeAt(0)-this.second[0].charCodeAt(0))-abs(this.first[0].charCodeAt(0)-this.second[j].charCodeAt(0))<15) {
                  if (this.second[0].toUpperCase()==this.second[0]) {
                    if (this.first[0].toLowerCase()==this.second[j].toLowerCase()&&this.first[j]==this.second[0].toLowerCase()) next[j-1] = this.second[0].toLowerCase();
                    else if (this.first[0].toLowerCase()!=this.second[j].toLowerCase()&&this.first[j]!=this.second[0].toLowerCase()) next[j-1] = this.second[0].toLowerCase();
                    else if (this.first[j]==this.second[0].toLowerCase()) next[j-1] = this.second[0].toLowerCase();
                    else next[j-1] = this.second[0]=="N" ? "p" : "n" ;
                  } else {
                    if (this.first[0].toUpperCase()==this.second[j].toUpperCase()&&this.first[j]==this.second[0].toUpperCase()) next[j-1] = this.second[0].toUpperCase();
                    else if (this.first[0].toUpperCase()!=this.second[j].toUpperCase()&&this.first[j]!=this.second[0].toUpperCase()) next[j-1] = this.second[0].toUpperCase();
                    else if (this.first[j]==this.second[0].toUpperCase()) next[j-1] = this.second[0].toUpperCase();
                    else next[j-1] = this.second[0]=="n" ? "P" : "N" ;
                  }
                } else {
                  if (this.first[0].toUpperCase()==this.second[j].toUpperCase()) next[j-1] = this.second[0].toLowerCase()=="n" ? "P" : "N";
                  else next[j-1] = this.second[0].toLowerCase()=="p" ? "P" : "N";
                }
              } else {
                if (this.first[0].toUpperCase()==this.first[0]&&this.second[j].toUpperCase()==this.second[j]) {
                  if (this.first[0]==this.second[j]) next[j-1] = this.second[0]=="p" ? "N" : "P";
                  else next[j-1] = this.second[0]=="n" ? "N" : "P";
                } else if (this.first[0].toLowerCase()==this.first[0]&&this.second[j].toLowerCase()==this.second[j]) {
                  if (this.second[0].toUpperCase()==this.second[0]) next[j-1] = this.first[j]=="0" ? this.second[0].toLowerCase() : this.first[j];
                  else if (this.first[j]!="0") next[j-1] = this.first[j];
                  else {
                    if (this.first[0]==this.second[j]) next[j-1] = this.second[0]=="n" ? "p" : "n";
                    else next[j-1] = this.second[0]=="p" ? "p" : "n";
                  }
                } else {
                  if (this.first[j]!="0"&&this.second[0].toUpperCase()==this.second[0]) next[j-1] = this.first[j];
                  else if (this.second[0].toUpperCase()==this.second[0]) {
                    if (this.first[0].toLowerCase()==this.second[j].toLowerCase()) next[j-1] = this.second[0]=="N" ? "p" : "n";
                    else next[j-1] = this.second[0]=="P" ? "p" : "n";
                  } else {
                    if (this.first[0].toLowerCase()==this.second[j].toLowerCase()) next[j-1] = this.second[0]=="n" ? "P" : "N";
                    else next[j-1] = this.second[0]=="p" ? "P" : "N";
                  }
                }
              }
            } else if (isNaN(Number(this.first[j]))) {
              if (this.second[0].toUpperCase()==this.second[0]&&this.first[j].toUpperCase()==this.first[j]) next[j-1] = this.first[j];
              else if (this.second[0].toUpperCase()==this.second[0]||this.first[j].toUpperCase()==this.first[j]) {
                if (this.second[0].toLowerCase()==this.second[0]) {
                  if ((this.second[j]=="N"&&Number(this.first[0])>0)||(this.second[j]=="P"&&Number(this.first[0])<0)) next[j-1] = this.second[0]=="p" ? "P" : "N" ;
                  else next[j-1] = this.second[0]=="n" ? "P" : "N" ;
                } else if (this.first[0]=="0") next[j-1] = this.first[j];
                else {
                  if (this.second[j]=="N") next[j-1] = this.second[0]=="P" ? this.first[0] : String(0-Number(this.first[0])) ;
                  else next[j-1] = this.second[0]=="N" ? this.first[0] : String(0-Number(this.first[0])) ;
                }
              } else {
                if (this.second[j].toUpperCase()==this.second[j]) {
                  if (this.second[j].toLowerCase()!=this.second[0]) next[j-1] = Number(this.first[0])<0 ? "N" : "P" ;
                  else next[j-1] = Number(this.first[0])>0 ? "N" : "P" ;
                } else if (this.first[0]=="0") next[j-1] = this.first[j];
                else next[j-1] = this.second[j]!=this.second[0] ? this.first[0] : String(0-Number(this.first[0])) ;
              }
            } else {
              if (abs(this.second[j].charCodeAt(0)-this.second[0].charCodeAt(0))<5) {
                if(this.second[j]==this.second[0]) next[j-1] = this.first[j]==this.first[0] ? "p" : String(Number(this.first[j])-Number(this.first[0]));
                else {
                  let x = Number(this.first[j]) + Number(this.first[0]);
                  next[j-1] = x==0 ? this.second[0].toLowerCase() : this.second[0].toLowerCase()=="n" ? String(0-x) : String(x) ;
                }
              } else {
                if (this.first[j]=="0"&&this.first[0]=="0") {
                  if (this.second[0].toUpperCase()==this.second[0]) next[j-1] = this.second[0].toLowerCase() ;
                  else next[j-1] = this.second[0]=="p" ? this.second[j] : this.second[j]=="P" ? "N" : "P" ;
                }
                if ((this.second[0].toUpperCase()==this.second[0]&&this.first[j]!="0")||this.first[0]=="0") next[j-1] = this.first[j] ;
                else {
                  if (Number(this.first[0])>0) {
                    if(this.second[j].toLowerCase()==this.second[0].toLowerCase()) next[j-1] = this.second[j].toUpperCase()==this.second[j] ? "N" : "n" ;
                    else next[j-1] = this.second[j].toUpperCase()==this.second[j] ? "P" : "p" ;
                  } else {
                    if(this.second[j].toLowerCase()==this.second[0].toLowerCase()) next[j-1] = this.second[j].toUpperCase()==this.second[j] ? "P" : "p" ;
                    else next[j-1] = this.second[j].toUpperCase()==this.second[j] ? "N" : "n" ;
                  }
                }
              }
            }
          } else if (isNaN(Number(this.first[0]))) {
            if (isNaN(Number(this.first[j]))) {
              if (this.second[0].toUpperCase()==this.second[0]&&this.first[j].toUpperCase()==this.first[j]) next[j-1] = this.first[j];
              else if (this.second[0].toUpperCase()==this.second[0]||this.first[j].toUpperCase()==this.first[j]) {
                if (this.second[0].toLowerCase()==this.second[0]) {
                  if ((this.first[0]=="N"&&Number(this.second[j])>0)||(this.first[0]=="P"&&Number(this.second[j])<0)) next[j-1] = this.second[0]=="p" ? "P" : "N" ;
                  else next[j-1] = this.second[0]=="n" ? "P" : "N" ;
                } else if (this.second[j]=="0") next[j-1] = this.first[j];
                else {
                  if (this.first[0]=="N") next[j-1] = this.second[0]=="P" ? this.second[j] : String(0-Number(this.second[j])) ;
                  else next[j-1] = this.second[0]=="N" ? this.second[j] : String(0-Number(this.second[j])) ;
                }
              } else {
                if (this.first[0].toUpperCase()==this.first[0]) {
                  if (this.first[0].toLowerCase()!=this.second[0]) next[j-1] = Number(this.second[j])<0 ? "N" : "P" ;
                  else next[j-1] = Number(this.second[j])>0 ? "N" : "P" ;
                } else if (this.second[j]=="0") next[j-1] = this.first[j];
                else next[j-1] = this.first[0]!=this.second[0] ? this.second[j] : String(0-Number(this.second[j])) ;
              }
            } else {
              if (abs(this.first[0].charCodeAt(0)-this.second[0].charCodeAt(0))<5) {
                if(this.first[0]==this.second[0]) next[j-1] = this.first[j]==this.second[j] ? "p" : String(Number(this.first[j])-Number(this.second[j]));
                else {
                  let x = Number(this.first[j]) + Number(this.second[j]);
                  next[j-1] = x==0 ? this.second[0].toLowerCase() : this.second[0].toLowerCase()=="n" ? String(0-x) : String(x) ;
                }
              } else {
                if (this.first[j]=="0"&&this.second[j]=="0") {
                  if (this.second[0].toUpperCase()==this.second[0]) next[j-1] = this.second[0].toLowerCase() ;
                  else next[j-1] = this.second[0]=="p" ? this.first[0] : this.first[0]=="P" ? "N" : "P" ;
                }
                if ((this.second[0].toUpperCase()==this.second[0]&&this.first[j]!="0")||this.second[j]=="0") next[j-1] = this.first[j] ;
                else {
                  if (Number(this.second[j])>0) {
                    if(this.first[0].toLowerCase()==this.second[0].toLowerCase()) next[j-1] = this.first[0].toUpperCase()==this.first[0] ? "N" : "n" ;
                    else next[j-1] = this.first[0].toUpperCase()==this.first[0] ? "P" : "p" ;
                  } else {
                    if(this.first[0].toLowerCase()==this.second[0].toLowerCase()) next[j-1] = this.first[0].toUpperCase()==this.first[0] ? "P" : "p" ;
                    else next[j-1] = this.first[0].toUpperCase()==this.first[0] ? "N" : "n" ;
                  }
                }
              }
            }
          } else if (isNaN(Number(this.first[j]))) {
            if (this.first[j].toLowerCase()==this.first[j]&&this.second[0].toLowerCase()==this.second[0]&&this.second[j]!="0") {
              let x = 0 - Number(this.second[j]) * Number(this.first[0]);
              if ((x>0&&this.second[0]=="p")||(x<0&&this.second[0]=="n")) next[j-1] = "P";
              else next[j-1] = "N";
            } else next[j-1] = this.first[j];
          } else {
            if (this.second[j]=="0") next[j-1] = this.first[j]=="0"&&j==1 ? "p" : this.first[j];
            else {
              let x = 0 - Number(this.second[j]) * Number(this.first[0]);
              if ((x>0&&this.second[0]=="p")||(x<0&&this.second[0]=="n")) next[j-1] = "P";
              else next[j-1] = "N";
            }
          }
        } else if (isNaN(Number(this.second[j]))) {
          if (isNaN(Number(this.first[0]))) {
            if (isNaN(Number(this.first[j]))) {
              if (this.first[0].toUpperCase()==this.first[0]&&this.second[j].toUpperCase()==this.second[j]) {
                if (this.first[0]==this.second[j]) next[j-1] = Number(this.second[0])<0 ? "P" : "N";
                else next[j-1] = Number(this.second[0])>0 ? "P" : "N";
              } else if (this.first[0].toLowerCase()==this.first[0]&&this.second[j].toLowerCase()==this.second[j]) next[j-1] = this.first[j];
              else {
                if (this.first[j]=="N"||this.first[j]=="P") next[j-1] = this.first[j];
                else if (this.first[0].toLowerCase()==this.second[j].toLowerCase()) next[j-1] = Number(this.second[0])<0 ? "P" : "N";
                else next[j-1] = Number(this.second[0])>0 ? "P" : "N";
              }
            } else {
              if ((this.first[0]=="n"||this.first[0]=="p")&&(this.second[j]=="n"||this.second[j]=="p")) {
                if (this.first[j]=="0") next[j-1] = Number(this.second[0])>0 ? "p" : "n";
                else next[j-1] = this.first[j]=="0"&&j==1 ? "p" : this.first[j];
              } else if (this.first[0].toLowerCase()==this.second[j].toLowerCase()) next[j-1] = Number(this.second[0])<0 ? "P" : "N";
              else next[j-1] = Number(this.second[0])>0 ? "P" : "N";
            }
          } else if (isNaN(Number(this.first[j]))) {
            if ((this.second[j]=="n"||this.second[j]=="N")&&(this.first[j]=="p"||this.first[j]=="P")) {
              if (this.second[j]=="N"||this.first[j]=="P") next[j-1] = Number(this.second[0])>0 ? "P" : "N";
              else next[j-1] = Number(this.second[0])>0 ? "p" : "n";
            } else if ((this.first[j]=="n"||this.first[j]=="N")&&(this.second[j]=="p"||this.second[j]=="P")) {
              if (this.first[j]=="N"||this.second[j]=="P") next[j-1] = Number(this.second[0])<0 ? "P" : "N";
              else next[j-1] = Number(this.second[0])<0 ? "p" : "n";
            } else {
              if (this.first[j]=="P"||this.first[j]=="p") {
                if (this.first[j]=="P"&&this.second[j]=="p") Number(this.second[0])>0 ? "P" : "N";
                else if (this.second[j]=="P"&&this.first[j]=="p") next[j-1] = Number(this.second[0])>0 ? "p" : "n";
                else if (Number(this.second[0])-Number(this.first[0])<0) next[j-1] = Number(this.second[0])<0 ? this.first[j] : (this.first[j]=="P" ? "N" : "n");
                else next[j-1] = Number(this.second[0])>0 ? this.first[j] : (this.first[j]=="P" ? "N" : "n");
              } else {
                if (this.first[j]=="n"&&this.second[j]=="N") Number(this.second[0])>0 ? "P" : "N";
                else if (this.second[j]=="n"&&this.first[j]=="N") next[j-1] = Number(this.second[0])>0 ? "p" : "n";
                else if (Number(this.second[0])-Number(this.first[0])<0) next[j-1] = Number(this.second[0])<0 ? this.first[j] : (this.first[j]=="N" ? "P" : "p");
                else next[j-1] = Number(this.second[0])>0 ? this.first[j] : (this.first[j]=="N" ? "P" : "p");
              }
            }
          } else {
            if (this.second[j]=="n"||this.second[j]=="p") {
              if (this.first[j]=="0"&&j==1) next[j-1] = Number(this.second[0]) > 0 ? "p" : "n";
              else next[j-1] = this.first[j];
            } else {
              if(this.second[j]=="N"&&Number(this.second[0])>0||this.second[j]=="P"&&Number(this.second[0])<0) next[j-1] = "N";
              else next[j-1] = "P";
            }
          }
        } else if (isNaN(Number(this.first[0]))) {    //upper-left is imaginary
          if (isNaN(Number(this.first[j]))) {         //upper-right is also imaginary
            if ((this.first[0]=="n"||this.first[0]=="N")&&(this.first[j]=="p"||this.first[j]=="P")) {
              if (this.first[0]=="N"||this.first[j]=="P") next[j-1] = Number(this.second[0])>0 ? "P" : "N";
              else next[j-1] = Number(this.second[0])>0 ? "p" : "n";
            } else if ((this.first[j]=="n"||this.first[j]=="N")&&(this.first[0]=="p"||this.first[0]=="P")) {
              if (this.first[j]=="N"||this.first[0]=="P") next[j-1] = Number(this.second[0])<0 ? "P" : "N";
              else next[j-1] = Number(this.second[0])<0 ? "p" : "n";
            } else {
              if (this.first[j]=="P"||this.first[j]=="p") {
                if (this.first[j]=="P"&&this.first[0]=="p") Number(this.second[0])>0 ? "P" : "N";
                else if (this.first[0]=="P"&&this.first[j]=="p") next[j-1] = Number(this.second[0])>0 ? "p" : "n";
                else if (Number(this.second[0])-Number(this.second[j])<0) next[j-1] = Number(this.second[0])<0 ? this.first[j] : (this.first[j]=="P" ? "N" : "n");
                else next[j-1] = Number(this.second[0])>0 ? this.first[j] : (this.first[j]=="P" ? "N" : "n");
              } else {
                if (this.first[j]=="n"&&this.first[0]=="N") Number(this.second[0])>0 ? "P" : "N";
                else if (this.first[0]=="n"&&this.first[j]=="N") next[j-1] = Number(this.second[0])>0 ? "p" : "n";
                else if (Number(this.second[0])-Number(this.second[j])<0) next[j-1] = Number(this.second[0])<0 ? this.first[j] : (this.first[j]=="N" ? "P" : "p");
                else next[j-1] = Number(this.second[0])>0 ? this.first[j] : (this.first[j]=="N" ? "P" : "p");
              }
            }
          } else {
            if (this.first[0]=="n"||this.first[0]=="p") {
              if (this.first[j]=="0"&&j==1) next[j-1] = Number(this.second[0]) > 0 ? "p" : "n";
              else next[j-1] = this.first[j];
            } else {
              if(this.first[0]=="N"&&Number(this.second[0])>0||this.first[0]=="P"&&Number(this.second[0])<0) next[j-1] = "N";
              else next[j-1] = "P";
            }
          }
        } else if (isNaN(Number(this.first[j]))) {        //upper-right is imaginary
          if (this.second[j]=="0") next[j-1] = this.first[j];
          else next[j-1] = String(Number(this.first[0])*Number(this.second[j])/Number(this.second[0]));
        } else {                                          //All are numbers
          let x = Number(this.second[0]) * Number(this.first[j]) - Number(this.second[j]) * Number(this.first[0]);
          if (x==0&&j==1) next[j-1] = Number(this.second[0])>0 ? "p" : "n";
          else next[j-1] = String(x/Number(this.second[0]));
        }
      }
      for (let j=wanted-1; j >= 0; j++) {
        if (isNaN(Number(next[j]))&&next[j].toLowerCase()==next[j]) {
          if (j != 0 || all_zero) {
            next[j] = "0";
            if (j==0) done = true;
          }
        } else all_zero = false;
        this.steps[i][j] = next[j];
      }
      all_zero = true;
      this.first = this.second;
      this.second = next;
      if (this.second[0]=="0") {}
      else if (isNaN(Number(this.first[0]))) {
        if (isNaN(Number(this.second[0]))) {
          this.first[0].toLowerCase()==this.second[0].toLowerCase() ? changes=changes : changes++;
        } else if (Number(this.second[0])>0&&this.first[0].toLowerCase()=="p"||Number(this.second[0])<0&&this.first[0].toLowerCase()=="n") changes++;
      } else if (isNaN(Number(this.second[0]))) {
        if (Number(this.first[0])>0&&this.second[0].toLowerCase()=="p"||Number(this.first[0])<0&&this.second[0].toLowerCase()=="n") changes++;
      } else if (Number(this.second[0])/abs(Number(this.second[0]))!=Number(this.first[0])/abs(Number(this.first[0]))) changes++;
    }
    return [changes, this.steps];
  }
}
