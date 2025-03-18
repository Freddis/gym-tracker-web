import {createAPIFileRoute} from '@tanstack/react-start/api';
import {readFileSync} from 'fs';

export const APIRoute = createAPIFileRoute('/api/swagger')({
  GET: async () => {
    const body = readFileSync('./src/routes/api/html/swagger.html');
    const res = new Response(body, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    return res;
  },
});
