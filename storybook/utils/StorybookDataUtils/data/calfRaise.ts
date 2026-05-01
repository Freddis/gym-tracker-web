import {Exercise} from '../../../../src/frontend/common/utils/openapi-client';

export const calfRaise: Exercise = {
  id: '8dd226dd-d224-4ad6-9194-972f0f3a5c46',
  name: 'Plate Loaded Calf Raise (Seated)',
  description: `<1>Sit straight with your knees under the knee padding. Hold onto the handles. 
    Position your feet so that your heels are off the platform.
    <2>Tiptoe so that your toes point away from you. Hold for one second. Return to starting position.`,
  difficulty: 0,
  equipment: 'plate loaded',
  images: [
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Plate%2BLoaded%2BCalf%2BRaise%2B(Seated)-a.jpg',
    'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Plate%2BLoaded%2BCalf%2BRaise%2B(Seated)-b.jpg',
  ],
  params: [0],
  userId: null,
  copiedFromId: null,
  parentExerciseId: null,
  createdAt: new Date('2025-04-14T21:47:05.541Z'),
  updatedAt: new Date('2025-08-05T08:54:27.758Z'),
  deletedAt: null,
  muscles: {primary: ['Soleus'], secondary: ['Gastrocnemius']},
  variations: [],
  isArchived: false,
};
