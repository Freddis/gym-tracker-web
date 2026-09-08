import {nativeEnum, TypeOf} from 'zod';
import {ImageType} from '../../../../../../common/utils/openapi-client';
import {paginatedQueryValidator} from '../../../../../utils/validators/paginatedQueryValidator';

export const imageListQueryValidator = paginatedQueryValidator.extend({
  imageType: nativeEnum(ImageType).optional(),
});

export type ImageListQueryValidator = TypeOf<typeof imageListQueryValidator>
