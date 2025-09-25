import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {ExerciseUpsertDto} from '../../../ExerciseService/types/ExerciseUpsertDto';
import {Equipment} from '../../../../types/Equipment';
import {Muscle} from '../../../../types/Muscle';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ActionErrorCode} from '../../types/ActionErrorCode';

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
      isArchived: false,
    };
    // test
    const response = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });

    // Check
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

  test('Can update minimal exercise', async () => {
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
      isArchived: false,
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

  test('Can update filled-in exercise', async () => {
    console.log('Prepare');
    const user = await TestUtils.seed.createUser();
    const someBuiltInExercise = await service.create({
      userId: null,
      parentExerciseId: null,
      name: 'Built-in',
      description: null,
      difficulty: null,
      params: [],
      equipment: null,
      images: [],
      copiedFromId: null,
      deletedAt: null,
      muscles: {
        primary: [],
        secondary: [],
      },
      isArchived: false,
    });
    const exercise: ExerciseUpsertDto = {
      id: null,
      name: 'Created exercise 1',
      description: 'My descriptions',
      difficulty: null,
      params: [],
      equipment: Equipment.Barbell,
      images: [],
      copiedFromId: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isArchived: false,
      muscles: {
        primary: [Muscle.Abductors],
        secondary: [Muscle.Glutes],
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
    exercise.description = 'Custom Description';
    exercise.updatedAt = new Date();
    exercise.equipment = Equipment.Backpack;
    exercise.muscles = {
      primary: [Muscle.Abdominals, Muscle.FrontDeltoids],
      secondary: [Muscle.Biceps, Muscle.Ankle],
    };
    exercise.copiedFromId = someBuiltInExercise.id;
    exercise.createdAt = TestUtils.time.getDayAgo(2);
    exercise.updatedAt = TestUtils.time.getDayAgo(1);
    exercise.deletedAt = TestUtils.time.getDayAgo(0.5);
    exercise.images = ['https://placehold.co/100x100.jpg', 'https://placehold.co/100x100.jpg'];
    // test
    const response = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });
    // check
    expect(response.status).to.eq(200);
    // Check all fields in the response
    const responseBody = response.body.items[0];
    expect(!!responseBody.id).to.eq(true);
    expect(responseBody.name).to.eq('Updated Exercise');
    expect(responseBody.description).to.eq('Custom Description');
    expect(responseBody.difficulty).to.eq(null);
    expect(responseBody.params).to.deep.eq([]);
    expect(responseBody.equipment).to.eq(Equipment.Backpack);
    expect(responseBody.images).to.deep.eq([
      'https://placehold.co/100x100.jpg',
      'https://placehold.co/100x100.jpg',
    ]);
    expect(responseBody.copiedFromId).to.eq(someBuiltInExercise.id);
    expect(!!responseBody.createdAt).to.eq(true);
    expect(responseBody.updatedAt).to.be.a('date');
    expect(responseBody.deletedAt).to.be.a('date');
    expect(responseBody.muscles.primary).to.deep.eq([
      Muscle.Abdominals,
      Muscle.FrontDeltoids,
    ]);
    expect(responseBody.muscles.secondary).to.deep.eq([
      Muscle.Biceps,
      Muscle.Ankle,
    ]);
    // Check all fields in the db
    const inserted = await service.get({ids: [responseBody.id], includeDeleted: true});
    console.log(inserted, responseBody.id);
    expect(inserted?.id).to.eq(responseBody.id);
    expect(inserted?.name).to.eq('Updated Exercise');
    expect(inserted?.description).to.eq('Custom Description');
    expect(inserted?.difficulty).to.eq(null);
    expect(inserted?.params).to.deep.eq([]);
    expect(inserted?.equipment).to.eq(Equipment.Backpack);
    expect(inserted?.images).to.deep.eq([
      'https://placehold.co/100x100.jpg',
      'https://placehold.co/100x100.jpg',
    ]);
    expect(inserted?.copiedFromId).to.eq(someBuiltInExercise.id);
    expect(inserted?.userId).to.eq(user.id);
    expect(inserted?.createdAt.toISOString()).to.eq(
      exercise.createdAt.toISOString()
    );
    expect(inserted?.updatedAt?.toISOString()).to.eq(
      exercise.updatedAt.toISOString()
    );
    expect(inserted?.deletedAt?.toISOString()).to.eq(
      exercise.deletedAt.toISOString()
    );
    expect(inserted?.muscles.primary).to.deep.eq([
      Muscle.Abdominals,
      Muscle.FrontDeltoids,
    ]);
    expect(inserted?.muscles.secondary).to.deep.eq([
      Muscle.Biceps,
      Muscle.Ankle,
    ]);
  });

  test('Cant update built-in exercises', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();
    const someBuiltInExercise = await service.create({
      userId: null,
      parentExerciseId: null,
      name: 'Built-in',
      description: null,
      difficulty: null,
      params: [],
      equipment: null,
      images: [],
      copiedFromId: null,
      deletedAt: null,
      muscles: {
        primary: [],
        secondary: [],
      },
      isArchived: false,
    });
    // test
    const response = await TestUtils.openApi.put('/exercises', user, {
      items: [someBuiltInExercise],
    });
    // check
    expect(response.status).to.eq(400);
    expect(response.body.error.code).to.eq(ApiErrorCode.ActionError);
    expect(response.body.error.actionErrorCode).to.eq(ActionErrorCode.NoOwnerShip);
  });

});
