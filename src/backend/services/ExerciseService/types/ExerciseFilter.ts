import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {Equipment} from '../../../types/Equipment';
import {Filter} from '../../../types/ModelService/types/Filter';
import {Muscle} from '../../../types/Muscle';

export interface ExerciseFilter extends Filter{
    filter?: string,
    userId?: number | null,
    muscle?: Muscle[],
    equipment?: Equipment,
    updatedAfter?: Date,
    parentIds?: number[] | null,
    includeBuiltIn?: boolean,
    language?: Language
  }
