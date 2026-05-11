import {BaseEntry, PostEntry} from '../EntryService/types/Entry';
import {EntryType} from '../EntryService/types/EntryType';
import {IEntryService} from '../EntryService/types/IEntryService';

export class PostService implements IEntryService<EntryType.Post> {
  async upsertOne(): Promise<{id: number; value: null;}> {
    return {id: 0, value: null};
  }
  getRelationKey(): null {
    return null;
  }
  construct(row: BaseEntry): PostEntry & {type: EntryType.Post;} {
    return {
      ...row,
      type: EntryType.Post,
    };
  }
  loadMap(): Promise<Map<number, null>> {
    return Promise.resolve(new Map());
  }

}
