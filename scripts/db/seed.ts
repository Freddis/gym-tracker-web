import {TestUtils} from 'src/backend/utils/TestUtils/TestUtils';
import {Equipment} from 'src/backend/types/Equipment';
import {Muscle} from 'src/backend/types/Muscle';
import {EntryVisibility} from '../../src/backend/services/EntryService/types/EntryVisibility';
import {WorkoutCreateDto} from '../../src/backend/services/WorkoutService/types/WorkoutCreateDto';

const factory = TestUtils.business.getFactory();
const entryService = await factory.entry();
const authService = await factory.auth();

await TestUtils.seed.wipeDb();
const benchPressImage = await TestUtils.seed.createImage({
  url: TestUtils.seed.getPublicAssetUrl('/images/exercises/Bench_Press.jpg'),
});
const benchPress = await TestUtils.seed.createExercise({
  name: 'Bench press',
  equipment: Equipment.Bench,
  muscles: {
    primary: [Muscle.Pecs],
    secondary: [Muscle.Triceps, Muscle.FrontDeltoids],
  },
  images: [benchPressImage],
});

const bicepsCurlImage = await TestUtils.seed.createImage({
  url: TestUtils.seed.getPublicAssetUrl('/images/exercises/Dumbbell_Biceps_Curl.jpg'),
});
const bicepsCurl = await TestUtils.seed.createExercise({
  name: 'Biceps curl',
  images: [bicepsCurlImage],
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

const day = 1000 * 60 * 60 * 24;
const start = new Date(new Date().getTime() - day * 3);
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

const secondStart = new Date(new Date().getTime() - day);
const secondWorkout: WorkoutCreateDto = {
  typeId: null,
  calories: 180,
  start: secondStart,
  end: new Date(secondStart.getTime() + 1000 * 60 * 61),
  exercises: [
    {
      exerciseId: benchPress.id,
      sets: [
        {
          start: null,
          end: null,
          weight: 100,
          reps: 10,
        },
        {
          start: null,
          end: null,
          weight: 100,
          reps: 8,
        },
        {
          start: null,
          end: null,
          weight: 97.5,
          reps: 8,
        },
      ],
    },
    {
      exerciseId: bicepsCurl.id,
      sets: [
        {
          start: null,
          end: null,
          weight: 36,
          reps: 12,
        },
        {
          start: null,
          end: null,
          weight: 36,
          reps: 10,
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

await entryService.createWorkoutEntry(tommy.id, {
  workout: secondWorkout,
  visibility: EntryVisibility.Public,
  time: secondWorkout.start,
});

await entryService.createWeightEntry(tommy.id, {
  weight: 82.4,
  visibility: EntryVisibility.Public,
  time: new Date(new Date().getTime() - day * 7),
});

await entryService.createWeightEntry(tommy.id, {
  weight: 81.6,
  visibility: EntryVisibility.Public,
  time: new Date(new Date().getTime() - day),
});

await factory.cleanup();
