import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {ActionErrorCode} from '../../types/ActionErrorCode';

describe('deleteExercise', async () => {
  const service = await TestUtils.business.getFactory().exercise();

  test('Only authorized users can delete', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();
    const exercise = await service.createForUser(user.id, {
      params: [],
      deletedAt: null,
      name: 'Exercise For Deletion',
      description: null,
      difficulty: null,
      equipment: null,
      images: [],
      copiedFromId: null,
      parentExerciseId: null,
      muscles: {
        primary: [],
        secondary: [],
      },
    });
    // test
    const actionResponse = await TestUtils.openApi.delete(`/exercises/${exercise.id}`);
    expect(actionResponse.status).to.eq(401);
  });

  test('Can delete exercise', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();
    const exercise = await service.createForUser(user.id, {
      params: [],
      deletedAt: null,
      name: 'Exercise For Deletion',
      description: null,
      difficulty: null,
      equipment: null,
      images: [],
      copiedFromId: null,
      parentExerciseId: null,
      muscles: {
        primary: [],
        secondary: [],
      },
    });
    // pre-check
    const response = await TestUtils.openApi.get(`/exercises/${exercise.id}`);
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq('Exercise For Deletion');
    expect(response.body.userId).to.eq(user.id);
    // test

    const actionResponse = await TestUtils.openApi.deleteWithUser(`/exercises/${exercise.id}`, user);
    expect(actionResponse.status).to.eq(200);

    // check
    const checkResponse = await TestUtils.openApi.get(`/exercises/${exercise.id}`);
    expect(checkResponse.status, 'Exercise should not be found upon request').to.eq(404);
  });

  test('Cannot delete exercises that belong to somebody else', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();
    const user2 = await TestUtils.seed.createUser();
    const exercise = await service.createForUser(user.id, {
      params: [],
      deletedAt: null,
      name: 'Exercise For Deletion',
      description: null,
      difficulty: null,
      equipment: null,
      images: [],
      copiedFromId: null,
      parentExerciseId: null,
      muscles: {
        primary: [],
        secondary: [],
      },
    });
    // pre-check
    const response = await TestUtils.openApi.get(`/exercises/${exercise.id}`);
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq('Exercise For Deletion');
    expect(response.body.userId).to.eq(user.id);
    // test

    const actionResponse = await TestUtils.openApi.deleteWithUser(`/exercises/${exercise.id}`, user2);
    expect(actionResponse.status).to.eq(400);
    expect(actionResponse.body.error.code).to.eq('ActionError');
    expect(actionResponse.body.error.actionErrorCode).to.eq(ActionErrorCode.NoOwnerShip);
    expect(actionResponse.body.error.humanReadable).to.eq("You don't have ownership of that object");

    // check
    const checkResponse = await TestUtils.openApi.get(`/exercises/${exercise.id}`);
    expect(checkResponse.status, 'Exercise still should exist').to.eq(200);
  });

});
