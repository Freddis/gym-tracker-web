import {TestUtils} from '../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('AppLanguageDropdown', () => {

  test('The contents is correct', async ({page}) => {
    const pageUtils = TestUtils.frontend.home(page);
    await pageUtils.open();
    //test
    const languages = await pageUtils.getLanguageDropdownLanguages();

    //check
    expect(languages.length, 'Number of languages should be 2').toBe(2);
    const currentLanguage = await pageUtils.getSelectedLanguage();
    expect(currentLanguage, 'Default language should be english').toBe('en');
  });

  test('Language can be switched', async ({page}) => {
    const pageUtils = TestUtils.frontend.home(page);
    await pageUtils.open();
    //pre-check
    const buttonText = await pageUtils.getHeroButton().textContent();
    expect(buttonText, 'Button text is should be in english').toBe('Download App');
    //test
    await pageUtils.selectLanguage('ru');
    //check
    const buttonText2 = await pageUtils.getHeroButton().textContent();
    expect(buttonText2, 'Button text is should be in russian').toBe('Скачать');
  });

});
