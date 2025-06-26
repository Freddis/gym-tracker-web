import {createServerFileRoute} from '@tanstack/react-start/server';
import {openApiInstance} from '../backend/utils/openApiInstance';

const methods = openApiInstance.wrappers.tanstackStart.getOpenApiRootMethods();
export const ServerRoute = createServerFileRoute('/api').methods(methods);

