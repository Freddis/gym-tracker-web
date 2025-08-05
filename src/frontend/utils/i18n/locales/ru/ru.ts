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
    objects: {
      entryType: {
        Workout: 'Тренировка',
        Weight: 'Вес',
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
    toasts: {
      logoutSuccess: 'Вы успешно вышли',
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
        content: `Это личный проект, созданный атлетом, которые влюбился в программирование. 
        Он сделан, чтобы отслеживать тренировки было просто и эффективно.`,
      },
      contacts: {
        heading: 'Контакты',
        address: 'Сочи, пгт. Сириус, Войтенко 27',
      },
      links: {
        heading: 'Ссылки',
        links: {
          termsOfService: 'Условия Использования',
          privacyPolicy: 'Политика Конфеденциальности',
        },
      },
    },
  },
  components: {
  },
  pages: {
    static: {
      articles: {
        header: 'Статьи',
        labels: {
          categories: 'Категории:',
        },
        articles: {
          termsOfService: 'Условия Использования',
          privacyPolicy: 'Политика Конфеденциальности',
        },
      },
      home: {
        hero: {
          heading: {
            start: 'Discipline.',
            middle: ' Путь к достижению ',
            end: 'целей',
          },
          subheading: `В спорте и фитнесе далеко не продвинешся без фиксации прогресса. 
        Трекер Discipline - твой верный помощник.`,
          button: 'Скачать',
          toasts: {
            appNotYetPublished: 'К сожалению приложение еще не опубликовано в AppStore',
          },
        },
        features: {
          heading: 'Что такое Discipline?',
          subheading: 'Есть отличные причины почему дисциплина существует!',
          workouts: {
            title: 'Трекинг Тренировок',
            description: `Отмечай прогресс на тренировках.
                        Встроенная библиотека насчитывает более 2000 управжнений, который ты можешь изменять под себя. 
                        `,
          },
          exerciseLibrary: {
            title: 'Огромная База Упражнений',
            description: `Встроенная библиотека содержит свыше 2000 упражнений.
        Выберите мышцу, и мы предложим варианты её прокачки!`,
          },
          autonomous: {
            title: 'Полная автономность',
            description: `Мы храним данные в облаке, но копия есть и на устройстве.
      Интернет не обязателен для эффективного использования.`,
          },
          ownExercises: {
            title: 'Создавай Свои Упражнения',
            description: `Все упражнения из тренировок копируются в личную библиотеку.
      Вы можете менять и настраивать их по своему вкусу.`,
          },
          analytics: {
            title: 'Строй Свою Аналитику',
            description: `Просматривай историю, помечай свои шаблоны и ставь цели.
      Найди то, что работает лучше всего именно для тебя!`,
          },
          freeFeatures: {
            title: 'Всегда Бесплатно',
            description: `Наша цель — надёжное приложение без подвоха.
      Мы никогда не закроем аналитику или типы тренировок за paywall.`,
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
        },
        pricing: {
          heading: 'Наши Цены',
          subheading: `Всё, что можно делать в Excel — бесплатно!
              Мы берём плату только за то, что требует поддержки и затрат.`,
          plans: {
            free: {
              name: 'Бесплатный',
              price: 'Бесплатно',
            },
            pro: {
              name: 'Про План',
              price: '30$ / год',
            },
          },
          points: {
            workoutTracking: 'Учёт тренировок',
            analytics: 'Аналитика',
            dataExport: 'Экспорт данных',
            cloudStorage: 'Облачное хранение данных',
            extendedCloudStorage: 'Облако для фото и видео',
            socialFeatures: 'Социальные функции',
            coaching: 'Коучинг',
            extendedAnalytics: 'Общая аналитика сообщества',
          },
        },
        download: {
          heading: 'Скачать Приложение',
          subheading: '“Come on! Do it! Do it now!!!!” Арнольд Шварценеггер',
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
          notImplemented: 'К сожалению, функция пока не добавлена',
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
      filter: {
        labels: {
          type: 'Тип Записи',
        },
      },
      toasts: {
        noActivitiesFound: 'Записи не найдены',
      },
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
          equipment: 'Обрудование',
        },
      },
      toasts: {
        noExercisesFound: 'Упражнения не найдены',
      },
    },
  },
};
