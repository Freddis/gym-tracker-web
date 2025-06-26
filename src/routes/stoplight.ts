import {createServerFileRoute} from '@tanstack/react-start/server';
import {openApiInstance} from '../backend/utils/openApiInstance';

const methods = openApiInstance.wrappers.tanstackStart.createStoplightMethods('/schema');
export const ServerRoute = createServerFileRoute('/stoplight').methods(methods);

