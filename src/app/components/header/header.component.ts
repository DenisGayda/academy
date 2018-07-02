import { Component } from '@angular/core';

interface ILinks {
  name: string;
  url: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public dropdownVisible = false;
  public loginFormVisible = false;
  public pagesLinks: ILinks[] = [
    {name: 'Главная', url: '/homepage'},
    {name: 'Содержание', url: '/contents'},
    {name: 'Тесты', url: '#'},
    {name: 'Личный кабинет', url: '/profile'},
  ];

  public visibleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public choisePage(): void {
    this.dropdownVisible = false;
  }

  public visibleLoginForm(): void {
    this.loginFormVisible = !this.loginFormVisible;
  }
}
