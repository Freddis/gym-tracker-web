import {useAppTranslation} from './i18n/useAppTranslation';

export const useImagePlaceHolder = (): string => {
  const {translations} = useAppTranslation();
  const noImageLabel = translations.utils.generic.images.noImageLabel.replaceAll(' ', '+');
  return `https://dummyimage.com/600x400/000/fff&text=${noImageLabel}`;
};
