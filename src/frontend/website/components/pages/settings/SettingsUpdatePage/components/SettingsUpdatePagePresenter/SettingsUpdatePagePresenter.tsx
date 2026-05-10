import {ChangeEvent, FC, useEffect, useState} from 'react';
import {AppApiErrorDisplay} from '../../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {AppSpinner} from '../../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {BasicPage} from '../../../../../../../common/components/layout/BasicPage/BasicPage';
import {PageContainer} from '../../../../../../../common/components/layout/PageContainer/PageContainer';
import {ApiResponse} from '../../../../../../../common/types/ApiResponse';
import {
  User,
  GetSettingsError,
  GetSettingsResponse,
  Country,
  Gender,
  HeightUnit,
  Settings,
  WeightUnit,
  DistanceUnit,
  TemperatureUnit,
  EntryVisibility,
  SettingsUpdateDto,
} from '../../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {UserProfileBlock} from '../../../../../layout/UserProfileBlock/UserProfileBlock';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {BreadCrumbs} from '../../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BreadCrumbsBlock} from '../../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {AppTextInput} from '../../../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {AppInputError} from '../../../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppTextArea} from '../../../../../../../common/components/atoms/AppTextArea/AppTextArea';
import {AppDatepicker} from '../../../../../../../common/components/atoms/AppDatepicker/AppDatepicker';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppSelect} from '../../../../../../../common/components/atoms/AppSelect/AppSelect';
import {InputLabel} from '../../../../../../../common/components/atoms/InputLabel/InputLabel';
import {InputRow} from '../../../../../../../common/components/atoms/InputRow/InputRow';
import {SectionContent} from '../../../../../../../common/components/atoms/AppSection/components/SectionContent';
import {SectionHeader} from '../../../../../../../common/components/atoms/AppSection/components/SectionHeader';
import {AppSection} from '../../../../../../../common/components/atoms/AppSection/AppSection';
import {AppSeparator} from '../../../../../../../common/components/atoms/AppSeparator/AppSeparator';
import {AppImageInput} from '../../../../../../../common/components/atoms/AppImageInput/AppImageInput';
import {SelectValue} from '../../../../../../../common/components/atoms/AppSelect/types/SelectValue';
import {ErrorSlice, useResponseErrors} from '../../../../../../../common/utils/useResponseErrors';
import {ZodHelper} from '../../../../../../../../backend/utils/ZodHelper/ZodHelper';

interface SettingsUpdatePagePresenterProps {
  response: ApiResponse<GetSettingsResponse, GetSettingsError>;
  errors?: ErrorSlice<Settings>;
  user: User;
  onSave: (settings: SettingsUpdateDto) => void;
}

export const SettingsUpdatePagePresenter: FC<SettingsUpdatePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.settings);
  const {getSmartError, setSmartError, clearSmartError, hasSmartError} = useResponseErrors<Settings>(props.errors);
  const [name, setName] = useState<string>(props.user.name);
  const [note, setNote] = useState<string>('');
  const [country, setCountry] = useState<Country>(Country.RU);
  const [height, setHeight] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [heightUnit, setHeightUnit] = useState<HeightUnit>(HeightUnit.CM);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>(WeightUnit.KG);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(DistanceUnit.KM);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(TemperatureUnit.C);
  const [visibility, setVisibility] = useState<EntryVisibility>(EntryVisibility.PUBLIC);
  const [profilePicture, setProfilePicture] = useState<string| null>(null);
  const breadCrumbs: BreadCrumbs = [
    {label: t(i18n.view.heading), url: route(RouteId.Settings)},
    {label: t(i18n.update.heading), url: route(RouteId.SettingsUpdate)},
  ];
  const settings = props.response.data?.data;
  useEffect(() => {
    if (!settings) {
      return;
    }
    setName(settings.name);
    setNote(settings.note ?? '');
    setCountry(settings.country);
    setHeight(settings.height.toString());
    setBirthDate(settings.birthDate);
    setGender(settings.gender);
    setHeightUnit(settings.units.height);
    setWeightUnit(settings.units.weight);
    setDistanceUnit(settings.units.distance);
    setTemperatureUnit(settings.units.temperature);
    setVisibility(settings.security.visibility);

  }, [settings]);

  const onHeightInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeight(value);
    const validated = ZodHelper.validators.numberOrStringNumber.safeParse(value);
    if (validated.success) {
      clearSmartError((x) => x.height);
      return;
    }
    setSmartError((x) => x.height, '');
  };
  const onSaveClick = () => {
    const validated = ZodHelper.validators.numberOrStringNumber.safeParse(height);
    clearSmartError((x) => x.height);
    if (!validated.success) {
      setSmartError((x) => x.height, '');
      return;
    }
    console.log(profilePicture);
    const update: SettingsUpdateDto = {
      name,
      note: note.trim() === '' ? null : note,
      country,
      height: validated.data,
      birthDate,
      gender,
      profilePicture: profilePicture ? {data: profilePicture} : undefined,
      units: {
        weight: weightUnit,
        distance: distanceUnit,
        height: heightUnit,
        temperature: temperatureUnit,
      },
      weight: null,
      security: {
        email: settings?.security.email ?? '',
        visibility: visibility,
      },
    };
    props.onSave(update);
  };
  const countries: SelectValue<Country>[] = Object.values(Country).map((country) => ({
    label: translations.utils.objects.countries[country],
    value: country,
  }));

  const genders: SelectValue<Gender>[] = Object.values(Gender).map((gender) => ({
    label: translations.utils.objects.genders[gender],
    value: gender,
  }));

  const heightUnits: SelectValue<HeightUnit>[] = Object.values(HeightUnit).map((heightUnit) => ({
    label: translations.utils.objects.heightUnits[heightUnit],
    value: heightUnit,
  }));
  const weightUnits: SelectValue<WeightUnit>[] = Object.values(WeightUnit).map((weightUnit) => ({
    label: translations.utils.objects.weightUnits[weightUnit],
    value: weightUnit,
  }));
  const distanceUnits: SelectValue<DistanceUnit>[] = Object.values(DistanceUnit).map((distanceUnit) => ({
    label: translations.utils.objects.distanceUnits[distanceUnit],
    value: distanceUnit,
  }));
  const temperatureUnits: SelectValue<TemperatureUnit>[] = Object.values(TemperatureUnit).map((temperatureUnit) => ({
    label: translations.utils.objects.temperatureUnits[temperatureUnit],
    value: temperatureUnit,
  }));
  const visibilities: SelectValue<EntryVisibility>[] = Object.values(EntryVisibility).map((visibility) => ({
    label: translations.utils.objects.entryVisibility[visibility],
    value: visibility,
  }));
  return (
    <PageContainer>
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <div className="flex flex-col md:flex-row gap-5 items-start">
          <UserProfileBlock user={props.user} own={true} />
          <div className="flex flex-col gap-5 grow w-full">
          {props.response.isLoading && (
            <AppSpinner />
          )}
          {(props.response.isError || props.response.data?.error?.error) && (
            <AppApiErrorDisplay error={props.response.data?.error?.error} />
          )}
          {settings && (
            <AppBlock>
              <div className="flex flex-col gap-10">
                <AppSection>
                  <SectionHeader>{t(i18n.update.sections.general)}</SectionHeader>
                  <SectionContent>
                    <InputRow>
                      <InputLabel>{t(i18n.view.labels.profilePicture)}</InputLabel>
                      <div>
                        <AppImageInput
                        onUpdate={(image) => setProfilePicture(image)}
                        url={profilePicture ?? undefined}
                        className="w-30 h-30" />
                        <AppInputError error={getSmartError((x) => x.profilePicture)} />
                      </div>
                    </InputRow>
                    <InputRow>
                      <InputLabel>{t(i18n.view.labels.name)}</InputLabel>
                      <div>
                        <AppTextInput value={name} onChange={(e) => setName(e.target.value)}/>
                        <AppInputError error={getSmartError((x) => x.name)} />
                      </div>
                    </InputRow>
                    <InputRow>
                      <InputLabel>{t(i18n.view.labels.about)}</InputLabel>
                      <div className="w-full h-40 flex flex-col gap-1">
                        <AppTextArea value={note} onChange={(e) => setNote(e.target.value)} />
                        <AppInputError error={getSmartError((x) => x.note)} />
                      </div>
                    </InputRow>
                    <InputRow>
                      <InputLabel>{t(i18n.view.labels.country)}</InputLabel>
                      <div className="w-50 max-w-full">
                        <AppSelect value={country} options={countries} onChange={setCountry} />
                      </div>
                      <AppInputError error={getSmartError((x) => x.country)} />
                    </InputRow>
                    <div className="w-full flex gap-5 justify-between">
                      <InputRow>
                        <InputLabel>{t(i18n.view.labels.gender)}</InputLabel>
                        <div>
                          <div className="w-30 max-w-full">
                            <AppSelect value={gender} options={genders} onChange={setGender} />
                          </div>
                          <AppInputError error={getSmartError((x) => x.gender)} />
                        </div>
                      </InputRow>
                      <InputRow>
                        <InputLabel>{t(i18n.view.labels.dateOfBirth)}</InputLabel>
                        <div>
                          <div className="w-50 max-w-full">
                            <AppDatepicker value={birthDate} dateOnly onChange={setBirthDate} />
                          </div>
                          <AppInputError error={getSmartError((x) => x.birthDate)} />
                        </div>
                      </InputRow>
                      <InputRow>
                        <InputLabel>{t(i18n.view.labels.height)}</InputLabel>
                        <div>
                          <div className="w-20 max-w-full">
                            <AppTextInput value={height} onChange={onHeightInputChange} hasError={hasSmartError((x) => x.height)} />
                          </div>
                        </div>
                      </InputRow>
                    </div>
                  </SectionContent>
                </AppSection>
                <AppSection>
                  <SectionHeader>{t(i18n.view.labels.units)}</SectionHeader>
                  <SectionContent>
                    <div className="w-full flex justify-between">
                      <InputRow>
                        <InputLabel>{t(i18n.view.labels.height)}</InputLabel>
                        <div className="w-20 max-w-full">
                          <AppSelect value={heightUnit} options={heightUnits} onChange={setHeightUnit} />
                        </div>
                      </InputRow>
                      <InputRow>
                        <InputLabel>{t(i18n.view.labels.weight)}</InputLabel>
                        <div className="w-20 max-w-full">
                          <AppSelect value={weightUnit} options={weightUnits} onChange={setWeightUnit} />
                        </div>
                      </InputRow>
                      <InputRow>
                        <InputLabel>{t(i18n.view.labels.distance)}</InputLabel>
                        <div className="w-20 max-w-full">
                          <AppSelect value={distanceUnit} options={distanceUnits} onChange={setDistanceUnit}
                          />
                        </div>
                      </InputRow>
                      <InputRow>
                        <InputLabel>{t(i18n.view.labels.temperature)}</InputLabel>
                        <div className="w-25 max-w-full">
                          <AppSelect
                            value={temperatureUnit}
                            options={temperatureUnits}
                            onChange={setTemperatureUnit}
                          />
                        </div>
                      </InputRow>
                    </div>
                  </SectionContent>
                </AppSection>
                <AppSection>
                  <SectionHeader>{t(i18n.view.labels.security)}</SectionHeader>
                  <SectionContent>
                    <InputRow>
                      <InputLabel>{t(i18n.view.labels.visibility)}</InputLabel>
                      <div className="w-40 max-w-full">
                        <AppSelect value={visibility} options={visibilities} onChange={setVisibility} />
                      </div>
                    </InputRow>
                  </SectionContent>
                </AppSection>
              </div>
              <AppSeparator />
              <div className="mt-5 flex flex-row">
                <div className="grow">
                  <RouteLink to={route(RouteId.Settings)}>{translations.utils.generic.buttons.back}</RouteLink>
                </div>
                <div className=" flex flex-row gap-5">
                  <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
                </div>
              </div>
            </AppBlock>
          )}
          </div>
      </div>
    </BasicPage>
  </PageContainer>
  );
};
