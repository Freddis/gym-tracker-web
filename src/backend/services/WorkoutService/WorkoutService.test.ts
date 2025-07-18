import {describe, expect, test} from 'vitest';
import {WorkoutService} from './WorkoutService';
import {globalServiceFactory} from '../../utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {TestUtils} from '../../../../test/TestUtils';


describe(WorkoutService.name, async () => {
  const service = new WorkoutService(await globalServiceFactory.drizzle());

  test('Can create workout', async () => {
    const user = await TestUtils.seed.createUser();
    const created = await service.create(user.id);
    const workout = await service.get(created.id);
    expect(workout?.id, 'Id should match the created one').toBe(created.id);
  });
});
