import {useAppTranslation} from './i18n/useAppTranslation';

export const useImagePlaceHolder = (square?: boolean): string => {
  const {translations} = useAppTranslation();
  const noImageLabel = translations.utils.generic.images.noImageLabel.replaceAll(' ', '+');
  const size = square ? '600x600' : '600x400';
  return `https://dummyimage.com/${size}/000/fff&text=${noImageLabel}`;
};
