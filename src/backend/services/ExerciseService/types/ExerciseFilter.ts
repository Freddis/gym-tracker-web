import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {Equipment} from '../../../types/Equipment';
import {Filter} from '../../../types/ModelService/types/Filter';
import {Muscle} from '../../../types/Muscle';

export interface ExerciseFilter extends Filter<string>{
    filter?: string,
    userId?: number | null,
    muscle?: Muscle[],
    equipment?: Equipment,
    updatedAfter?: Date,
    parentIds?: string[] | null,
    language?: Language,
    isArchived?: boolean,
    includeBuiltIn?: boolean,
    includeDeleted?: boolean,
  }
