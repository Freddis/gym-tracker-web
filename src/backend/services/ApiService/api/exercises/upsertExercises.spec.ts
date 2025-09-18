import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {ExerciseUpsertDto} from '../../../ExerciseService/types/ExerciseUpsertDto';
import {Equipment} from '../../../../types/Equipment';

describe('upsertExercises', async () => {
  const service = await TestUtils.business.getFactory().exercise();

  test('Can create minimal exercise', async () => {
    console.log('Prepare');
    const user = await TestUtils.seed.createUser();
    const exercise: ExerciseUpsertDto = {
      id: null,
      name: 'Upserted exercise 1',
      description: null,
      difficulty: null,
      params: [],
      equipment: null,
      images: [],
      copiedFromId: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      muscles: {
        primary: [],
        secondary: [],
      },
    };
    console.log('Test');
    const response = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items[0]?.name).to.eq('Upserted exercise 1');
    expect(response.status).to.eq(200);
    expect(response.body.items[0]?.name).to.eq('Upserted exercise 1');

    // Check the response
    const responseBody = response.body.items[0];
    expect(!!responseBody.id).to.eq(true);
    expect(responseBody.name).to.eq('Upserted exercise 1');
    expect(responseBody.description).to.eq(null);
    expect(responseBody.difficulty).to.eq(null);
    expect(responseBody.params).to.deep.eq([]);
    expect(responseBody.equipment).to.eq(null);
    expect(responseBody.images).to.deep.eq([]);
    expect(responseBody.copiedFromId).to.eq(null);
    expect(!!responseBody.createdAt).to.eq(true);
    expect(responseBody.updatedAt).to.eq(null);
    expect(responseBody.deletedAt).to.eq(null);

    // Check the db
    const responsdedId = response.body.items[0]?.id;
    const inserted = await service.getById(response.body.items[0].id);
    expect(inserted?.id).to.eq(responsdedId);
    expect(inserted?.id).to.eq(responsdedId);
    expect(inserted?.name).to.eq('Upserted exercise 1');
    expect(inserted?.description).to.eq(null);
    expect(inserted?.difficulty).to.eq(null);
    expect(inserted?.params).to.deep.eq([]);
    expect(inserted?.equipment).to.eq(null);
    expect(inserted?.images).to.deep.eq([]);
    expect(inserted?.copiedFromId).to.eq(null);
    expect(inserted?.userId).to.eq(user.id);
    expect(inserted?.createdAt.toISOString()).to.eq(exercise.createdAt.toISOString());
    expect(inserted?.updatedAt).to.eq(null);
    expect(inserted?.deletedAt).to.eq(null);
  });

  test('Can upsert filled-in exercise', async () => {
    console.log('Prepare');
    const user = await TestUtils.seed.createUser();
    const exercise: ExerciseUpsertDto = {
      id: null,
      name: 'Created exercise 1',
      description: null,
      difficulty: null,
      params: [],
      equipment: null,
      images: [],
      copiedFromId: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      muscles: {
        primary: [],
        secondary: [],
      },
    };
    const result = await service.createForUser(user.id, {
      ...exercise,
      parentExerciseId: null,
      muscles: {
        primary: [],
        secondary: [],
      },
    });
    exercise.id = result.id;
    exercise.name = 'Updated Exercise';
    exercise.description = 'Added description';
    exercise.updatedAt = new Date();
    exercise.equipment = Equipment.Backpack;

    console.log('Test');
    const response = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });
    console.log('Check');
    expect(response.status).to.eq(200);
    // Check all fields in the response
    const responseBody = response.body.items[0];
    expect(!!responseBody.id).to.eq(true);
    expect(responseBody.name).to.eq('Updated Exercise');
    expect(responseBody.description).to.eq('Added description');
    expect(responseBody.difficulty).to.eq(null);
    expect(responseBody.params).to.deep.eq([]);
    expect(responseBody.equipment).to.eq(Equipment.Backpack);
    expect(responseBody.images).to.deep.eq([]);
    expect(responseBody.copiedFromId).to.eq(null);
    expect(!!responseBody.createdAt).to.eq(true);
    expect(responseBody.updatedAt).to.be.a('date');
    expect(responseBody.deletedAt).to.eq(null);

    // Check all fields in the db
    const inserted = await service.getById(response.body.items[0].id);
    expect(inserted?.id).to.eq(response.body.items[0].id);
    expect(inserted?.name).to.eq('Updated Exercise');
    expect(inserted?.description).to.eq('Added description');
    expect(inserted?.difficulty).to.eq(null);
    expect(inserted?.params).to.deep.eq([]);
    expect(inserted?.equipment).to.eq(Equipment.Backpack);
    expect(inserted?.images).to.deep.eq([]);
    expect(inserted?.copiedFromId).to.eq(null);
    expect(inserted?.userId).to.eq(user.id);
    expect(inserted?.createdAt.toISOString()).to.eq(exercise.createdAt.toISOString());
    expect(inserted?.updatedAt?.toISOString()).to.eq(exercise.updatedAt.toISOString());
    expect(inserted?.deletedAt).to.eq(null);

  });
});
