import {createServerFileRoute} from '@tanstack/react-start/server';
import {openApiInstance} from '../backend/utils/openApiInstance';


const methods = openApiInstance.wrappers.tanstackStart.createSwaggerMethods('/schema');
export const ServerRoute = createServerFileRoute('/swagger').methods(methods);

