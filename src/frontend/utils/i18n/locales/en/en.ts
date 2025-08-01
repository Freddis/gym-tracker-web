import {header} from './layout/header';

// todo: figure out proper approach
interface WeekDaysTranslation extends Record<string, string> {
  '0': string,
  '1': string,
  '2': string,
  '3': string,
  '4': string,
  '5': string,
  '6': string,
}
export const dictionary = {
  utils: {
    time: {
      weekDays: {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday',
      } as WeekDaysTranslation,
    },
  },
  layout: {
    header: header,
    footer: {
      about: {
        heading: 'About Us',
        content: `Praesent vel rutrum purus. Nam vel dui eu risus duis dignissim dignissim. 
        Suspen disse at eros tempus, congueconsequat.
        Fusce sit amet urna feugiat.Praesent vel rutrum purus. Nam vel dui eu risus.`,
      },
      contacts: {
        heading: 'Contacts',
        address: '44 New Design Street, rne 005',
      },
      social: {
        heading: 'Social Networks',
      },
      copyright: '© Copyright Home Studio 2025. All Right Reserved. Designed and Developed by Alex S.',
    },
    popups: {
      exerciseSelection: {
        heading: 'Select Exercise',
        labels: {
          exercises: 'Exercises:',
          ownLibrary: 'Own Library',
          searchPlaceholder: 'Search here...',
        },
      },
    },
  },
  components: {
  },
  pages: {
    static: {
      home: {
        hero: {
          heading: {
            start: 'Discipline.',
            middle: ' the way to achieve your ',
            end: 'Goals',
          },
          toasts: {
            appNotYetPublished: 'Unfortunately the app is not yet published in stores',
          },
          subheading: `In sports and fitness you don't get far if you can't track your progress. 
                    Dicsipline tracker is your trustworthy companion.`,
          button: 'Download App',
        },
        features: {
          heading: {
            start: 'What is ',
            end: ' discipline?',
          },
          workouts: {
            title: 'Gym Workout Tracking',
            description: `Track your workouts and progress. 
                        Built-in library contrains over 2000 exercises and 
                        you can tweak them as you like and create your own.`,
          },
          activities: {
            title: 'Activity Tracking',
            description: `Track your running, cycling, swimming and hiking. 
            Add your own activities to calculate calorie expendure and progress`,
          },
          calories: {
            title: 'Calorie Tracking',
            description: 'Track calories, macros & more. Log even faster with tools like barcode scan & the NEW voice log.',
          },
          analytics: {
            title: 'Analytics',
            description: `Observe your progress with our analytics.
             History, charts, body measurements. Set up your goals and see your pace towards them.`,
          },
        },
      },
    },
    feed: {
      heading: 'Explore What Others Do',
    },
    exercises: {
      heading: 'Built-In Library',
      buttons: {
        addExercise: 'Add Exercise',
      },
      filter: {
        labels: {
          muscles: 'Muscles:',
          search: 'Search:',
        },
      },
      toasts: {
        noExercisesFound: 'No exercises found',
      },
    },
    activities: {
      list: {
        buttons: {
          addWorkout: 'Add Workout',
        },
        objects: {
          workout: {
            type: 'Workout',
            calories: 'Calories',
            duration: 'Duration',
          },
        },
      },
    },
    auth: {
      login: {
        heading: 'Login with existing Account',
        registerCta: 'New to Discipline?',
        toasts: {
          loginSuccess: "You've successfully logged in",
          unknownApiError: "Something went wrong. We can't log you in",
        },
        form: {
          labels: {
            email: 'Email',
            password: 'Password',
          },
          buttons: {
            signIn: 'Sign In',
            register: 'Sign up',
            forgotPassword: 'I forgot my password',
          },
        },
      },
      registration: {
        heading: 'Register new account',
        form: {
          labels: {
            name: 'Display Name',
            email: 'Email',
            password: 'Password',
            passwordConfirmation: 'Repeat Password',
          },
          buttons: {
            signIn: 'Sign In',
            register: 'Sign up',
          },
        },
      },
    },
  },
};
