import {FC, useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import {AppApiErrorDisplay} from '../../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppCombobox} from '../../../../../../../common/components/atoms/AppCombobox/AppCombobox';
import {ComboValue} from '../../../../../../../common/components/atoms/AppCombobox/types/ComboValue';
import {AppLabel} from '../../../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppPageHeading} from '../../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {AppSearchInput} from '../../../../../../../common/components/atoms/AppSearchInput/AppSearchInput';
import {AppSidebarBlock} from '../../../../../../../common/components/atoms/AppSidebarBlock/AppSidebarBlock';
import {AppSpinner} from '../../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppSwitch} from '../../../../../../../common/components/atoms/AppSwitch/AppSwitch';
import {AppToast} from '../../../../../../../common/components/atoms/AppToast/AppToast';
import {PageContainer} from '../../../../../../../common/components/layout/PageContainer/PageContainer';
import {Color} from '../../../../../../../common/utils/design-system/types/Color';
import {Equipment, Muscle} from '../../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {ExerciseBlock} from '../ExerciseBlock/ExerciseBlock';
import {ExerciseLibraryPageState} from './types/ExerciseLibraryPageState';
import {ExerciseLibraryPagePresenterProps} from './types/ExerciseLibraryPagePresenterProps';
import {avoidLet} from '../../../../../../../common/utils/avoidLet';
import {UserProfileBlock} from '../../../../../layout/UserProfileBlock/UserProfileBlock';

export const ExerciseLibraryPagePresenter: FC<ExerciseLibraryPagePresenterProps> = (props) => {
  const {filter, onFilter, apiError, state, items, onNextPage} = props;
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.exercises.list);
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });

  useEffect(() => {
    if (inView && onNextPage) {
      onNextPage();
    }
  }, [inView, onNextPage]);

  const filterByEquipment = (equipment: Equipment, checked: boolean) => {
    onFilter({
      ...filter,
      equipment: checked ? equipment : undefined,

    });
  };

  const filterByMuscle = (muscle: Muscle, checked: boolean) => {
    const existing = filter.muscles?.filter((x) => x !== muscle) ?? [];
    if (checked) {
      existing.push(muscle);
    }
    const muscles = existing.length > 0 ? existing : undefined;
    onFilter({
      ...filter,
      muscles,
    });
  };
  const filterByName = (search: string | null) => {
    onFilter({
      ...filter,
      search: search ?? undefined,
    });
  };

  if (state.status === ExerciseLibraryPageState.Error) {
    return (
      <PageContainer>
        <AppApiErrorDisplay error={apiError?.error} />
      </PageContainer>
    );
  }

  const values: ComboValue[] = Object.values(Equipment).map((equipment) => ({
    label: translations.utils.objects.equipment[equipment],
    onSelect: (selected) => filterByEquipment(equipment, selected),
  }));
  const selectedEquipment = avoidLet(() => {
    const equipment = filter.equipment;
    if (!equipment) {
      return undefined;
    }
    return values.find((x) => x.label === translations.utils.objects.equipment[equipment]);
  });
  return (
    <PageContainer>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="w-full text-left mb-5">
          <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-start">
          <div className="flex flex-col gap-5">
            {props.user && <UserProfileBlock user={props.user} own={props.own} />}
            <AppSidebarBlock>
              <AppLabel className="mb-2 block">{t(i18n.filter.labels.search)}</AppLabel>
              <div className="mb-5">
                <AppSearchInput
                  data-testid="exercise-search-input"
                  debounce={1000}
                  value={filter.search}
                  onSearch={filterByName}
                />
              </div>
              <AppLabel className="mb-2 block">{t(i18n.filter.labels.equipment)}</AppLabel>
              <div className="mb-5">
                <AppCombobox
                    data-testid="equipment-combobox"
                    placeholder={t(i18n.filter.labels.searchEquipment)}
                    notFound={t(i18n.filter.labels.noEquipmentFound)}
                    defaultValue={t(i18n.filter.labels.selectEquipment)}
                    values={values}
                    selected={selectedEquipment?.label}
                />
              </div>
              <AppLabel className="mb-2 block">{t(i18n.filter.labels.muscles)}</AppLabel>
              <div className="mb-5 flex flex-col gap-2">
                {Object.values(Muscle).sort().map((x) => (
                  <AppSwitch
                  key={x}
                  data-testid={`muscle-switch-${x.toLowerCase()}`}
                  label={translations.utils.objects.muscles[x]}
                  checked={filter.muscles?.includes(x) ?? false}
                  onCheckedChange={(e) => filterByMuscle(x, e)}
                  />
                ))}
              </div>
            </AppSidebarBlock>
          </div>
          <div className="flex flex-col gap-5 grow w-full">
            {state.status === ExerciseLibraryPageState.Success && items.length === 0 && (
              <AppToast variant={Color.Danger}>{t(i18n.toasts.noExercisesFound)}</AppToast>
            )}
            {state.status === ExerciseLibraryPageState.Success && items.map((item) => (
              <ExerciseBlock
                className="w-full"
                key={item.id}
                item={item}
                params={filter}
                data-testid={`exercise-block-${item.id}`}
                route={props.route}
              />
            ))}
            <div ref={ref}></div>
            {state.status === ExerciseLibraryPageState.Loading || state.isLoadingNextPage ? <AppSpinner/> : null}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
