import {Exercise} from '../../../../src/frontend/common/utils/openapi-client';

export const barbellShrug: Exercise = {
  id: '9c20c862-26d3-4bee-83e1-545ca2c23e52',
  name: 'Barbell Shrug',
  description: `<1>Stand straight with feet shoulder width apart. 
    Hold barbell with overhand Grip. Distance between your hands should be wider than shoulder width apart.
     Position barbell in front of your thighs.<2>Shrug your shoulders. Hold for one second. Return to starting position.`,
  difficulty: 0,
  equipment: 'barbell',
  images: [
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Barbell%2BShrug-a.jpg',
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Barbell%2BShrug-b.jpg',
  ],
  params: [0],
  userId: null,
  copiedFromId: null,
  parentExerciseId: null,
  createdAt: new Date('2025-04-14T21:47:05.531Z'),
  updatedAt: new Date('2025-08-05T08:54:41.127Z'),
  deletedAt: null,
  muscles: {primary: ['Trapezius'], secondary: []},
  variations: [],
  isArchived: false,
};
