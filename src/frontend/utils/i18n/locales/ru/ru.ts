import {Translation} from '../../types/Translation';

export const dictionary: Translation = {
  utils: {
    time: {
      weekDays: {
        0: 'Понедельник',
        1: 'Вторник',
        2: 'Среда',
        3: 'Чертверг',
        4: 'Пятница',
        5: 'Суббота',
        6: 'Воскресенье',
      },
    },
  },
  layout: {
    header: {
      profileMenu: {
        menu: {
          name: 'Мой Профиль',
          signOut: 'Выйти',
          language: 'Язык',
          darkTheme: 'Темная Тема',
        },
        toasts: {
          logoutSuccess: 'Вы успешно вышли',
        },
      },
      menu: {
        signIn: 'Войти',
        signOut: 'Выйти',
        feed: 'Лента',
        home: 'Главная',
        activities: 'Активность',
        exerciseLibrary: 'Упражнения',
      },
    },
    popups: {
      exerciseSelection: {
        heading: 'Выберите упражнение',
        labels: {
          exercises: 'Упражнения:',
          ownLibrary: 'Моя Библиотека',
          searchPlaceholder: 'Поиск...',
        },
      },
    },
    footer: {
      copyright: '© Home Studio 2025. Все права защищены. Разработано Alex S.',
      about: {
        heading: 'О Нас',
        content: `Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь 
        ласковых хозяев и тёплый кров. Один из проверенных 
        способов это сделать — помочь благотворительному фонду`,
      },
      contacts: {
        heading: 'Контакты',
        address: 'Сочи, пгт. Сириус, Войтенко 27',
      },
      social: {
        heading: 'Социальные Сети',
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
            middle: ' Средство достижения ',
            end: 'целей',
          },
          subheading: `В спорте и фитнесе далеко не продвинешся без фиксации прогресса. 
        Трекер Dicsipline - твой верный помощник.`,
          button: 'Скачать',
          toasts: {
            appNotYetPublished: 'К сожалению приложение еще не опубликовано в AppStore',
          },
        },
        features: {
          heading: {
            start: 'Что такое',
            end: ' discipline?',
          },
          workouts: {
            title: 'Трекинг Тренировок',
            description: `Отмечай прогресс на тренировках.
                        Встроенная библиотека насчитывает более 2000 управжнений, который ты можешь изменять под себя. 
                        `,
          },
          activities: {
            title: 'Трекинг Активностей',
            description: `Добавь бег, велосипед, плавание и многое другое. 
                          Создавай свои собственные активности, чтобы считать калории и видеть прогресс.`,
          },
          calories: {
            title: 'Подсчет Калорий',
            description: `Записывай калории, макросы и многое другое. 
                    С функцией сканирования баркода добавлять пищу стало легко как никогда.`,
          },
          analytics: {
            title: 'Аналитика',
            description: `Наша аналитика поможет тебе следить за прогрессом.
             История, графики, замеры тела. Задавай свои цели и следи за скоростью их достижения.`,
          },
        },
      },
    },
    activities: {
      list: {
        buttons: {
          addWorkout: 'Добавить',
        },
        objects: {
          workout: {
            type: 'Тренировка',
            calories: 'Калориии',
            duration: 'Длительность',
          },
        },
      },
    },
    auth: {
      login: {
        heading: 'Войти в существующий аккаунт',
        registerCta: 'Нет аккаунта?',
        toasts: {
          loginSuccess: 'Вы успешно вошли',
          unknownApiError: 'Что-то пошло не так.',
        },
        form: {
          labels: {
            email: 'Почта',
            password: 'Пароль',
          },
          buttons: {
            signIn: 'Войти',
            register: 'Регистрация',
            forgotPassword: 'Я забыл пароль',
          },
        },
      },
      registration: {
        heading: 'Создать новый аккаунт',
        form: {
          labels: {
            name: 'Имя',
            email: 'Почта',
            password: 'Пароль',
            passwordConfirmation: 'Подтверждение Пароля',
          },
          buttons: {
            signIn: 'Войти',
            register: 'Зарегистрироваться',
          },
        },
      },
    },
    feed: {
      heading: 'Следи За Другими',
    },
    exercises: {
      heading: 'Встроенная Библиотека',
      buttons: {
        addExercise: 'Добавить',
      },
      filter: {
        labels: {
          muscles: 'Мышцы:',
          search: 'Поиск:',
        },
      },
      toasts: {
        noExercisesFound: 'Упражнения не найдены',
      },
    },
  },
};
