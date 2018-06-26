import { browser, by, element } from 'protractor';

export class AppPage {
  // tslint:disable:typedef
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
  // tslint:enable:typedef
}
