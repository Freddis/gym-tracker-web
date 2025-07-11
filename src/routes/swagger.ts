import {createServerFileRoute} from '@tanstack/react-start/server';
import {openApi} from '../backend/utils/openApi';


const methods = openApi.wrappers.tanstackStart.createSwaggerMethods('/schema');
export const ServerRoute = createServerFileRoute('/swagger').methods(methods);

