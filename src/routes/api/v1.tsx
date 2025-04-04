import {createAPIFileRoute} from '@tanstack/react-start/api';
import {openApiInstance} from '../../backend/utils/openApiInstance';
import {
  OpenApiTanstackStartWrapper,
} from 'src/backend/services/OpenApiService/services/OpenApiTanstackStartWrapper/OpenApiTanstackStartWrapper';

const x = new OpenApiTanstackStartWrapper(openApiInstance);
export const APIRoute = x.createOpenApiRootRoute('/api/v1', createAPIFileRoute);
