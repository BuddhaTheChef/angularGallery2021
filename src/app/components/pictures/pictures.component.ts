import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  allPics: any;
  pictures: any;
  selectedPictures: any;
  authorSelected: any;

  constructor(private dataService:DataService) {}
      
  getPictures() {
    this.allPics = this.dataService.getPictures().subscribe(data => {
      console.log(data)
      this.pictures=data
    });
  }

  getAuthPictures(authorSelected:any) {
    this.dataService.getAuthPictures(authorSelected).subscribe(data => {
      console.log(data)
      this.selectedPictures=data
    });
  }

  ngOnInit(): void {
    this.getPictures();
  }
}

// "format":"jpeg","width":5616,"height":3744,"filename":"0.jpeg","id":0,"author":"Alejandro Escamilla","author_url":"https://unsplash.com/photos/yC-Yzbqy7PY","post_url":"https://unsplash.com/photos/yC-Yzbqy7PY"