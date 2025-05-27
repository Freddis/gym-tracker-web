import {header} from './layout/header';

export const dictionary = {
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
