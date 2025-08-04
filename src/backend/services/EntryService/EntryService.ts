import {PaginatedResult} from '../ApiService/types/PaginatedResponse';
import {User} from '../UserService/types/User';
import {UserService} from '../UserService/UserService';
import {WorkoutService} from '../WorkoutService/WorkoutService';
import {Entry} from './types/Entry';
import {EntryType} from './types/EntryType';

export class EntryService {
  protected workoutService: WorkoutService;
  protected userService: UserService;

  constructor(userService: UserService, workoutService: WorkoutService) {
    this.workoutService = workoutService;
    this.userService = userService;
  }

  async getAll(params?: {page?: number, perPage?: number, type?: EntryType}): Promise<PaginatedResult<Entry>> {
    const workouts = await this.workoutService.getAll(params);
    const userIds = workouts.items.map((x) => x.userId);
    const users = await this.userService.getAll({ids: userIds});
    const userMap = users.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, User>());
    const getOrThrow = <T>(map: Map<number, T>, key: number): T => {
      const x = map.get(key);
      if (!x) {
        throw new Error(`Exercise '${key}' not found`);
      }
      return x;
    };
    //todo: placeholder
    if (params?.type === EntryType.Weight) {
      const result: PaginatedResult<Entry> = {
        items: [],
        info: {
          page: 1,
          count: 0,
          pageSize: 10,
        },
      };
      return result;
    }
    const items: Entry[] = workouts.items.map((workout) => ({
      id: workout.id,
      type: EntryType.Workout,
      workout: workout,
      user: getOrThrow(userMap, workout.userId),
    }));

    const result: PaginatedResult<Entry> = {
      items,
      info: workouts.info,
    };
    return result;
  }
}
