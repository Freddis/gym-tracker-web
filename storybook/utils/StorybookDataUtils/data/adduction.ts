import {Exercise} from '../../../../src/frontend/common/utils/openapi-client';

export const adduction: Exercise = {
  id: 1680,
  name: 'Selectorized Adduction',
  description: `<1>Sit on the seat and place feet on the platform. Your inner knees Touch the knee padding
    .<2>Pull your legs towards the center of your body. Hold for one second. Return to starting position.`,
  difficulty: 0,
  equipment: 'selectorized',
  images: [
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Selectorized%2BAdduction-a.jpg',
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Selectorized%2BAdduction-b.jpg',
  ],
  params: [0],
  userId: null,
  copiedFromId: null,
  parentExerciseId: 1679,
  createdAt: new Date('2025-04-14T21:47:05.541Z'),
  updatedAt: new Date('2025-08-05T08:54:28.623Z'),
  deletedAt: null,
  muscles: {primary: ['Adductors'], secondary: []},
  variations: [],
  isArchived: false,
};
