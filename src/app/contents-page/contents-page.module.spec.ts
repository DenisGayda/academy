import { ContentsPageModule } from './contents-page.module';

describe('ContentsPageModule', () => {
  let contentsPageModule: ContentsPageModule;

  beforeEach(() => {
    contentsPageModule = new ContentsPageModule();
  });

  it('should create an instance', () => {
    expect(contentsPageModule).toBeTruthy();
  });
});
