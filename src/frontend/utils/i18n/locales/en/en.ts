import {EntryType, Equipment, Exercise, Muscle, Workout, WorkoutPlan} from '../../../openapi-client';
import {FreeFormTranslationObject} from '../../types/FreeFormTranslationObject';
import {header} from './layout/header';
import {WeekDaysTranslation} from './types/WeekDaysTranslation';

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
      exercise: {
        fields: {
          id: 'Id',
          name: 'Name',
          description: 'Description',
          difficulty: 'Difficulty',
          equipment: 'Equipment',
          images: 'Images',
          params: 'Param Types',
          userId: 'User',
          copiedFromId: 'Origin Exercise',
          parentExerciseId: 'Parent Exercise',
          createdAt: 'Created At',
          updatedAt: 'Updated At',
          deletedAt: 'Deleted At',
          muscles: 'Muscles',
          variations: 'Variations',
        } satisfies Record<keyof Exercise, string>,
      },
      weight: {
        fields: {
          value: 'Weight',
        },
        errors: {
          value: {
            notNumber: 'Not a valid number',
          },
        },
      },
      workoutPlan: {
        fields: {
          id: 'Id',
          name: 'Name',
          description: 'Description',
          userId: 'User',
          createdAt: 'Created At',
          updatedAt: 'Updated At',
          deletedAt: 'Deleted At',
        } satisfies Record<keyof WorkoutPlan, string>,
      },
      workout: {
        fields: {
          id: 'Id',
          typeId: 'Type',
          userId: 'User',
          calories: 'Calories',
          start: 'Started At',
          end: 'Ended At',
          createdAt: 'Created At',
          updatedAt: 'Updated At',
          deletedAt: 'Deleted At',
          exercises: 'Exercises',
        } satisfies Record<keyof Workout, string>,
      },
      entryType: {
        Workout: 'Workout',
        Weight: 'Weight',
      } satisfies Record<EntryType, string>,
      muscles: {
        'Lower Back': 'Lower Back',
        'Soleus': 'Soleus',
        'Front Deltoids': 'Front Deltoids',
        'Lats': 'Lats',
        'Forearms': 'Forearms',
        'Pecs': 'Pecs',
        'Hamstrings': 'Hamstrings',
        'Wrist Flexors': 'Wrist Flexors',
        'Biceps': 'Biceps',
        'Triceps': 'Triceps',
        'Rear Deltoids': 'Rear Deltoids',
        'Rotator Cuff': 'Rotator Cuff',
        'Ankle': 'Ankle',
        'Abdominals': 'Abdominals',
        'Glutes': 'Glutes',
        'Quadriceps': 'Quadriceps',
        'Obliques': 'Obliques',
        'Abductors': 'Abductors',
        'Gastrocnemius': 'Gastrocnemius',
        'Lateral Deltoids': 'Lateral Deltoids',
        'Hip Flexors': 'Hip Flexors',
        'Trapezius': 'Trapezius',
        'Neck': 'Neck',
        'Adductors': 'Adductors',
      } satisfies Record<Muscle, string>,
      equipment: {
        'rowing': 'Rowing',
        'swimming': 'Swimming',
        'plate loaded': 'Plate Loaded',
        'foam roller': 'Foam Roller',
        'pullup bar': 'Pull-up Bar',
        'stair climber': 'Stair Climber',
        'selectorized': 'Selectorized Machine',
        'dip bar': 'Dip Bar',
        'preacher': 'Preacher Bench',
        'hyperextension': 'Hyperextension Bench',
        'sandbag': 'Sandbag',
        'elliptical': 'Elliptical',
        'chair': 'Chair',
        'cable': 'Cable Machine',
        'captains chair': "Captain's Chair",
        'towel': 'Towel',
        'water bottle': 'Water Bottle',
        'stability ball': 'Stability Ball',
        'table': 'Table',
        'smith': 'Smith Machine',
        'kettlebell': 'Kettlebell',
        'cycling': 'Cycling',
        'step aerobics': 'Step Aerobics',
        'plate': 'Weight Plate',
        'platform': 'Platform',
        'medicine ball': 'Medicine Ball',
        'running': 'Running',
        'barbell': 'Barbell',
        'backpack': 'Backpack',
        'ez curl bar': 'EZ Curl Bar',
        'walking': 'Walking',
        'bench': 'Bench',
        'bodyweight': 'Bodyweight',
        'resistance band': 'Resistance Band',
        'dumbbell': 'Dumbbell',
        'jump rope': 'Jump Rope',
        'treadmill': 'Treadmill',
        'bosu ball': 'BOSU Ball',
      } satisfies Record<Equipment, string>,
      units: {
        kg: 'kg',
      },
    },
    toasts: {
      unknownApiError: "Something went wrong. We can't log you in",
      notImplemented: 'Not implemented yet',
      invalidForm: 'Some information is missing or invalid',
    },
    generic: {
      buttons: {
        back: 'Back',
        save: 'Save',
        delete: 'Delete',
      },
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
      copyright: 'Designed and Developed by Alex S. 2025',
    },
    popups: {
      exerciseSelection: {
        heading: 'Select Exercise',
        labels: {
          exercises: 'Exercises:',
          ownLibrary: 'Own Library',
          searchPlaceholder: 'Search here...',
        },
        toasts: {
          noExercisesFound: 'No exercises found',
        },
      },
    },
    toasts: {
      logoutSuccess: "You've successfully logged out",
    },
  },
  components: {
    workoutPlanBlock: {
      buttons: {
        addWorkout: 'Add Workout',
      },
    },
    newsBlock: {
      labels: {
        readMore: 'Read More',
      },
    },
    entryBlock: {
      labels: {
        unkownEntry: 'Unknown Entry Type',
      },
    },
    exerciseBlock: {
      labels: {
        variations: 'Variations',
        equipment: 'Equipment:',
        primaryMuscles: 'Primary:',
        secondaryMuscles: 'Secondary:',
      },
      placeholders: {
        none: 'None',
        andMore: 'and more..',
      },
    },
  },
  pages: {
    static: {
      error: {
        title: 'Oops! Unknown Error!',
        description: `Something terrible happened and we don't know what.
                            Please let us know and we'll fix it. Thank you for your patience.`,
        link: 'Back To Home Page',
      },
      notFound: {
        code: '404',
        title: 'Page Not Found',
        description: "This page doesn't exist. If that's a mistake, please let us know and we'll fix it.",
      },
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
    exercise: {
      labels: {
        variations: 'Variations',
        equipment: 'Equipment:',
        primaryMuscles: 'Primary:',
        secondaryMuscles: 'Secondary:',
      },
      placeholders: {
        none: 'None',
        andMore: 'and more..',
      },
    },
    exercises: {
      create: {
        heading: 'Create Exercise',
      },
      update: {
        heading: 'Update Exercise',
        toasts: {
          cannotUpdateBuiltIn: 'Cannot update built-in exercise',
          success: 'You successfully updated exercise',
        },
      },
      list: {
        heading: 'Built-In Library',
        buttons: {
          addExercise: 'Add Exercise',
        },
        filter: {
          labels: {
            equipment: 'Equipment:',
            searchEquipment: 'Seach equipment',
            noEquipmentFound: 'No equipment found',
            selectEquipment: 'Select equipment...',
            muscles: 'Muscles:',
            search: 'Search:',
          },
        },
        toasts: {
          noExercisesFound: 'No exercises found',
        },
      },
    },
    workoutTypes: {
      create: {
        heading: 'Create Workout Type',
        toasts: {
          success: 'You successfully added workout type',
        },
      },
      update: {
        heading: 'Update Workout Type',
        toasts: {
          success: 'You successfully updated workout type',
          deletionSuccss: 'You successfully deleted workout type',
        },
      },
      form: {
        labels: {
          name: 'Name',
          description: 'Description',
        },
        buttons: {
          addExercise: 'Add Exercise',
          addSet: 'Add',
          deleteSet: 'Delete',
          deleteExercise: 'Delete',
        },
      },
      list: {
        heading: 'Workout Types',
        toasts: {
          noPlansFound: "You don't have any workout types yet. Try to add one!",
        },
        buttons: {
          add: 'Add Workout Type',
        },
      },
    },
    workoutPlans: {
      create: {
        heading: 'Create Workout Plan',
        toasts: {
          success: 'You successfully added workout plan',
        },
      },
      list: {
        heading: 'Workout Plans',
        toasts: {
          noPlansFound: "You don't have any workout plans yet. Try to add one!",
        },
      },
      update: {
        heading: 'Update Workout Plan',
        toasts: {
          success: 'You successfully updated workout plan',
          deletionSuccss: 'You successfully deleted workout plan',
        },
      },
    },
    activities: {
      workouts: {
        add: {
          heading: 'Add Workout',
        },
        update: {
          heading: 'Update Workout',
          labels: {
            exercises: 'Exercises: ',
          },
          buttons: {
            addSet: 'Add Set',
            addExercise: 'Add Exercise',
            swapExercise: 'Swap',
          },
        },
      },
      weight: {
        add: {
          heading: 'Add Weight',
          buttons: {
            save: 'Add',
            back: 'Back',
          },
          toasts: {
            success: 'You successfully added weight record',
          },
        },
        update: {
          heading: 'Update Weight',
          toasts: {
            success: 'You successfully updated weight record',
          },
          buttons: {
            save: 'Save',
            back: 'Back',
          },
        },
      },
      add: {
        heading: 'Add Entry',
        buttons: {
          addWorkout: 'Add Workout',
          addWeight: 'Add Weight',
        },
      },
      list: {
        heading: 'My Records',
        buttons: {
          addWorkout: 'Add Workout',
          addEntry: 'Add Entry',
          plans: 'My Workout Plans',
          types: 'My Workout Types',
        },
        filter: {
          labels: {
            type: 'Entry type:',
          },
        },
        objects: {
          workout: {
            type: 'Workout',
            calories: 'Calories',
            duration: 'Duration',
          },
          weight: {
            type: 'Weight',
          },
        },
        toasts: {
          nothingFound: 'No activities found',
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
        toasts: {
          registrationSuccess: "You've successfully registered",
        },
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
      passwordRestore: {
        heading: 'Restore Password',
        toasts: {
          restorationSuccess: 'The email has been sent',
        },
        form: {
          description: 'Enter your email and we will send you new password if your account exists',
          labels: {
            email: 'Email',
          },
          buttons: {
            restore: 'Send',
          },
        },
      },
    },
    argusCheckins: {
      labels: {
        entries: 'Argus Entries',
        types: 'Types:',
        sets: 'Sets',
      },
      buttons: {
        all: 'All',
      },
    },
  },
} satisfies FreeFormTranslationObject;
