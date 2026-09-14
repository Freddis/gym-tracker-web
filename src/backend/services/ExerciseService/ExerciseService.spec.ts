import {describe, expect, test} from 'vitest';
import {ExerciseService} from './ExerciseService';
import {TestUtils} from '../../utils/TestUtils/TestUtils';
import {ImageType} from '../../types/ImageType';

describe(ExerciseService.name, () => {
  describe('Bugs', () => {
    test('Image urls with a plus sign are encoded', async () => {
      await TestUtils.seed.wipeDb();
      const image = await TestUtils.seed.createImage({
        url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench+Press-a.jpg',
        imageType: ImageType.Exercise,
      });
      const exercise = await TestUtils.seed.createExercise({
        name: 'Bench Press',
        images: [image],
      });
      const service = await TestUtils.business.getFactory().exercise();

      const result = await service.getById(exercise.id);

      expect(result?.images[0]?.url).toBe('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench%2BPress-a.jpg');
    });
  });
});
