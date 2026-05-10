import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {
  ExerciseLibraryPagePresenter,
// eslint-disable-next-line max-len
} from '../../../../../src/frontend/website/components/pages/Exercises/ExerciseLibraryPage/components/ExerciseLibraryPagePresenter/ExerciseLibraryPagePresenter';
import {
  ExerciseLibraryPageState,
// eslint-disable-next-line max-len
} from '../../../../../src/frontend/website/components/pages/Exercises/ExerciseLibraryPage/components/ExerciseLibraryPagePresenter/types/ExerciseLibraryPageState';
import {StoryBookDisplayType} from '../../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';
import {RouteId} from '../../../../../src/frontend/common/utils/route';


const meta = {
  title: 'Pages/Exercises/Library',
  component: ExerciseLibraryPagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  parameters: {
    layout: 'centered',
    language: 'en',
    docs: {
      description: {
        component: 'Exercise Library Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column type={StoryBookDisplayType.Page}/>],
} satisfies Meta<typeof ExerciseLibraryPagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    route: RouteId.ExerciseLibrary,
    onNextPage: () => {},
    onFilter: () => {},
    filter: {
      search: undefined,
      muscles: [],
      equipment: undefined,
    },
    items: [
      StorybookDataUtils.getExercise('benchPress'),
      StorybookDataUtils.getExercise('barbellShrug'),
      StorybookDataUtils.getExercise('squat'),
      StorybookDataUtils.getExercise('legExtension'),
      StorybookDataUtils.getExercise('deadLift'),
      StorybookDataUtils.getExercise('calfRaise'),
      StorybookDataUtils.getExercise('adduction'),
      StorybookDataUtils.getExercise('pullUp'),
    ],
    state: {
      status: ExerciseLibraryPageState.Success,
      isLoadingNextPage: false,
    },
  },
};

export const LoadingNextPage: Story = {
  args: {
    route: RouteId.ExerciseLibrary,
    onNextPage: () => {},
    onFilter: () => {},
    filter: {
      search: undefined,
      muscles: ['Abdominals'],
      equipment: undefined,
    },
    items: [
      StorybookDataUtils.getExercise('benchPress'),
      StorybookDataUtils.getExercise('barbellShrug'),
      StorybookDataUtils.getExercise('squat'),
    ],
    state: {
      status: ExerciseLibraryPageState.Success,
      isLoadingNextPage: true,
    },
  },
};

export const EmptyResults: Story = {
  args: {
    route: RouteId.ExerciseLibrary,
    onNextPage: () => {},
    onFilter: () => {},
    filter: {
      search: undefined,
      muscles: ['Abdominals'],
      equipment: undefined,
    },
    items: [

    ],
    state: {
      status: ExerciseLibraryPageState.Success,
      isLoadingNextPage: false,
    },
  },
};

export const Error: Story = {
  args: {
    route: RouteId.ExerciseLibrary,
    onNextPage: () => {},
    onFilter: () => {},
    filter: {
      search: undefined,
      muscles: ['Abdominals'],
      equipment: undefined,
    },
    items: [

    ],
    state: {
      status: ExerciseLibraryPageState.Error,
      isLoadingNextPage: false,
    },
  },
};

export const Loading: Story = {
  args: {
    route: RouteId.ExerciseLibrary,
    onNextPage: () => {},
    onFilter: () => {},
    filter: {
      search: undefined,
      muscles: ['Abdominals', 'Ankle', 'Biceps'],
      equipment: undefined,
    },
    items: [

    ],
    state: {
      status: ExerciseLibraryPageState.Loading,
      isLoadingNextPage: false,
    },
  },
};
