import {createAPIFileRoute} from '@tanstack/react-start/api';
import {readFileSync} from 'fs';

export const APIRoute = createAPIFileRoute('/api/openapi')({
  GET: () => {
    const body = readFileSync('./src/routes/api/html/openapi.yml');
    const res = new Response(body, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    return res;
  },
});
