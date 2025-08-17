import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {TestUtils} from 'src/backend/utils/TestUtils/TestUtils';
import {Equipment} from 'src/backend/types/Equipment';
import {Muscle} from 'src/backend/types/Muscle';
import {WorkoutUpsertDto} from 'src/frontend/utils/openapi-client';

await TestUtils.seed.wipeDb();
const benchPress = await TestUtils.seed.createExercise({
  name: 'Bench press',
  equipment: Equipment.Bench,
  muscles: {
    primary: [Muscle.Pecs],
    secondary: [Muscle.Triceps, Muscle.FrontDeltoids],
  },
  images: ['/images/exercises/Bench_Press.jpg'],
});

const bicepsCurl = await TestUtils.seed.createExercise({
  name: 'Biceps curl',
  images: ['/images/exercises/Dumbbell_Biceps_Curl.jpg'],
  equipment: Equipment.Dumbbell,
  muscles: {
    primary: [Muscle.Biceps],
    secondary: [Muscle.WristFlexors, Muscle.LowerBack, Muscle.FrontDeltoids],
  },
});

const tommy = await TestUtils.seed.createUser({
  email: 'tommy@vercetti.com',
  name: 'Tommy Vercetti',
  password: 'password1234',
});

const workoutService = await globalServiceFactory.getWorkoutService();
const start = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3);
const workout: WorkoutUpsertDto = {
  typeId: null,
  calories: 100,
  start: start,
  end: new Date(start.getTime() + 1000 * 60 * 73.2),
  createdAt: start,
  updatedAt: null,
  deletedAt: null,
  exercises: [
    {
      exerciseId: bicepsCurl.id,
      createdAt: start,
      updatedAt: null,
      sets: [
        {
          start: null,
          end: null,
          weight: 35,
          reps: 12,
          createdAt: start,
          updatedAt: null,
        },
        {
          start: null,
          end: null,
          weight: 33,
          reps: 12,
          createdAt: start,
          updatedAt: null,
        },
        {
          start: null,
          end: null,
          weight: 30,
          reps: 12,
          createdAt: start,
          updatedAt: null,
        },
      ],
    },
    {
      exerciseId: benchPress.id,
      createdAt: start,
      updatedAt: null,
      sets: [
        {
          start: null,
          end: null,
          weight: 95,
          reps: 12,
          createdAt: start,
          updatedAt: null,
        },
        {
          start: null,
          end: null,
          weight: 95,
          reps: 10,
          createdAt: start,
          updatedAt: null,
        },
        {
          start: null,
          end: null,
          weight: 95,
          reps: 8,
          createdAt: start,
          updatedAt: null,
        },
      ],
    },
  ],
};
await workoutService.upsert(tommy.id, [workout]);
await globalServiceFactory.cleanup();
