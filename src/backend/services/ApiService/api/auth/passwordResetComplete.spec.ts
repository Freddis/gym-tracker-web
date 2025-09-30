import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ActionErrorCode} from '../../types/ActionErrorCode';
import {sign} from 'jsonwebtoken';

describe('passwordResetComplete', async () => {

  test('Can finalize password reset', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();

    //test
    const startResponse = await TestUtils.openApi.post('/auth/password-reset', {
      email: user.email,
    });
    expect(startResponse.status, 'Password reset request should go through').to.eq(200);
    const emailService = await TestUtils.business.getFactory().email();
    const lastSent = emailService.getLastEmail();
    const match = lastSent?.body.match(/<a[^>]*href="([^"]+)"/i);
    if (!match) {
      throw new Error("Can't obtain password reset link");
    }
    const href = match[1];
    const parts = href?.split('/');
    const token = parts?.reverse().at(0);
    if (!token) {
      throw new Error("Can't obtain sent token");
    }
    const actionResponse = await TestUtils.openApi.post('/auth/password-reset-complete', {
      token: token,
      password: 'notDefaultPassword123',
      passwordConfirmation: 'notDefaultPassword123',
    });

    //check
    expect(actionResponse.status, 'Password reset response should have good HTTP status').to.eq(200);
    expect(actionResponse.body.id, 'Password reset response should return user fields: id').to.eq(user.id);
    expect(actionResponse.body.email, 'Password reset response should return user fields: email').to.eq(user.email);
    expect(actionResponse.body.name, 'Password reset response should return user fields: name').to.eq(user.name);
    const authService = await TestUtils.business.getFactory().auth();
    expect(async () => {
      const loggedIn = await authService.login(user.email, 'notDefaultPassword123');
      expect(loggedIn.id, 'Logging in with the new password returns the same user').to.eq(user.id);
    }, 'Should be able to login with the new password').not.to.throw();

    const response = await TestUtils.openApi.get('/entries/own', {
      Authorization: `Bearer ${actionResponse.body.jwt}`,
    });
    expect(response.status, 'Issued JWT token should pass authentication').to.eq(200);
  });

  test("Expired tokens don't work", async () => {
    // prepare
    const user = await TestUtils.seed.createUser();
    const token = sign(
      {
        time: new Date().toISOString(),
        email: user.email,
      },
        TestUtils.business.getFactory().getConfig().services.auth.jwtSecret,
      {
        expiresIn: 1,
      });

    // test
    const actionResponse = await TestUtils.openApi.post('/auth/password-reset-complete', {
      token: token,
      password: '1q2w3e4rDD',
      passwordConfirmation: '1q2w3e4rDD',
    });

    //check
    expect(actionResponse.status).to.eq(200);
    await new Promise((res) => setTimeout(res, 1000));

    const actionResponse2 = await TestUtils.openApi.post('/auth/password-reset-complete', {
      token: token,
      password: '1q2w3e4rDD',
      passwordConfirmation: '1q2w3e4rDD',
    });
    expect(actionResponse2.status).to.eq(400);
    expect(actionResponse2.body.error.code).to.eq(ApiErrorCode.ActionError);
    expect(actionResponse2.body.error.actionErrorCode).to.eq(ActionErrorCode.PasswordResetTokenExpired);
    expect(actionResponse2.body.error.humanReadable).to.eq('Password reset token expired');
  });

});
