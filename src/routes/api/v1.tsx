import {createAPIFileRoute} from '@tanstack/react-start/api';
import {openApiInstance} from '../../backend/utils/openApiInstance';
import {OpenApiTanstackStartWrapper} from 'strap-on-openapi';

const x = new OpenApiTanstackStartWrapper(openApiInstance);
export const APIRoute = x.createOpenApiRootRoute('/api/v1', createAPIFileRoute);
