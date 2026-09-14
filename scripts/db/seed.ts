import {randomUUID} from 'crypto';
import {TestUtils} from 'src/backend/utils/TestUtils/TestUtils';
import {Equipment} from 'src/backend/types/Equipment';
import {Muscle} from 'src/backend/types/Muscle';
import {EntryVisibility} from '../../src/backend/services/EntryService/types/EntryVisibility';
import {WorkoutCreateDto} from '../../src/backend/services/WorkoutService/types/WorkoutCreateDto';
import {FoodAmountUnit} from '../../src/backend/services/FoodService/types/FoodAmountUnit';
import {ServingSizeUnit} from '../../src/backend/services/FoodService/types/ServingSizeUnit';
import {MealType} from '../../src/backend/services/MealService/types/MealType';
import {EntryType} from '../../src/backend/services/EntryService/types/EntryType';
import {MealEntryUpsertDto} from '../../src/backend/services/EntryService/types/EntryUpsertDto';
import {FoodComponentUpsertDto} from '../../src/backend/services/FoodService/types/FoodComponentUpsertDto';

const factory = TestUtils.business.getFactory();
const entryService = await factory.entry();
const authService = await factory.auth();

await TestUtils.seed.wipeDb();
const benchPressImage = await TestUtils.seed.createImage({
  url: TestUtils.seed.getPublicAssetUrl('/images/exercises/Bench_Press.jpg'),
});

await authService.registerManager({
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'password1235',
});
const tommy = await TestUtils.seed.createUser({
  email: 'tommy@vercetti.com',
  name: 'Tommy Vercetti',
  password: 'password1234',
});

const egg = await TestUtils.seed.createFood({
  name: 'Egg',
  images: [TestUtils.seed.getPublicAssetUrl('/images/food/egg.jpg')],
  protein: 7,
  carbs: 0.5,
  fat: 5.2,
  servingSize: 68,
  servingSizeUnit: ServingSizeUnit.Gram,
  brand: 'Chicken For Everyone',
  createdAt: TestUtils.time.getDayAgo(10),
  user: tommy,
});

const milk = await TestUtils.seed.createFood({
  name: 'Milk 1.5%',
  images: [TestUtils.seed.getPublicAssetUrl('/images/food/milk.jpg')],
  calories: 45,
  protein: 3.1,
  carbs: 4.7,
  fat: 1.5,
  servingSizeUnit: ServingSizeUnit.Gram,
  brand: 'President',
  createdAt: TestUtils.time.getDayAgo(9),
  user: tommy,
});

const apple = await TestUtils.seed.createFood({
  name: 'Apple',
  images: [TestUtils.seed.getPublicAssetUrl('/images/food/apples.jpg')],
  calories: 100,
  protein: 0.5,
  carbs: 25.1,
  fat: 0.3,
  servingSize: 50,
  servingSizeUnit: ServingSizeUnit.Gram,
  createdAt: TestUtils.time.getDayAgo(8),
  user: tommy,
});

const omelette = await TestUtils.seed.createFood({
  name: 'Omelette',
  images: [TestUtils.seed.getPublicAssetUrl('/images/food/omelette.jpg')],
  calories: 100,
  protein: 10,
  carbs: 10,
  fat: 10,
  isMeal: true,
  servingSizeUnit: ServingSizeUnit.Gram,
  components: [
    {
      food: egg,
      amount: 3,
      unit: FoodAmountUnit.Serving,
    },
    {
      food: milk,
      amount: 100,
      unit: FoodAmountUnit.Gram,
    },
  ],
  createdAt: TestUtils.time.getDayAgo(7),
  user: tommy,
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


const mealEntry = (type: MealType, time: Date, food: FoodComponentUpsertDto[]): MealEntryUpsertDto => ({
  id: randomUUID(),
  type: EntryType.Meal,
  title: null,
  note: null,
  externalId: null,
  externalSource: null,
  visibility: EntryVisibility.Public,
  time,
  createdAt: time,
  updatedAt: null,
  deletedAt: null,
  healthkitId: null,
  healthkitAnchor: null,
  healthkitAnchors_3_0: null,
  healthkitSource: null,
  healthkitSourceName: null,
  healthkitDevice: null,
  healthkitDeviceName: null,
  meal: {
    type,
    food,
  },
});

await entryService.upsert(tommy.id, [
  mealEntry(MealType.Breakfast, TestUtils.time.getHourAgo(4), [
    {food: {id: omelette.id}, amount: 1, unit: FoodAmountUnit.Serving},
    {food: {id: milk.id}, amount: 200, unit: FoodAmountUnit.Gram},
  ]),
  mealEntry(MealType.Lunch, TestUtils.time.getHourAgo(), [
    {food: {id: omelette.id}, amount: 2, unit: FoodAmountUnit.Serving},
    {food: {id: apple.id}, amount: 1, unit: FoodAmountUnit.Serving},
  ]),
]);

const start = TestUtils.time.getDayAgo(3);
const workout: WorkoutCreateDto = {
  typeId: null,
  calories: 100,
  start: start,
  end: new Date(start.getTime() + TestUtils.time.minute() * 73.2),
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

const secondStart = TestUtils.time.getDayAgo();
const secondWorkout: WorkoutCreateDto = {
  typeId: null,
  calories: 180,
  start: secondStart,
  end: new Date(secondStart.getTime() + TestUtils.time.minute() * 61),
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
  time: TestUtils.time.getDayAgo(7),
});

await entryService.createWeightEntry(tommy.id, {
  weight: 81.6,
  visibility: EntryVisibility.Public,
  time: TestUtils.time.getDayAgo(),
});

await factory.cleanup();
