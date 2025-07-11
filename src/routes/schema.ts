import {createServerFileRoute} from '@tanstack/react-start/server';
import {openApi} from '../backend/utils/openApi';

const methods = openApi.wrappers.tanstackStart.createShemaMethods();
export const ServerRoute = createServerFileRoute('/schema').methods(methods);
