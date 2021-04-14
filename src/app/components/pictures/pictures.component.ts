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
  currentPicture = 0;
  currentSlide = 0;
  selectedPicture: any;
  images = [];
  slideIndex = 0;
  picture: any;
  constructor(private dataService:DataService) {}
      
  getPictures() {
    this.allPics = this.dataService.getPictures().subscribe(data => {
      console.log(data)
      this.pictures=data
    });
  }

  getAuthPictures(authorSelected:any) {
    this.dataService.getAuthPictures(authorSelected).subscribe(data => {
      this.selectedPictures=data
      console.log(data)
      
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

  openModal(picture:any) {
    const openEle = document.getElementById('imgModal') as HTMLElement;
    openEle.style.display = "block";
    console.log(picture)
    this.selectedPicture = picture
   }
   closeModal() {
    const closeEle = document.getElementById('imgModal') as HTMLElement;
    closeEle.style.display = "none";
   }

   onPrevious() {
    const previous = this.slideIndex - 1;
    this.slideIndex = previous < 0 ? this.selectedPictures.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.slideIndex);
  }

  onNext() {
    const next = this.slideIndex + 1;
    this.slideIndex = next === this.selectedPictures.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.slideIndex);
  }

  ngOnInit(): void {
    this.getPictures();
  }
}

// "format":"jpeg","width":5616,"height":3744,"filename":"0.jpeg","id":0,"author":"Alejandro Escamilla","author_url":"https://unsplash.com/photos/yC-Yzbqy7PY","post_url":"https://unsplash.com/photos/yC-Yzbqy7PY"