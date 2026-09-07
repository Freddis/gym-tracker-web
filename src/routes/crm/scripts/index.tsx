import {createFileRoute} from '@tanstack/react-router';
import {ScriptRunPage} from '../../../frontend/crm/components/pages/Scripts/ScriptRunPage/ScriptRunPage';

export const Route = createFileRoute('/crm/scripts/')({
  component: ScriptRunPage,
});
