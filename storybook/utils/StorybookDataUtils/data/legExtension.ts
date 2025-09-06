import {Exercise} from '../../../../src/frontend/utils/openapi-client';

export const legExtension: Exercise = {
  id: 1710,
  name: 'Selectorized Leg Extension',
  description:
    `<1>Sit on the seat. Position your ankles behind the ankle padding.
    <2>Fully extend your legs in front of you. Hold for one second. Return to starting position.`,
  difficulty: 0,
  equipment: 'selectorized',
  images: [
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Selectorized%2BLeg%2BExtension-a.jpg',
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Selectorized%2BLeg%2BExtension-b.jpg',
  ],
  params: [0],
  userId: null,
  copiedFromId: null,
  parentExerciseId: null,
  createdAt: new Date('2025-04-14T21:47:05.541Z'),
  updatedAt: new Date('2025-08-05T08:54:25.517Z'),
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
