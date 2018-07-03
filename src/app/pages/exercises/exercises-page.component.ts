import { Component } from '@angular/core';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  styleUrls: ['./exercises-page.component.scss'],
})
export class ExercisesPageComponent {

  options = {
    theme: 'vs-dark',
    language: 'javascript',
  };
  exercise = {
    number: 1,
    title: 'Create a date',
    text: 'Create a Date object for the date: February 20, 2012, 3 hours 12 minutes. Use "var" and name "myDate".',
    answer: 'var myDate = new Date(2012, 1, 20, 3, 12);',
  };
  code = ``;

  checkAnswer(): void {
    const result = (this.exercise.answer === this.code) ? 'Awesome! Congratulations!' : 'Try again.';
    alert(result);
  }

}
