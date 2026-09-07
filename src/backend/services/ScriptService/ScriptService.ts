import {Logger} from '../../utils/Logger/Logger';
import {IScript} from './types/IScript';
import {ScriptInfo} from './types/ScriptInfo';
import {ScriptMap} from './types/ScriptMap';
import {ScriptType} from './types/ScriptType';

export class ScriptService {
  protected scripts: ScriptMap;
  protected logger: Logger;

  constructor(scripts: ScriptMap) {
    this.scripts = scripts;
    this.logger = new Logger(ScriptService.name);
  }

  getScripts(): ScriptInfo[] {
    return this.getAll().map((script) => ({
      type: script.getType(),
      description: script.getDescription(),
    }));
  }

  async run(type: ScriptType): Promise<boolean> {
    const script = this.scripts[type];
    this.logger.info(`Running script ${type}`);
    const result = await script.run();
    this.logger.info(`Script ${type} finished`, {success: result});
    return result;
  }

  protected getAll(): IScript<ScriptType>[] {
    return Object.values(this.scripts);
  }
}
