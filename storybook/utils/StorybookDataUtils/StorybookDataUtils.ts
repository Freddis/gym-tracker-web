import {AuthUser} from '../../../src/frontend/common/components/layout/AuthProvider/types/AuthUser';
import {
  Entry,
  Exercise,
  Weight,
  Workout,
  WorkoutType,
  Image,
  PostEntry,
  User,
  Settings,
  EntryVisibility,
  Gender,
  WeightUnit,
  DistanceUnit,
  Country,
  HeightUnit,
  TemperatureUnit,
  Profile,
  CalorieGoal,
  GoalType,
} from '../../../src/frontend/common/utils/openapi-client';
import {adduction} from './data/adduction';
import {barbellShrug} from './data/barbellShrug';
import {barbellSquat} from './data/barbellSquat';
import {benchPress} from './data/benchPress';
import {calfRaise} from './data/calfRaise';
import {deadLift} from './data/deadLift';
import {legExtension} from './data/legExtension';
import {pullUp} from './data/pullUp';
import {StorybookFoodUtils} from './StorybookFoodUtils';

export class StorybookDataUtils {
  static food = StorybookFoodUtils;

  static getImage(): Image {
    const image: Image = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      url: this.getExerciseImageUrl(),
    };
    return image;
  }

  static getWorkoutType(
    type: 'pull day' | 'leg day' = 'pull day'
  ): WorkoutType {
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
    const map: Record<
      Exclude<Parameters<typeof this.getExercise>[0], undefined>,
      boolean
    > = {
      benchPress: true,
      barbellShrug: true,
      squat: true,
      legExtension: true,
      deadLift: true,
      calfRaise: true,
      adduction: true,
      pullUp: true,
    };
    return [...Object.keys(map).map((key) => this.getExercise(key))];
  }
  static getEntry(): Entry {
    const entry: Entry = {
      id: '9317a469-3d8c-4853-bdf4-83b87197a5c9',
      time: new Date(),
      user: this.getUser(),
      type: 'Workout',
      workout: this.getWorkout(),
      visibility: 'Public',
      createdAt: new Date(),
      deletedAt: null,
      updatedAt: null,
      title: null,
      note: null,
      externalId: null,
      externalSource: null,
    };
    return entry;
  }

  static getPostEntry(): PostEntry {
    const postEntry: PostEntry = {
      id: '4e61f548-a174-455c-b92e-405f9cb04d95',
      user: this.getUser(),
      visibility: 'Public',
      time: new Date(),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      title: null,
      note: null,
      externalId: null,
      externalSource: null,
      type: 'Post',
      image: this.getImage(),
    };
    return postEntry;
  }

  static getSettings(): Settings {
    const settings: Settings = {
      name: 'John Doe',
      note: null,
      height: 180,
      weight: 75.2,
      gender: Gender.MALE,
      birthDate: new Date(),
      country: Country.US,
      units: {
        weight: WeightUnit.KG,
        distance: DistanceUnit.KM,
        height: HeightUnit.CM,
        temperature: TemperatureUnit.C,
      },
      security: {
        email: 'test@example.com',
        visibility: EntryVisibility.PUBLIC,
      },
      profilePicture: null,
    };
    return settings;
  }
  static getProfile(): Profile {
    const profile: Profile = {
      user: this.getUser(),
      goals: [{
        type: GoalType.CALORIE,
        calorie: this.getCalorieGoal(),
      }],
      note: 'Test note',
      height: 180,
      weight: 75.2,
      age: 30,
      gender: Gender.MALE,
      units: {
        weight: WeightUnit.KG,
        distance: DistanceUnit.KM,
        height: HeightUnit.CM,
        temperature: TemperatureUnit.C,
      },
      consumedCalories: {
        calories: 1300,
        carbs: 30,
        protein: 20,
        fat: 64,
      },
      consumedCaloriesHistory: {
        data: [],
        size: 0,
      },
    };
    return profile;
  }

  static getCalorieGoal(): CalorieGoal {
    const calorieGoal: CalorieGoal = {
      calories: 1000,
      carbs: 100,
      protein: 100,
      fat: 100,
      start: new Date(),
      end: null,
    };
    return calorieGoal;
  }

  static getUser(): User {
    const user: User = {
      id: 1,
      name: 'John Doe',
      profilePicture: {
        id: '321e4567-e89b-12d3-a456-426614174000',
        url: '/images/users/user1.jpg',
      },
    };
    return user;
  }

  static getAuthUser(): AuthUser {
    const user: AuthUser = {
      ...this.getUser(),
      email: 'test@example.com',
      // eslint-disable-next-line max-len
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyNS0wNS0yOFQxMzoyOToyMy44NDlaIiwiaWQiOjEsIm5hbWUiOiJBbGV4IFNhcnljaGV2IiwiZW1haWwiOiJmcmVkZGlzMzM2QGdtYWlsLmNvbSIsImlhdCI6MTc0ODQzODk2MywiZXhwIjoxNzU3MDc4OTYzfQ._9Ka2GlV9GQFRI7bdXZ8W_iedK2g76ix_W4YG7uCGDk',
    };
    return user;
  }

  static getExerciseImageUrl(): string {
    return 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Barbell%2BBench%2BPress%2B(Flat_Overhand%2BGrip)-a.jpg';
  }

  static getExercise(
    type:
      | 'benchPress'
      | 'barbellShrug'
      | 'squat'
      | 'legExtension'
      | 'deadLift'
      | 'calfRaise'
      | 'adduction'
      | 'pullUp' = 'benchPress'
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

  static getWeight(): Weight {
    const weight: Weight = {
      id: 1,
      externalId: null,
      userId: 1,
      weight: 75.2,
      units: 'kg',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      history: [],
      historySize: 0,
    };
    return weight;
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
          exercise: this.getExercise(),
          sets: [
            {
              start: null,
              end: null,
              weight: 50,
              reps: 10,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
          ],
        },
        {
          exercise: this.getExercise('pullUp'),
          sets: [
            {
              start: null,
              end: null,
              weight: 50,
              reps: 10,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
          ],
        },
        {
          exercise: this.getExercise('barbellShrug'),
          sets: [
            {
              start: null,
              end: null,
              weight: 50,
              reps: 10,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
          ],
        },
        {
          exercise: this.getExercise('calfRaise'),
          sets: [
            {
              start: null,
              end: null,
              weight: 50,
              reps: 10,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
          ],
        },
        {
          exercise: this.getExercise('legExtension'),
          sets: [
            {
              start: null,
              end: null,
              weight: 50,
              reps: 10,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
          ],
        },
        {
          exercise: this.getExercise('deadLift'),
          sets: [
            {
              start: null,
              end: null,
              weight: 50,
              reps: 10,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
          ],
        },
        {
          exercise: this.getExercise('adduction'),
          sets: [
            {
              start: null,
              end: null,
              weight: 50,
              reps: 10,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
            {
              start: null,
              end: null,
              weight: 50,
              reps: 8,
            },
          ],
        },
      ],
    };
    return workout;
  }
}
