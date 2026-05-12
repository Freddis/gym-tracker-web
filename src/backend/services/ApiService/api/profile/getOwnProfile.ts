import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {RouteTag} from '../../types/RouteTag';
import {profileValidator} from './validators/profileValidator';

export const getOwnProfile = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on user profile',
  path: '/',
  operationId: 'getOwnProfile',
  tags: [RouteTag.Profile],
  validators: {
    response: profileValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.profile.getProfile(ctx.viewer.id);
    return result;
  },
});
