import {ScriptType} from './ScriptType';

export interface IScript<TType extends ScriptType> {
  getType(): TType
  getDescription(): string
  run(): Promise<boolean>
}
