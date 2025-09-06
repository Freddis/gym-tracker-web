import {Equipment, Exercise, Muscle} from '../../../../src/frontend/utils/openapi-client';

export const benchPress: Exercise = {
  id: 10,
  name: 'Barbell Bench Press',
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
  equipment: Equipment.BARBELL,
  muscles: {
    primary: [Muscle.PECS],
    secondary: [Muscle.FRONT_DELTOIDS, Muscle.TRICEPS],
  },
  variations: [
    {
      id: 0,
      name: 'Barbell Bench Press (Flat, Overhand Grip)',
      description: `<1>Lie back on the decline bench. Hold the barbell with overhand Grip.
                  Distance between your hands is slighter wider than shoulder width. Hold the barbell with arms fully extended. 
                  The barbell is directly above the center of your chest.
                  <2>Lower the barbell towards your lower chest as you keep your elbows close to your body. 
                  The barbell should slightly Touch your chest at the end of the movement. 
                  Refrain from bouncing the barbell off your chest. Hold for a brief moment. 
                  Return to starting position. Keep your entire back on the bench at all times.
                  Refrain from any leg movements.`.replaceAll('\n', ''),
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
      equipment: Equipment.BARBELL,
      muscles: {
        primary: [Muscle.PECS],
        secondary: [Muscle.FRONT_DELTOIDS, Muscle.TRICEPS],
      },
    },
  ],

};
