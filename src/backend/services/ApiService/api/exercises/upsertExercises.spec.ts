import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {ExerciseUpsertDto} from '../../../ExerciseService/types/ExerciseUpsertDto';
import {Equipment} from '../../../../types/Equipment';
import {Muscle} from '../../../../types/Muscle';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ActionErrorCode} from '../../types/ActionErrorCode';
import {randomUUID} from 'node:crypto';

describe('upsertExercises', async () => {
  const service = await TestUtils.business.getFactory().exercise();

  test('Can create minimal exercise', async () => {
    console.log('Prepare');
    const user = await TestUtils.seed.createUser();
    const exercise: ExerciseUpsertDto = {
      id: randomUUID(),
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
      id: randomUUID(),
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
      images: [],
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
      id: randomUUID(),
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
      images: [],
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
    exercise.images = [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      },
    ];
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
    // ids sent from the device name the uploaded files, while the ids of the images are given by the server
    expect(responseBody.images).to.have.length(2);
    expect(responseBody.images[0].url).to.eq(
      'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
    );
    expect(responseBody.images[1].url).to.eq(
      'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
    );
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
    expect(inserted?.images).to.deep.eq(responseBody.images);
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

  test('Uploads an image only once when it is sent again', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();
    const exercise: ExerciseUpsertDto = {
      id: randomUUID(),
      name: 'Exercise with a resent image',
      description: null,
      difficulty: null,
      params: [],
      equipment: null,
      images: [
        {
          id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
          data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        },
      ],
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
    const created = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });
    expect(created.status).to.eq(200);
    // test
    const response = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });
    // check
    expect(response.status).to.eq(200);
    expect(response.body.items[0].images).to.have.length(1);
    expect(response.body.items[0].images[0].url).to.eq(
      'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/cccccccc-cccc-cccc-cccc-cccccccccccc'
    );
    // the same file is stored once, so the exercise stays linked to the image created by the first request
    expect(response.body.items[0].images[0].id).to.eq(created.body.items[0].images[0].id);
    const inserted = await service.getById(exercise.id);
    expect(inserted?.images).to.deep.eq(response.body.items[0].images);
  });

  test('Detaches an image that is marked as deleted', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();
    const exercise: ExerciseUpsertDto = {
      id: randomUUID(),
      name: 'Exercise with a deleted image',
      description: null,
      difficulty: null,
      params: [],
      equipment: null,
      images: [
        {
          id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
          data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        },
      ],
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
    const created = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });
    expect(created.body.items[0].images).to.have.length(1);
    // test
    exercise.images = [{id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', isDeleted: true}];
    const response = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });
    // check
    expect(response.status).to.eq(200);
    expect(response.body.items[0].images).to.deep.eq([]);
    const inserted = await service.getById(exercise.id);
    expect(inserted?.images).to.deep.eq([]);
  });

  test('Skips an image that was never uploaded', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();
    const exercise: ExerciseUpsertDto = {
      id: randomUUID(),
      name: 'Exercise with an unknown image',
      description: null,
      difficulty: null,
      params: [],
      equipment: null,
      images: [{id: randomUUID()}],
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
    // test
    const response = await TestUtils.openApi.put('/exercises', user, {
      items: [exercise],
    });
    // check
    expect(response.status).to.eq(200);
    expect(response.body.items[0].images).to.deep.eq([]);
    const inserted = await service.getById(exercise.id);
    expect(inserted?.images).to.deep.eq([]);
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
