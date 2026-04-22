import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {array, nativeEnum, object, union} from 'zod';
import {EntryType} from '../../../EntryService/types/EntryType';

export const getOwnEntryDates = RouteFactory.createRoute({
  type: ApiRouteType.User,
  method: OpenApiMethod.GET,
  path: '/own/dates',
  description: 'Returns the list of days when entries were logged',
  validators: {
    query: object({
      date: RouteFactory.validators.strings.datetime.openapi({description: 'Date'}),
      type: union([
        nativeEnum(EntryType).transform((x) => [x]),
        nativeEnum(EntryType).array(),
      ]).optional().openapi({description: 'Filters excercises by type.'}),
    }),
    response: array(
      object({
        value: RouteFactory.validators.strings.datetime.openapi({description: 'Date'}),
      }).openapi({description: 'Date List Item'}),
    ).openapi({description: 'List of dates. Workout about bug in array transformation in @hey-api/openapi-ts', ref: 'DateList'}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.getDates(ctx.viewer.id, ctx.params.query);
    return result.map((x) => ({value: x}));
  },
});
