import {DistanceUnit, EntryType,
   EntryVisibility,
   Equipment, Exercise, Food, Gender, HeightUnit, MealType, Muscle, ServingSizeUnit, TemperatureUnit, WeightUnit, Workout, WorkoutPlan,

} from '../../../../../common/utils/openapi-client';
import {FreeFormTranslationObject} from '../../types/FreeFormTranslationObject';
import {header} from './layout/header';
import {countries} from './types/countries';
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
      entry: {
        fields: {
          time: 'Time',
          note: 'Note',
          image: 'Image',
          visibility: 'Visibility',
        },
      },
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
          isArchived: 'Archived',
        } satisfies Record<keyof Exercise, string>,
      },
      meal: {
        fields: {
          type: 'Type',
        },
        types: {
          Breakfast: 'Breakfast',
          Lunch: 'Lunch',
          Dinner: 'Dinner',
          Snack: 'Snack',
          Other: 'Other',
        } satisfies Record<MealType, string>,
      },
      food: {
        fields: {
          name: 'Name',
          description: 'Description',
          image: 'Image',
          calories: 'Calories',
          protein: 'Protein',
          carbs: 'Carbs',
          fat: 'Fat',
          servingSize: 'Serving Size',
          servingSizeUnit: 'Serving Size Unit',
          isMeal: 'Is Meal',
          components: 'Components',
          createdAt: 'Created At',
          updatedAt: 'Updated At',
          deletedAt: 'Deleted At',
          id: 'Id',
        } satisfies Record<keyof Food, string>,
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
        Post: 'Post',
        OutdoorRun: 'Outdoor Run',
        OutdoorWalk: 'Outdoor Walk',
        Meal: 'Meal',
        CalorieGoal: 'Calorie Goal',
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
        km: 'km',
        m: 'm',
        g: 'g',
      },
      countries: countries,
      genders: {
        Male: 'Male',
        Female: 'Female',
        Other: 'Other',
      } satisfies Record<Gender, string>,
      foodUnits: {
        Gram: 'g',
      } satisfies Record<ServingSizeUnit, string>,
      weightUnits: {
        Kg: 'kg',
        Lbs: 'lbs',
      } satisfies Record<WeightUnit, string>,
      temperatureUnits: {
        C: 'C',
        F: 'F',
      } satisfies Record<TemperatureUnit, string>,
      distanceUnits: {
        Km: 'km',
        Mi: 'mi',
      } satisfies Record<DistanceUnit, string>,
      heightUnits: {
        Cm: 'cm',
        Ft: 'ft',
      } satisfies Record<HeightUnit, string>,
      entryVisibility: {
        Public: 'Public',
        Private: 'Private',
      } satisfies Record<EntryVisibility, string>,
    },
    toasts: {
      unknownApiError: 'Something went wrong',
      notImplemented: 'Not implemented yet',
      invalidForm: 'Some information is missing or invalid',
    },
    generic: {
      images: {
        noImageLabel: 'No Image',
      },
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
      foodSelection: {
        heading: 'Select Food',
        labels: {
          food: 'Foods:',
          ownLibrary: 'Own Library',
          searchPlaceholder: 'Search here...',
        },
        toasts: {
          noFoodFound: 'No food found',
        },
      },
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
    errorDisplay: {
      NotFound: 'Requested entity not found',
      Unauthorized: 'You have to be logged in to view this page',
      ValidationFailed: 'Validation errors in API request:',
      Unknown: 'Looks like we have an unexpected error on the server. Please reach our support and we will fix it.',
    },
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
    calorieGoal: {
      create: {
        heading: 'Create Calorie Goal',
        toasts: {
          success: 'You successfully added calorie goal',
        },
      },
    },
    meals: {
      create: {
        heading: 'Create Meal',
        toasts: {
          success: 'You successfully added meal',
        },
      },
      update: {
        heading: 'Update Meal',
        toasts: {
          success: 'You successfully updated meal',
          deletionSuccess: 'You successfully deleted meal',
        },
      },
    },
    settings: {
      toasts: {
        success: 'Settings have been updated successfully',
      },
      changePassword: {
        heading: 'Change Password',
        labels: {
          oldPassword: 'Old Password',
          newPassword: 'New Password',
          confirmPassword: 'Confirm Password',
        },
        toasts: {
          success: 'Password has been changed successfully',
        },
      },
      update: {
        heading: 'Update Settings',
        sections: {
          general: 'General',
          units: 'Units',
        },
        labels: {
          name: 'Name',
        },
      },
      view: {
        heading: 'Settings',
        labels: {
          name: 'Name',
          email: 'Email',
          profilePicture: 'Profile Picture',
          gender: 'Gender',
          country: 'Country',
          dateOfBirth: 'Date of Birth',
          visibility: 'Visibility',
          about: 'About',
          general: 'General',
          goals: 'Goals',
          height: 'Height',
          weight: 'Weight',
          distance: 'Distance',
          temperature: 'Temperature',
          age: 'Age',
          units: 'Units',
          security: 'Security',
        },
        buttons: {
          changePassword: 'Change Password',
          edit: 'Edit',
        },
      },
    },
    profile: {
      heading: 'Profile',
      buttons: {
        addGoal: 'Add Goal',
      },
      labels: {
        from: 'From',
        remainingToday: 'Remaining Today',
        visibility: 'Visibility',
        about: 'About',
        goals: 'Goals',
        height: 'Height',
        weight: 'Weight',
        age: 'Age',
      },
      toasts: {
        noGoals: 'You don\'t have any goals yet. Try to add one!',
      },
    },
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
    food: {
      create: {
        heading: 'Create Food',
        buttons: {
          addComponent: 'Add',
          crateFood: 'Create Food',
          crateDish: 'Create Dish',
        },
        labels: {
          components: 'Components',
          hasServingSize: 'Has Serving Size',
          grams: 'Grams',
          servings: 'Servings',
        },
        toasts: {
          success: 'You successfully added food',
          noComponents: 'You need to add at least food to the dish',
        },
      },
      update: {
        heading: 'Update Food',
        toasts: {
          invalidForm: 'Some information is missing or invalid',
          success: 'You successfully updated food',
          deletionSuccess: 'You successfully deleted food',
        },
      },
      list: {
        heading: 'Food',
        labels: {
          calories: 'Calories',
          protein: 'Protein',
          carbs: 'Carbs',
          fat: 'Fat',
          servingSize: 'Serving Size',
          caloriesPerServing: 'In 1 serving',
          components: 'Components',
        },
        buttons: {
          addFood: 'Add Food',
          addDish: 'Add Dish',
        },
        filter: {
          clearFilters: 'Clear Filters',
          labels: {
            search: 'Search',
            isDish: 'Dishes Only',
            noDishes: 'No Dishes',
          },
        },
        toasts: {
          nothingFound: 'No food found',
        },
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
        heading: 'Exercises',
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
      posts: {
        add: {
          heading: 'Add Post',
          toasts: {
            success: 'You successfully added post',
          },
        },
        update: {
          heading: 'Update Post',
          toasts: {
            success: 'You successfully updated post',
          },
        },
      },
      workouts: {
        add: {
          heading: 'Add Workout',
        },
        update: {
          heading: 'Update Workout',
          labels: {
            exercises: 'Exercises: ',
            findWorkoutType: 'Find Workout type',
            selectWorkoutType: 'Select workout type',
            noWorkoutTypesFound: 'No types found',
          },
          buttons: {
            addSet: 'Add Set',
            addExercise: 'Add Exercise',
            swapExercise: 'Swap',
          },
          toasts: {
            success: 'Workout successfully updated',
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
            updateSuccess: 'You successfully updated weight record',
            deleteSuccess: 'You successfully deleted weight record',
            notFound: 'Weight record not found',
          },
          buttons: {
            save: 'Save',
            back: 'Back',
          },
        },
      },
      create: {
        heading: 'Add Entry',
        buttons: {
          addWorkout: 'Add Workout',
          addWeight: 'Add Weight',
          addPost: 'Add Post',
          addMeal: 'Add Meal',
        },
        toasts: {
          success: 'You successfully added workout record',
        },
      },
      list: {
        heading: 'My Entries',
        buttons: {
          addWorkout: 'Add Workout',
          addEntry: 'Add Entry',
          plans: 'My Workout Plans',
          types: 'My Workout Types',
          food: 'My Food',
        },
        filter: {
          clearFilters: 'Clear Filters',
          labels: {
            type: 'Entry type:',
            date: 'Date:',
          },
        },
        objects: {
          calorieGoal: {
            type: 'Calorie Goal',
          },
          meal: {
            type: 'Meal',
          },
          workout: {
            type: 'Workout',
            calories: 'Calories',
            duration: 'Duration',
          },
          weight: {
            type: 'Weight',
          },
          outdoorWalk: {
            type: 'Outdoor Walk',
            distance: 'Distance',
            duration: 'Duration',
            calories: 'Calories',
            pace: 'Pace',
            elevationGain: 'Elevation Gain',
            cadence: 'Cadence',
            maxPace: 'Max Pace',
            maxCadence: 'Max Cadence',
            start: 'Start',
            end: 'End',
          },
          outdoorRun: {
            type: 'Outdoor Run',
            distance: 'Distance',
            duration: 'Duration',
            calories: 'Calories',
            pace: 'Pace',
            elevationGain: 'Elevation Gain',
            cadence: 'Cadence',
            maxPace: 'Max Pace',
            maxCadence: 'Max Cadence',
            start: 'Start',
            end: 'End',
          },
          image: {
            type: 'Image',
          },
          post: {
            type: 'Post',
            note: 'Note',
            time: 'Time',
            image: 'Image',
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
          unknownApiError: 'Something went wrong',
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
            height: 'Height',
            units: 'Units',
            gender: 'Gender',
            birthDate: 'Birth Date',
            country: 'Country',
          },
          placeholders: {
            gender: 'Select your gender',
            country: 'Select your country',
          },
          errors: {
            name: 'Name is required',
            email: 'Email is required',
            password: 'Password is required',
            passwordConfirmation: 'Password confirmation is missing',
            height: 'Height is required',
            gender: 'Gender is required',
            birthDate: 'Birth date is required',
            country: 'Country is required',
          },
          buttons: {
            signIn: 'Sign In',
            register: 'Sign up',
          },
        },
      },
      passwordReset: {
        heading: 'Restore Password',
        toasts: {
          resetSuccess: 'The email has been sent',
        },
        form: {
          description: 'Enter your email and we will send you new password if your account exists',
          labels: {
            email: 'Email',
          },
          buttons: {
            reset: 'Send',
            signIn: 'Sign In',
          },
        },
      },
      passwordResetComplete: {
        heading: 'Set New Password',
        toasts: {
          resetSuccess: 'Password has been reset successfully',
        },
        form: {
          description: 'Enter your new password below',
          labels: {
            password: 'New Password',
            passwordConfirmation: 'Confirm Password',
          },
          placeholders: {
            password: 'Enter new password',
            passwordConfirmation: 'Confirm new password',
          },
          errors: {
            passwordMismatch: 'Passwords do not match',
            passwordTooShort: 'Password must be at least 5 characters',
          },
          buttons: {
            reset: 'Change Password',
            signIn: 'Sign In',
          },
        },
      },
    },
    argusCheckins: {
      labels: {
        entries: 'Argus Entries',
        types: 'Types:',
        sets: 'Sets',
        calories: 'Calories',
        duration: 'Duration',
      },
      buttons: {
        all: 'All',
      },
    },
  },
} satisfies FreeFormTranslationObject;
