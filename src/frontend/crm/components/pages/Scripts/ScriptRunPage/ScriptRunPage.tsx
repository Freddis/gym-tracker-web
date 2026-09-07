import {FC, useEffect, useState} from 'react';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppSelect} from '../../../../../common/components/atoms/AppSelect/AppSelect';
import {SelectValue} from '../../../../../common/components/atoms/AppSelect/types/SelectValue';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {getCrmScripts, postCrmScriptsRun, ScriptType} from '../../../../../common/utils/openapi-client';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';

export const ScriptRunPage: FC = () => {
  const toasts = useToasts();
  const {showToastsAndSetErrors} = useResponseErrors();
  const [selected, setSelected] = useState<string | undefined>();
  const [running, setRunning] = useState(false);
  const response = useQuery({
    queryFn: () => getCrmScripts(),
    queryKey: ['scripts'],
    placeholderData: keepPreviousData,
  });

  const scripts = (response.data && !response.data.error ? response.data.data.items : []).map((script) => ({
    type: String(script.type),
    description: script.description,
  }));
  useEffect(() => {
    if (!selected && scripts[0]) {
      setSelected(scripts[0].type);
    }
  }, [scripts, selected]);

  const options: SelectValue<string>[] = scripts.map((script) => ({
    value: script.type,
    label: script.type,
  }));
  const selectedScript = scripts.find((script) => script.type === selected);

  const onRun = async () => {
    if (!selected || running) {
      return;
    }
    setRunning(true);
    const result = await postCrmScriptsRun({
      body: {
        type: selected as ScriptType,
      },
    });
    setRunning(false);
    if (showToastsAndSetErrors(result)) {
      return;
    }
    if (result.data?.success) {
      toasts.addSuccess('Script completed successfully');
      return;
    }
    toasts.addDanger('Script finished unsuccessfully');
  };

  return (
    <>
      <AppBlockHeader className="text-left">Scripts</AppBlockHeader>
      {response.isLoading && <AppSpinner/>}
      {response.data?.error && (
        <AppApiErrorDisplay error={response.data.error.error}/>
      )}
      {response.data && !response.data.error && (
        <AppBlock className="w-full">
          <div className="flex flex-col gap-3">
            <AppLabel>Script</AppLabel>
            <AppSelect
              options={options}
              value={selected}
              onChange={setSelected}
            />
            {scripts.length === 0 && (
              <p className="text-sm opacity-80">No scripts are registered</p>
            )}
            {selectedScript && (
              <p className="text-sm opacity-80">{selectedScript.description}</p>
            )}
            <div>
              <AppButton onClick={onRun} disabled={running || !selected}>
                {running ? 'Running...' : 'Run'}
              </AppButton>
            </div>
          </div>
        </AppBlock>
      )}
    </>
  );
};
