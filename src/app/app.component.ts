import { Component, ElementRef, ViewChild } from '@angular/core';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { element } from 'protractor';
import { ApiService } from './api.service';
import * as _ from 'lodash';
declare var Plotly:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  @ViewChild('chart', { static: false })
  el!: ElementRef;
title = 'crud';
movies = [{title:'test'}];
num=[1,2,3,4];
showplot_var:boolean=false;
name='yes';
  pltx: [] = [];
  plty: [] = [];
  private _selectedMovie: any;
  public get selectedMovie() {
    return this._selectedMovie;
  }
  public set selectedMovie(value) {
    this._selectedMovie = value;
  }

constructor(private api:ApiService) {
  this.getMovies();
  this.selectedMovie = {id: -1, title: '', desc: '', year: 0};
}
getMovies = () => {
  this.api.getAllMovies().subscribe(
    data => {
      this.movies = data;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element.id);
      }
      
    },
      error =>{
        console.log(error);
      }
    
  );
}
movieClicked = (movie: { id: any; }) => {
  console.log(movie.id);
  
    this.api.getOneMovie(movie.id).subscribe(
      data => {
        this.selectedMovie = data;
        
      },
        error =>{
          console.log(error);
        }
      
    );
  
}
updateMovie = () => {
  this.api.updateMovie(this.selectedMovie).subscribe(
    data => {
      this.selectedMovie = data;
      
    },
      error =>{
        console.log(error);
      }
    
  );
    }
  createMovie = () => {
    this.api.createMovie(this.selectedMovie).subscribe(
      data => {
        this.getMovies();
        
      },
        error =>{
          console.log(error);
        }
      
    );
}
deleteMovie = () => {
  this.api.deleteMovie(this.selectedMovie).subscribe(
    data => {
      this.getMovies();
      
    },
      error =>{
        console.log(error);
      }
    
  );
}
plotmovieid = () => {
  this.api.storePlotid().subscribe(
    data => {
      console.log(data);
    },
    error => {
      console.log(error);
    }
    
  )
  this.api.getPlotid().subscribe(
    data => {
      console.log(data);
      this.pltx = data[0].x.split(',');
      this.plty = data[0].y.split(',');
      console.log(this.pltx, this.plty);
      this.basicChart(this.pltx, this.plty);
    },
    error => {
      console.log(error);
    }
  )
}
basicChart(xa: string[], ya: string[]){
  const element = this.el.nativeElement
  var xlst: number[] = new Array();
  var ylst: number[] = new Array();
  console.log(xa.length);
  for (let i = 0; i < xa.length; i++){
    xlst.push(parseInt(xa[i],10));
    ylst.push(parseInt(ya[i],10));
  }
  console.log(xlst,ylst);
  const data=[{
    x:xlst,
    y:ylst
  }]
  const style={
    margin:{t:0}
  }
  Plotly.plot(element,data,style)
}

}
