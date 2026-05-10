import {useNavigate} from '@tanstack/react-router';
import {ChangeEventHandler, FC, useContext, useEffect, useState} from 'react';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AuthContext} from '../../../../../common/components/layout/AuthProvider/AuthContext';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';
import {Country, Gender, HeightUnit, RegisterData} from '../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {route, RouteId} from '../../../../../common/utils/route';
import {AppSelect} from '../../../../../common/components/atoms/AppSelect/AppSelect';
import {InputLabel} from '../../../../../common/components/atoms/InputLabel/InputLabel';
import {SelectValue} from '../../../../../common/components/atoms/AppSelect/types/SelectValue';
import {nativeEnum} from 'zod';
import {InputRow} from '../../../../../common/components/atoms/InputRow/InputRow';
import {AppDatepicker} from '../../../../../common/components/atoms/AppDatepicker/AppDatepicker';
import {api} from '../../../../../common/utils/api';
import {SemiRequired} from '../../../../../../common/types/SemiRequired';

export const RegistrationPage: FC = () => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.auth.registration);
  const toasts = useToasts();
  const [name, setName] = useState<string|undefined>(undefined);
  const [email, setEmail] = useState<string|undefined>(undefined);
  const [password, setPassword] = useState<string|undefined>(undefined);
  const [passwordConfirmation, setPasswordConfirmation] = useState<string|undefined>(undefined);
  const [country, setCountry] = useState<Country | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<Gender| undefined>(undefined);
  const [heightUnit, setHeightUnit] = useState<HeightUnit>(HeightUnit.CM);
  const {
    showToastsAndSetErrors,
    hasSmartError,
    setSmartError,
    getSmartError,
  } = useResponseErrors<SemiRequired<RegisterData, 'body'>['body']>();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    detectCountry();
  }, []);

  const detectCountry = async () => {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    if (!data.country) {
      return;
    }
    const result = nativeEnum(Country).safeParse(data.country);
    if (!result.success) {
      return;
    }
    setCountry(result.data);
  };

  const onHeightChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const height = e.target.value;
    const heightNumber = parseFloat(height);
    if (isNaN(heightNumber)) {
      return;
    }
    setHeight(heightNumber);
  };

  const register = async () => {
    if (!country) {
      setSmartError((x) => x?.country, t(i18n.form.errors.country));
    }
    if (!birthDate) {
      setSmartError((x) => x?.birthDate, t(i18n.form.errors.birthDate));
    }
    if (!height) {
      setSmartError((x) => x?.height, t(i18n.form.errors.height));
    }
    if (!gender) {
      setSmartError((x) => x?.gender, t(i18n.form.errors.gender));
    }
    if (!name) {
      setSmartError((x) => x?.name, t(i18n.form.errors.name));
    }
    if (!email) {
      setSmartError((x) => x?.email, t(i18n.form.errors.email));
    }
    if (!password) {
      setSmartError((x) => x?.password, t(i18n.form.errors.password));
    }
    if (!passwordConfirmation) {
      setSmartError((x) => x?.passwordConfirmation, t(i18n.form.errors.passwordConfirmation));
    }
    if (!country || !birthDate || !height || !gender || !name || !email || !password || !passwordConfirmation) {
      return;
    }
    const result = await api.register({
      body: {
        name,
        email,
        password,
        passwordConfirmation,
        gender,
        country,
        birthDate,
        height,
      },
    });
    if (showToastsAndSetErrors(result, {noValidationToasts: true})) {
      return;
    }
    auth.login(result.data);
    toasts.addSuccess(t(i18n.toasts.registrationSuccess));
    navigate({to: '/entries'});
    return;
  };
  const countries: SelectValue<Country | undefined>[] = Object.values(Country).map((country) => ({
    label: translations.utils.objects.countries[country],
    value: country,
  }));
  const countryPlaceholder: SelectValue<Country | undefined> = {
    label: t(i18n.form.placeholders.country),
    value: undefined,
  };
  const countryList: SelectValue<Country | undefined>[] = [
    countryPlaceholder,
    ...countries,
  ];
  const genderPlaceholder: SelectValue<Gender|undefined> = {
    label: t(i18n.form.placeholders.gender),
    value: undefined,
  };
  const genders: SelectValue<Gender|undefined>[] = Object.values(Gender).map((gender) => ({
    label: translations.utils.objects.genders[gender],
    value: gender,
  }));
  const genderList: SelectValue<Gender|undefined>[] = [
    genderPlaceholder,
    ...genders,
  ];
  const heightUnits: SelectValue<HeightUnit>[] = Object.values(HeightUnit).map((heightUnit) => ({
    label: translations.utils.objects.heightUnits[heightUnit],
    value: heightUnit,
  }));
  return (
    <PageContainer className="justify-center bg-main text-main">
      <div className="w-full max-w-xl">
        <AppBlock >
          <AppBlockHeader >{t(i18n.heading)}</AppBlockHeader>
          <div className="flex flex-col gap-1">
            <InputRow>
              <InputLabel>{t(i18n.form.labels.name)}</InputLabel>
              <AppTextInput data-testid="name" onChange={(e) => setName(e.target.value)} value={name}/>
              <AppInputError error={getSmartError((x) => x.name)} />
            </InputRow>
            <InputRow>
              <InputLabel>{t(i18n.form.labels.email)}</InputLabel>
              <AppTextInput
                data-testid="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <AppInputError error={getSmartError((x) => x.email)} />
            </InputRow>
            <InputRow>
              <InputLabel>{t(i18n.form.labels.password)}</InputLabel>
              <AppTextInput
                data-testid="password"
                password
                noAutoComplete
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <AppInputError error={getSmartError((x) => x.password)} />
            </InputRow>
            <InputRow>
              <InputLabel>{t(i18n.form.labels.passwordConfirmation)}</InputLabel>
              <AppTextInput
                data-testid="passwordConfirmation"
                password
                noAutoComplete
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
              />
              <AppInputError error={getSmartError((x) => x.passwordConfirmation)} />
            </InputRow>
            <div className="flex flex-row gap-10">
              <div className="flex flex-row gap-5">
                <div className="w-25">
                  <InputRow>
                    <InputLabel>{t(i18n.form.labels.height)}</InputLabel>
                    <AppTextInput data-testid="height" hasError={hasSmartError((x) => x.height)} value={height} onChange={onHeightChange} />
                  </InputRow>
                </div>
                <div className="w-25">
                  <InputRow>
                    <InputLabel>{t(i18n.form.labels.units)}</InputLabel>
                    <AppSelect options={heightUnits} value={heightUnit} onChange={(heightUnit) => setHeightUnit(heightUnit)} />
                  </InputRow>
                </div>
              </div>
              <div className="grow">
                <InputRow>
                  <InputLabel>{t(i18n.form.labels.gender)}</InputLabel>
                  <AppSelect data-testid="gender" options={genderList} value={gender} onChange={(gender) => setGender(gender)} />
                  <AppInputError error={getSmartError((x) => x.gender)} />
                </InputRow>
              </div>
            </div>
            <div className="flex flex-row justify-stretch gap-5">
            <div className="min-w-50">
                <InputRow>
                  <InputLabel>{t(i18n.form.labels.birthDate)}</InputLabel>
                  <AppDatepicker data-testid="birthDate" value={birthDate} dateOnly onChange={(birthDate) => setBirthDate(birthDate)} />
                  <AppInputError error={getSmartError((x) => x.birthDate)} />
                </InputRow>
              </div>
              <div className="w-50 grow">
                <InputRow>
                  <InputLabel>{t(i18n.form.labels.country)}</InputLabel>
                  <AppSelect data-testid="country" options={countryList} value={country} onChange={(country) => setCountry(country)} />
                  <AppInputError error={getSmartError((x) => x.country)} />
                </InputRow>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-5 ">
            <RouteLink to={route(RouteId.Login)}>{t(i18n.form.buttons.signIn)}</RouteLink>
            <div className="grow flex flex-row-reverse">
              <AppButton onClick={register}>{t(i18n.form.buttons.register)}</AppButton>
            </div>
          </div>
        </AppBlock>
      </div>
    </PageContainer>
  );
};
