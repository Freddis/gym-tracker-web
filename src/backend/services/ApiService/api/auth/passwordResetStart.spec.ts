import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';

describe('passwordResetStart', async () => {

  test('Can start reset password', async () => {
    // prepare
    const user = await TestUtils.seed.createUser();

    // test
    const actionResponse = await TestUtils.openApi.post('/auth/password-reset', {
      email: user.email,
    });

    //check
    expect(actionResponse.status).to.eq(200);
    expect(actionResponse.body.success).to.eq(true);
    const emailService = await TestUtils.business.getFactory().email();
    const lastSent = emailService.getLastEmail();
    expect(lastSent).not.to.eq(null);
    expect(lastSent?.to).to.eq(user.email);
    expect(lastSent?.subject).to.eq('Password reset');
    expect(lastSent?.body).to.include('http://localhost:3000/auth/password-reset-complete');
  });

});
