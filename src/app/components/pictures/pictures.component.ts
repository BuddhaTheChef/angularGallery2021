import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { trigger, transition, useAnimation } from "@angular/animations";

import {scaleIn,scaleOut} from "./picture.animations";


@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  animations: [
    trigger("pictureAnimation", [
      /* scale */
      transition("void => *", [useAnimation(scaleIn, {params: { time: '500ms' }} )]),
      transition("* => void", [useAnimation(scaleOut, {params: { time: '500ms' }})]),
    ])
  ]
})
export class PicturesComponent implements OnInit {

  allPics: any;
  pictures: any;
  selectedPictures: any;
  authorSelected: any;
  currentSlide = 0;

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

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.pictures.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.pictures.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

  ngOnInit(): void {
    this.getPictures();
  }
}

// "format":"jpeg","width":5616,"height":3744,"filename":"0.jpeg","id":0,"author":"Alejandro Escamilla","author_url":"https://unsplash.com/photos/yC-Yzbqy7PY","post_url":"https://unsplash.com/photos/yC-Yzbqy7PY"