import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {AppBlock} from '../../../../src/frontend/components/atoms/AppBlock/AppBlock';
import {AppButton} from '../../../../src/frontend/components/atoms/AppButton/AppButton';

const meta = {
  title: 'Components/Block',
  component: AppBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: <AppButton>Button</AppButton>,
  },
  decorators: [
    (Story) => <StoryBookDisplay story={Story} />,
  ],

} satisfies Meta<typeof AppBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
};

export const NewsBlock: Story = {
  args: {
    children: (
      <div>
        <img className="h-100 w-full object-cover rounded-t-md" src="/images/pages/home/news2.jpg" />
        <div className="p-5 grow flex flex-col">
          <h3 className="uppercase mb-2 font-semibold">Gained 10 pounds in 3 months</h3>
          <p>
          10lbs of muscle after 50 is doable but to achieve it in a year will require a
            lot of hard work and discipline. My strategy will be to consult ...
            <span className="text-accent block">Read More</span>
            </p>
            <div className="grow flex flex-col-reverse">
              <div className="flex flex-row gap-5 items-center mt-10">
                <img className="w-8" src="/images/avatar.gif" />
                <span className="text-accent">Alex S.</span>
              </div>
            </div>
          </div>
    </div>
    ),
  },
  render: (args) => <AppBlock className="p-0" >{args.children}</AppBlock>,
};
