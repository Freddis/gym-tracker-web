import {Muscle} from '../../src/common/enums/Muscle';
import {AuthUser} from '../../src/frontend/components/layout/AuthProvider/types/AuthUser';
import {Exercise, Workout} from '../../src/frontend/openapi-client';

export class StorybookDataUtils {
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

  static getExercise(): Exercise {
    const exercise: Exercise = {
      id: 10,
      name: 'Barbell Bench Press (Flat, Overhand Grip)',
      description: `<1>Lie back on the decline bench. Hold the barbell with overhand Grip.
       Distance between your hands is slighter wider than shoulder width. Hold the barbell with arms fully extended. 
       The barbell is directly above the center of your chest.
      <2>Lower the barbell towards your lower chest as you keep your elbows close to your body. 
      The barbell should slightly Touch your chest at the end of the movement. 
      Refrain from bouncing the barbell off your chest. Hold for a brief moment. 
      Return to starting position. Keep your entire back on the bench at all times. Refrain from any leg movements.`.replaceAll('\n', ''),
      difficulty: null,
      images: [
        'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Barbell%2BBench%2BPress%2B(Flat_Overhand%2BGrip)-a.jpg',
        'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Barbell%2BBench%2BPress%2B(Flat_Overhand%2BGrip)-b.jpg',
      ],
      params: [],
      userId: null,
      copiedFromId: null,
      parentExerciseId: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      equipment: null,
      variations: [],
      muscles: {
        primary: [Muscle.Pecs],
        secondary: [Muscle.FrontDeltoids, Muscle.Triceps],
      },
    };
    return exercise;
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
