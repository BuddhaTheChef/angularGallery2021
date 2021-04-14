import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { trigger, transition, useAnimation } from "@angular/animations";
import { scaleIn, scaleOut } from "./picture.animations";

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  /* adding in animations */
  animations: [
    trigger("pictureAnimation", [
      /* scale */
      transition("void => *", [useAnimation(scaleIn, { params: { time: '500ms' } })]),
      transition("* => void", [useAnimation(scaleOut, { params: { time: '500ms' } })]),
    ])
  ]
})

export class PicturesComponent implements OnInit {
 /* declaring datatypes */
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

   /* using services provided from dataservice component */
  constructor(private dataService: DataService) { }
   /* gets all picture objects from the API */
  getPictures() {
    this.allPics = this.dataService.getPictures().subscribe(data => {
      this.pictures = data
    });
  }
/* gets all picture objects from the API and filters incoming data by selected author*/
  getAuthPictures(authorSelected: any) {
    this.dataService.getAuthPictures(authorSelected).subscribe(data => {
      let newArr = data.filter((picture: any) => picture.author == authorSelected)
      this.selectedPictures = newArr
    });
  }
/* top carousel logic for previous click*/
  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.pictures.length - 1 : previous;
  }
/* top carousel logic for next click*/
  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.pictures.length ? 0 : next;
  }
/* modal logic to select current picture*/
  openModal(picture: any) {
    const openEle = document.getElementById('imgModal') as HTMLElement;
    openEle.style.display = "block";
    this.selectedPicture = picture
  }
  /* close modal logic*/
  closeModal() {
    const closeEle = document.getElementById('imgModal') as HTMLElement;
    closeEle.style.display = "none";
  }
 /* modal open previous click logic*/
  onPrevious() {
    const previous = this.slideIndex - 1;
    this.slideIndex = previous < 0 ? this.selectedPictures.length - 1 : previous;
  }
 /* modal open next click logic*/
  onNext() {
    const next = this.slideIndex + 1;
    this.slideIndex = next === this.selectedPictures.length ? 0 : next;
  }
 /* on load get pictures from API*/
  ngOnInit(): void {
    this.getPictures();
  }
}
