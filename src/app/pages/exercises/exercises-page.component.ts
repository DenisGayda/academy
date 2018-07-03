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
    text: 'Please, create modal window with "Hello"',
    answer: 'alert("Hello");',
  };
  code = ``;

  checkAnswer(): void {
    const result = (this.exercise.answer === this.code) ? 'Awesome! Congratulations!' : 'Try again.';
    alert(result);
  }

}
