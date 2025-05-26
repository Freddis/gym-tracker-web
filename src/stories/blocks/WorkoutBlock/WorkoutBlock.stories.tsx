import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../frontend/components/atoms/StoryBookDisplay/StoryBookDisplay';
import {PaletteName} from '../../../frontend/enums/PaletteName';
import {WorkoutBlock} from '../../../frontend/components/pages/Workouts/WorkoutListPage/WorkoutBlock/WorkoutBlock';

const meta = {
  title: 'Blocks/Workout',
  component: WorkoutBlock,
  tags: ['autodocs'],
  args: {
    item: {
      id: 10,
      typeId: 2,
      userId: 0,
      calories: 120,
      start: new Date(new Date().getTime() - 1000 * 60 * 60 * 15.62),
      end: new Date(new Date().getTime()),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      exercises: [
        {
          id: 0,
          workoutId: 0,
          userId: 0,
          exerciseId: 0,
          createdAt: new Date(),
          updatedAt: null,
          exercise: {
            id: 10,
            name: 'Barbell Bench Press (Flat, Overhand Grip)',
            description: null,
            difficulty: null,
            equipmentId: 0,
            images: [
              'http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/Barbell+Bench+Press+(Flat_Overhand+Grip)-a.jpg',
            ],
            params: [],
            userId: null,
            copiedFromId: null,
            parentExerciseId: null,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
          },
          sets: [
            {
              id: 0,
              exerciseId: 10,
              workoutId: 0,
              userId: 0,
              workoutExerciseId: 0,
              start: null,
              end: null,
              weight: 50,
              reps: 10,
              createdAt: new Date(),
              updatedAt: null,
            },
            {
              id: 0,
              exerciseId: 10,
              workoutId: 0,
              userId: 0,
              workoutExerciseId: 0,
              start: null,
              end: null,
              weight: 50,
              reps: 8,
              createdAt: new Date(),
              updatedAt: null,
            },
          ],
        },
      ],
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Workout Block',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={Story} palette={PaletteName.Neutral} className="max-w-5xl" column />],
} satisfies Meta<typeof WorkoutBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
