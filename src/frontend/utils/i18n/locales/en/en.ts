import {EntryType} from '../../../openapi-client';
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
    objects: {
      entryType: {
        Workout: 'Workout',
        Weight: 'Weight',
      } satisfies Record<EntryType, string>,
    },
  },
  layout: {
    header: header,
    footer: {
      about: {
        heading: 'About Us',
        content: `This app is a personal passion project, built by a gym rat who also happens to love coding. 
        It’s designed to make tracking workouts simple and effective`,
      },
      contacts: {
        heading: 'Contacts',
        address: 'Georgia, Kakheti, Ozaani vlg, 1',
      },
      links: {
        heading: 'Links',
        links: {
          termsOfService: 'Terms Of Service',
          privacyPolicy: 'Privacy Policy',
        },
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
    toasts: {
      logoutSuccess: "You've successfully logged out",
    },
  },
  components: {
  },
  pages: {
    static: {
      articles: {
        header: 'Articles',
        labels: {
          categories: 'Categories:',
        },
        articles: {
          termsOfService: 'Terms Of Service',
          privacyPolicy: 'Privacy Policy',
        },
      },
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
          heading: 'What is Discipline?',
          subheading: 'There is a very good reason discipline exists',
          workouts: {
            title: 'Gym Workout Tracking',
            description: `
            Track your workouts. Create workout templates and plans. Track your RPE and mood.
            We want you to shape your own training.
            `,
          },
          exerciseLibrary: {
            title: 'Huge Exercise Library',
            description: ` Built-in library contains over 2000 exercises.
                Choose a muscle and we provide you a variety of ways to target it!`,
          },
          autonomous: {
            title: 'Fully Autonomous',
            description: `We store the data in our cloud, but we also keep a full copy on your device.
              You don't need internet connection to use the app efficiently.`,
          },
          ownExercises: {
            title: 'Own Your Exercises',
            description: `The exercises you include into workouts are copied into your personal library.
              You can tweak and change them as you like.`,
          },
          analytics: {
            title: 'Build Your Analytics',
            description: `Browse history, tag your custom workouts templates and set milestones.
              Find what works the best for you presonally!`,
          },
          freeFeatures: {
            title: 'Forever Free',
            description: `Our aim is to provide reliable app that never gonna let you down.
              We will never put a paywall on vital features such as analytics or limit your workout types.`,
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
        },
        pricing: {
          heading: 'Our Pricing Model',
          subheading: `You get everything you can do in excel spreadsheets for free!
                    We only charge for things that require active suppoort and expenses.`,
          plans: {
            free: {
              name: 'Free Plan',
              price: 'Free',
            },
            pro: {
              name: 'Pro Plan',
              price: '$30 / year',
            },
          },
          points: {
            workoutTracking: 'Workout Tracking',
            analytics: 'Analytics',
            dataExport: 'Data Export',
            cloudStorage: 'Cloud storage for data',
            extendedCloudStorage: 'Cloud storage for pictures and videos',
            socialFeatures: 'Social features',
            coaching: 'Coaching',
            extendedAnalytics: 'Community-wide analytics',
          },
        },
        download: {
          heading: 'Download App',
          subheading: '“Come on! Do it! Do it now!!!!” Arnold Schwarzenegger',
        },
      },
    },
    feed: {
      heading: 'Explore What Others Do',
      filter: {
        labels: {
          type: 'Entry type:',
        },
      },
      toasts: {
        noActivitiesFound: 'No activities found',
      },
    },
    exercises: {
      heading: 'Built-In Library',
      buttons: {
        addExercise: 'Add Exercise',
      },
      filter: {
        labels: {
          equipment: 'Equipment:',
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
          notImplemented: 'Not implemented yet',
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
