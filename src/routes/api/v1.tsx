import {createAPIFileRoute} from '@tanstack/react-start/api';
import {openApiInstance} from '../../server/open-api/openApiInstance';
import {json} from '@tanstack/react-start';

export const APIRoute = createAPIFileRoute('/api/v1')({
  GET: async (ctx) => {
    const response = await openApiInstance.processRootRoute('/api/v1', ctx.request);
    return json(response, {
      status: response.status ?? 200,
    });
  },
});
