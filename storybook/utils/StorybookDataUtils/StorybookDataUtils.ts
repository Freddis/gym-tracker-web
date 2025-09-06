import {AuthUser} from '../../../src/frontend/components/layout/AuthProvider/types/AuthUser';
import {Entry, Exercise, Workout, WorkoutType} from '../../../src/frontend/utils/openapi-client';
import {adduction} from './data/adduction';
import {barbellShrug} from './data/barbellShrug';
import {barbellSquat} from './data/barbellSquat';
import {benchPress} from './data/benchPress';
import {calfRaise} from './data/calfRaise';
import {deadLift} from './data/deadLift';
import {legExtension} from './data/legExtension';
import {pullUp} from './data/pullUp';

export class StorybookDataUtils {

  static getWorkoutTypeB(): WorkoutType {
    const type: WorkoutType = {
      id: 1,
      userId: 1,
      planIndex: null,
      planId: null,
      name: 'Leg Day',
      description: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      exercises: [
        {
          exercise: this.getExercise(),
          sets: [
            {
              reps: 12,
            },
            {
              reps: 12,
            },
            {
              reps: 12,
            },
            {
              reps: 12,
            },
          ],
          index: 0,
        },
        {
          exercise: this.getExercise(),
          sets: [
            {
              reps: 12,
            },
            {
              reps: 12,
            },
            {
              reps: 12,
            },
            {
              reps: 12,
            },
          ],
          index: 0,
        },
        {
          exercise: this.getExercise(),
          sets: [
            {
              reps: 12,
            },
            {
              reps: 12,
            },
            {
              reps: 12,
            },
            {
              reps: 12,
            },
          ],
          index: 0,
        },
      ],
    };
    return type;
  }
  static getWorkoutType(type: 'pull day'|'leg day' = 'pull day'): WorkoutType {
    if (type === 'pull day') {
      const type: WorkoutType = {
        id: 1,
        userId: 1,
        planIndex: null,
        planId: null,
        name: 'Pull Day',
        description: null,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        exercises: [
          {
            exercise: this.getExercise('pullUp'),
            sets: [
              {
                reps: 12,
              },
              {
                reps: 12,
              },
              {
                reps: 12,
              },
              {
                reps: 12,
              },
            ],
            index: 0,
          },
          {
            exercise: this.getExercise('barbellShrug'),
            sets: [
              {
                reps: 12,
              },
              {
                reps: 12,
              },
              {
                reps: 12,
              },
              {
                reps: 12,
              },
            ],
            index: 0,
          },
          {
            exercise: this.getExercise('benchPress'),
            sets: [
              {
                reps: 12,
              },
              {
                reps: 12,
              },
              {
                reps: 12,
              },
              {
                reps: 12,
              },
            ],
            index: 0,
          },
        ],
      };
      return type;
    }
    const legDay: WorkoutType = {
      id: 0,
      userId: 0,
      planIndex: null,
      planId: null,
      name: 'Leg day',
      description: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      exercises: [
        {
          exercise: this.getExercise('squat'),
          sets: [
            {
              reps: 10,
            },
            {
              reps: 10,
            },
            {
              reps: 10,
            },
            {
              reps: 10,
            },
          ],
          index: 0,
        },
        {
          exercise: this.getExercise('legExtension'),
          sets: [
            {
              reps: 10,
            },
            {
              reps: 10,
            },
            {
              reps: 10,
            },
            {
              reps: 10,
            },
          ],
          index: 0,
        },
        {
          exercise: this.getExercise('calfRaise'),
          sets: [
            {
              reps: 10,
            },
            {
              reps: 10,
            },
            {
              reps: 10,
            },
            {
              reps: 10,
            },
          ],
          index: 0,
        },
        {
          exercise: this.getExercise('deadLift'),
          sets: [
            {
              reps: 10,
            },
            {
              reps: 10,
            },
            {
              reps: 10,
            },
            {
              reps: 10,
            },
          ],
          index: 0,
        },
      ],
    };
    return legDay;
  }

  static getExercises(): Exercise[] {
    const map: Record<Exclude<Parameters<typeof this.getExercise>[0], undefined>, boolean> = {
      benchPress: true,
      barbellShrug: true,
      squat: true,
      legExtension: true,
      deadLift: true,
      calfRaise: true,
      adduction: true,
      pullUp: true,
    };
    return [
      ...Object.keys(map).map((key) => this.getExercise(key)),
    ];
  }
  static getEntry(): Entry {
    const entry: Entry = {
      id: 0,
      user: {
        ...this.getUser(),
        profilePicture: '',
      },
      type: 'Workout',
      workout: this.getWorkout(),
    };
    return entry;
  }

  static getUser(): AuthUser {
    const user: AuthUser = {
      id: 1,
      name: 'Alex Sarychev',
      email: 'test@example.com',
      // eslint-disable-next-line max-len
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyNS0wNS0yOFQxMzoyOToyMy44NDlaIiwiaWQiOjEsIm5hbWUiOiJBbGV4IFNhcnljaGV2IiwiZW1haWwiOiJmcmVkZGlzMzM2QGdtYWlsLmNvbSIsImlhdCI6MTc0ODQzODk2MywiZXhwIjoxNzU3MDc4OTYzfQ._9Ka2GlV9GQFRI7bdXZ8W_iedK2g76ix_W4YG7uCGDk',
    };
    return user;
  }

  static getImage(): string {
    return 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Barbell%2BBench%2BPress%2B(Flat_Overhand%2BGrip)-a.jpg';
  }

  static getExercise(
    type: 'benchPress' | 'barbellShrug' | 'squat'|'legExtension'|'deadLift'|'calfRaise'| 'adduction'| 'pullUp' = 'benchPress'
  ): Exercise {
    const map: Record<typeof type, Exercise> = {
      benchPress: benchPress,
      barbellShrug: barbellShrug,
      squat: barbellSquat,
      pullUp: pullUp,
      legExtension: legExtension,
      deadLift: deadLift,
      calfRaise: calfRaise,
      adduction: adduction,
    };
    return map[type];
  }

  static getEmptyWorkout(): Workout {
    const workout: Workout = {
      id: 10,
      typeId: 2,
      userId: 0,
      calories: 120,
      start: new Date(new Date().getTime() - 1000 * 60 * 60 * 15.62),
      end: new Date(new Date().getTime()),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      exercises: [],
    };
    return workout;
  }

  static getWorkout(): Workout {
    const workout: Workout = {
      id: 10,
      typeId: 2,
      userId: 0,
      calories: 120,
      start: new Date(new Date().getTime() - 1000 * 60 * 60 * 15.62),
      end: new Date(new Date().getTime()),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      exercises: [
        {
          id: 0,
          workoutId: 0,
          userId: 0,
          exerciseId: 0,
          createdAt: new Date(),
          updatedAt: null,
          exercise: this.getExercise(),
          sets: [
            {
              id: 0,
              exerciseId: 10,
              workoutId: 0,
              userId: 0,
              workoutExerciseId: 0,
              start: null,
              end: null,
              weight: 50,
              reps: 10,
              createdAt: new Date(),
              updatedAt: null,
            },
            {
              id: 0,
              exerciseId: 10,
              workoutId: 0,
              userId: 0,
              workoutExerciseId: 0,
              start: null,
              end: null,
              weight: 50,
              reps: 8,
              createdAt: new Date(),
              updatedAt: null,
            },
          ],
        },
      ],
    };
    return workout;
  }
}
