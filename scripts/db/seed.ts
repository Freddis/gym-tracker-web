import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {TestUtils} from 'src/backend/utils/TestUtils/TestUtils';
import {Equipment} from 'src/backend/types/Equipment';
import {Muscle} from 'src/backend/types/Muscle';
import {EntryVisibility} from '../../src/backend/services/EntryService/types/EntryVisibility';
import {WorkoutCreateDto} from '../../src/backend/services/WorkoutService/types/WorkoutCreateDto';

const entryService = await globalServiceFactory.entry();
const authService = await globalServiceFactory.auth();

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

await authService.registerManager({
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'password1235',
});

const start = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3);
const workout: WorkoutCreateDto = {
  typeId: null,
  calories: 100,
  start: start,
  end: new Date(start.getTime() + 1000 * 60 * 73.2),
  exercises: [
    {
      exerciseId: bicepsCurl.id,
      sets: [
        {
          start: null,
          end: null,
          weight: 35,
          reps: 12,
        },
        {
          start: null,
          end: null,
          weight: 33,
          reps: 12,
        },
        {
          start: null,
          end: null,
          weight: 30,
          reps: 12,
        },
      ],
    },
    {
      exerciseId: benchPress.id,
      sets: [
        {
          start: null,
          end: null,
          weight: 95,
          reps: 12,
        },
        {
          start: null,
          end: null,
          weight: 95,
          reps: 10,
        },
        {
          start: null,
          end: null,
          weight: 95,
          reps: 8,
        },
      ],
    },
  ],
};

await entryService.createWorkoutEntry(tommy.id, {
  workout: workout,
  visibility: EntryVisibility.Public,
  time: workout.start,
});
await globalServiceFactory.cleanup();
