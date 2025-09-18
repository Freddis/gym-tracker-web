import {describe, expect, test} from 'vitest';
import {WorkoutService} from './WorkoutService';
import {globalServiceFactory} from '../../utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {TestUtils} from '../../utils/TestUtils/TestUtils';


describe(WorkoutService.name, async () => {
  const service = await globalServiceFactory.workout();

  test('Can create workout', async () => {
    const user = await TestUtils.seed.createUser();
    const created = await service.create(user.id, {
      typeId: null,
      calories: 0,
      start: new Date(),
      end: null,
      exercises: [],
    });
    const workout = await service.get(created.id);
    expect(workout?.id, 'Id should match the created one').toBe(created.id);
  });
});
