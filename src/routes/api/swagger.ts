import {createAPIFileRoute} from '@tanstack/react-start/api';
import {OpenApiTanstackStartWrapper} from 'strap-on-openapi';
import {openApiInstance} from '../../backend/utils/openApiInstance';

const wrapper = new OpenApiTanstackStartWrapper(openApiInstance);
export const APIRoute = wrapper.createSwaggerRoute('/api/openapi', '/api/swagger', createAPIFileRoute);
