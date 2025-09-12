export interface ZodTranslations {
  errors: {
    invalid_type: string;
    invalid_type_received_undefined: string;
    invalid_type_received_null: string;
    invalid_literal: string;
    unrecognized_keys: string;
    invalid_union: string;
    invalid_union_discriminator: string;
    invalid_enum_value: string;
    invalid_arguments: string;
    invalid_return_type: string;
    invalid_date: string;
    custom: string;
    invalid_intersection_types: string;
    not_multiple_of: string;
    not_finite: string;

    invalid_string: {
      email: string;
      url: string;
      uuid: string;
      cuid: string;
      regex: string;
      datetime: string;
      startsWith: string;
      endsWith: string;
    };

    too_small: {
      array: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
      string: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
      number: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
      set: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
      date: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
    };

    too_big: {
      array: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
      string: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
      number: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
      set: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
      date: {
        exact: string;
        inclusive: string;
        not_inclusive: string;
      };
    };
  };

  validations: {
    email: string;
    url: string;
    uuid: string;
    cuid: string;
    regex: string;
    datetime: string;
  };

  types: {
    function: string;
    number: string;
    string: string;
    nan: string;
    integer: string;
    float: string;
    boolean: string;
    date: string;
    bigint: string;
    undefined: string;
    symbol: string;
    null: string;
    array: string;
    object: string;
    unknown: string;
    promise: string;
    void: string;
    never: string;
    map: string;
    set: string;
  };
}
