import {Exercise} from '../../../../src/frontend/common/utils/openapi-client';

export const barbellSquat: Exercise = {
  id: 331,
  name: 'Barbell Squat',
  description:
    `<1>Stand straight with feet shoulder width apart. Place barbell on the back of your shoulders. 
    Hold barbell with overhand Grip. Distance between your hands should be wider than shoulder width apart. 
    Adjust feet to face slightly outward.<2>Lower yourself by bending your knees. 
    Your back is straight throughout the whole movement. Stop when your thighs are parallel with the ground.
     When you return the starting position, generate energy from your lower back.`,
  difficulty: 0,
  equipment: 'barbell',
  images: [
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Barbell%2BSquat-a.jpg',
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Barbell%2BSquat-b.jpg',
  ],
  params: [0],
  userId: null,
  copiedFromId: null,
  parentExerciseId: 189,
  createdAt: new Date('2025-04-14T21:47:05.531Z'),
  updatedAt: new Date('2025-08-05T08:54:16.450Z'),
  deletedAt: null,
  muscles: {
    primary: ['Quadriceps'],
    secondary: [
      'Gastrocnemius',
      'Glutes',
      'Hamstrings',
      'Soleus',
      'Lower Back',
    ],
  },
  variations: [],
};
