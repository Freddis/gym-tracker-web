import {createServerFileRoute} from '@tanstack/react-start/server';
import {openApiInstance} from '../backend/utils/openApiInstance';

const methods = openApiInstance.wrappers.tanstackStart.createShemaMethods();
export const ServerRoute = createServerFileRoute('/schema').methods(methods);
