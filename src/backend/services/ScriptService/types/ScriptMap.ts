import {IScript} from './IScript';
import {ScriptType} from './ScriptType';

export type ScriptMap = {
  [TKey in ScriptType]: IScript<TKey>
};
