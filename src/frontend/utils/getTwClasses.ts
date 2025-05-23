import {PaletteName} from '../enums/PaletteName';

export const getTwClasses = (palette: PaletteName, surface?: boolean) => {
  const surfaceMap: Record<PaletteName, string> = {
    [PaletteName.Neutral]: 'bg-neutral-surface text-on-neutral-surface',
    [PaletteName.Lightest]: 'bg-lightest-surface text-on-lightest-surface',
    [PaletteName.Darkest]: 'bg-darkest-surface text-on-darkest-surface',
    [PaletteName.Danger]: 'bg-danger-surface text-on-danger-surface',
    [PaletteName.Warning]: 'bg-warning-surface text-on-warning-surface',
    [PaletteName.Info]: 'bg-info-surface text-on-info-surface',
    [PaletteName.Success]: 'bg-success-surface text-on-success-surface',
  };
  if (surface) {
    return surfaceMap[palette];
  }
  const map: Record<PaletteName, string> = {
    [PaletteName.Neutral]: 'bg-neutral text-on-neutral',
    [PaletteName.Lightest]: 'bg-lightest text-on-lightest',
    [PaletteName.Darkest]: 'bg-darkest text-on-darkest',
    [PaletteName.Danger]: 'bg-danger text-on-danger',
    [PaletteName.Warning]: 'bg-warning text-on-warning',
    [PaletteName.Info]: 'bg-info text-on-info',
    [PaletteName.Success]: 'bg-success text-on-success',
  };
  return map[palette];
};
