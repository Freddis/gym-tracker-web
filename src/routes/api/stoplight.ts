import {createAPIFileRoute} from '@tanstack/react-start/api';
import {readFileSync} from 'fs';

export const APIRoute = createAPIFileRoute('/api/stoplight')({
  GET: async () => {
    const body = readFileSync('./src/routes/api/html/stoplight.html');
    const res = new Response(body, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    return res;
  },
});
