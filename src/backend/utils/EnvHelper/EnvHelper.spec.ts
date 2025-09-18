import {expect} from 'chai';
import {describe, test} from 'vitest';
import {EnvHelper} from './EnvHelper';

describe(EnvHelper.name, () => {

  describe('Enum', () => {
    test('Can get value', async () => {
    // prepare
      enum Test {
        Key1 = 'Value1',
        Key2 = 'Value2'
      }
      process.env.test_enum = 'Value2';

    //test
      const result = EnvHelper.getEnumValue('test_enum', Test);
      expect(result).to.eq(Test.Key2);
    });

    test('Can get defaultValue', async () => {
      // prepare
      enum Test {
          Key1 = 'Value1',
          Key2 = 'Value2'
        }

      //test
      const result = EnvHelper.getEnumValue('something_that_doesnexist', Test, Test.Key1);
      expect(result).to.eq(Test.Key1);
    });


    test('Throws when value does not exist', async () => {
      // prepare
      enum Test {
        Key1 = 'Value1',
        Key2 = 'Value2'
      }
      //test
      expect(() => EnvHelper.getEnumValue('something_that_doesnexist', Test)).to.throw("doesn't exist");
    });

    test('Throws when value is not in the enum', async () => {
      // prepare
      enum Test {
        Key1 = 'Value1',
        Key2 = 'Value2'
      }
      process.env.test_wrong_enum = 'Value3';
      //test
      expect(() => EnvHelper.getEnumValue('test_wrong_enum', Test)).to.throw('is not in enum');
    });
  });

  describe('String', () => {
    test('Can get value', async () => {
      // prepare
      process.env.test_string = 'my_string_value';

      // test
      const result = EnvHelper.getString('test_string');
      expect(result).to.eq('my_string_value');
    });

    test('Can get defaultValue', async () => {
      // test
      const result = EnvHelper.getString('something_that_doesnexist', 'my_default_value');
      expect(result).to.eq('my_default_value');
    });


    test('Throws when value does not exist', async () => {
      // test
      expect(() => EnvHelper.getString('something_that_doesnexist')).to.throw("doesn't exist");
    });
  });

  describe('Number', () => {
    test('Can get value', async () => {
      // prepare
      process.env.my_test_number = '1233322';

      // test
      const result = EnvHelper.getNumber('my_test_number');
      expect(result).to.eq(1233322);
    });

    test('Can get defaultValue', async () => {
      // test
      const result = EnvHelper.getNumber('something_that_doesnexist', 66442131);
      expect(result).to.eq(66442131);
    });

    test('Throws when value does not exist', async () => {
      // test
      expect(() => EnvHelper.getNumber('something_that_doesnexist')).to.throw("doesn't exist");
    });

    test('Throws when value not number', async () => {
      process.env.bad_number = '123a';
      // test
      expect(() => EnvHelper.getNumber('bad_number')).to.throw('is not a number');
    });
  });

  describe('Boolean', () => {
    test('Can get value', async () => {
      // prepare
      process.env.my_test_boolean1 = 'true';
      process.env.my_test_boolean2 = 'false';

      // test
      const result = EnvHelper.getBoolean('my_test_boolean1');
      const result2 = EnvHelper.getBoolean('my_test_boolean2');
      expect(result).to.eq(true);
      expect(result2).to.eq(false);
    });

    test('Can get defaultValue', async () => {
      // test
      const result1 = EnvHelper.getBoolean('something_that_doesnexist', true);
      expect(result1).to.eq(true);

      const result2 = EnvHelper.getBoolean('something_that_doesnexist', false);
      expect(result2).to.eq(false);
    });


    test('Throws when value does not exist', async () => {
      // test
      expect(() => EnvHelper.getBoolean('something_that_doesnexist')).to.throw("doesn't exist");
    });

    test('Throws when value is not boolean', async () => {
      process.env.bad_boolean = '1';
      // test
      expect(() => EnvHelper.getBoolean('bad_boolean')).to.throw('has strange value');
    });
  });

});
