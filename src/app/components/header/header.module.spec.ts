import { HeaderModule } from './header.module';

describe('FooterModule', () => {
  let headerModule: HeaderModule;

  beforeEach(() => {
    headerModule = new HeaderModule();
  });

  it('should create an instance', () => {
    expect(headerModule).toBeTruthy();
  });
});
