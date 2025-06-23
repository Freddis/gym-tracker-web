import {createAPIFileRoute} from '@tanstack/react-start/api';
import {openApiInstance} from '../../backend/utils/openApiInstance';
import {OpenApiTanstackStartWrapper} from 'strap-on-openapi';

const wrapper = new OpenApiTanstackStartWrapper(openApiInstance);
export const APIRoute = wrapper.createOpenApiRootRoute('/api/v1', createAPIFileRoute);
