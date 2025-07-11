import {createServerFileRoute} from '@tanstack/react-start/server';
import {openApi} from '../backend/utils/openApi';

const methods = openApi.wrappers.tanstackStart.createStoplightMethods('/schema');
export const ServerRoute = createServerFileRoute('/stoplight').methods(methods);

