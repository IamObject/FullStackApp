import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.scss']
})
export class AnimateComponent implements AfterViewInit  {

  ngAfterViewInit() {
    
    this.animate();
    this.button.addEventListener('click', function() {
      this.animate();
    });
  }

  title
  courseFeatureElements
  button
//navigator.serviceWorker.register('/sw.js');

 animate() {
  this.title = document.querySelector('.title');
  this.courseFeatureElements = document.querySelectorAll('.course-feature');
  this.button = document.querySelector('button');

  this.title!.classList.remove('animate-in');
  for (var i = 0; i < this.courseFeatureElements.length; i++) {
    this.courseFeatureElements[i].classList.remove('animate-in');
  }
  this.button!.classList.remove('animate-in');

  setTimeout(function () {
    this.title.classList.add('animate-in');
  }, 1000);

  setTimeout(function () {
    this.courseFeatureElements[0].classList.add('animate-in');
  }, 3000);

  setTimeout(function () {
    this.courseFeatureElements[1].classList.add('animate-in');
  }, 4500);

  setTimeout(function () {
    this.courseFeatureElements[2].classList.add('animate-in');
  }, 6000);

  setTimeout(function () {
    this.courseFeatureElements[3].classList.add('animate-in');
  }, 7500);

  setTimeout(function () {
    this.courseFeatureElements[4].classList.add('animate-in');
  }, 9000);

  setTimeout(function () {
    this.courseFeatureElements[5].classList.add('animate-in');
  }, 10500);

  setTimeout(function () {
    this.courseFeatureElements[6].classList.add('animate-in');
  }, 12000);

  setTimeout(function () {
    this.button.classList.add('animate-in');
  }, 13500);
}





}
