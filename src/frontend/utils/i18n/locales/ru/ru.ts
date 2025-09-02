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
      muscles: {
        'Lower Back': 'Поясница',
        'Soleus': 'Камбаловидная мышца',
        'Front Deltoids': 'Передние дельтовидные',
        'Lats': 'Широчайшие',
        'Forearms': 'Предплечья',
        'Pecs': 'Грудные',
        'Hamstrings': 'Бицепс бедра',
        'Wrist Flexors': 'Сгибатели запястья',
        'Biceps': 'Бицепс',
        'Triceps': 'Трицепс',
        'Rear Deltoids': 'Задние дельтовидные',
        'Rotator Cuff': 'Вращательная манжета плеча',
        'Ankle': 'Лодыжка',
        'Abdominals': 'Пресс',
        'Glutes': 'Ягодицы',
        'Quadriceps': 'Квадрицепс',
        'Obliques': 'Косые мышцы живота',
        'Abductors': 'Отводящие мышцы бедра',
        'Gastrocnemius': 'Икроножная мышца',
        'Lateral Deltoids': 'Средние дельтовидные',
        'Hip Flexors': 'Сгибатели бедра',
        'Trapezius': 'Трапеция',
        'Neck': 'Шея',
        'Adductors': 'Приводящие мышцы бедра',
      },
      equipment: {
        'rowing': 'Гребля',
        'swimming': 'Плавание',
        'plate loaded': 'Тренажёр с блинами',
        'foam roller': 'Пенный ролик',
        'pullup bar': 'Турник',
        'stair climber': 'Степпер',
        'selectorized': 'Блочный тренажёр',
        'dip bar': 'Брусья',
        'preacher': 'Скамья Скотта',
        'hyperextension': 'Гиперэкстензия',
        'sandbag': 'Сэндбэг',
        'elliptical': 'Эллипсоид',
        'chair': 'Стул',
        'cable': 'Кроссовер',
        'captains chair': 'Капитанский стул',
        'towel': 'Полотенце',
        'water bottle': 'Бутылка воды',
        'stability ball': 'Фитбол',
        'table': 'Стол',
        'smith': 'Машина Смита',
        'kettlebell': 'Гиря',
        'cycling': 'Велоспорт',
        'step aerobics': 'Степ-аэробика',
        'plate': 'Блин',
        'platform': 'Платформа',
        'medicine ball': 'Медбол',
        'running': 'Бег',
        'barbell': 'Штанга',
        'backpack': 'Рюкзак',
        'ez curl bar': 'EZ-гриф',
        'walking': 'Ходьба',
        'bench': 'Скамья',
        'bodyweight': 'Собственный вес',
        'resistance band': 'Резинка',
        'dumbbell': 'Гантель',
        'jump rope': 'Скакалка',
        'treadmill': 'Беговая дорожка',
        'bosu ball': 'BOSU-мяч',
      },
    },
    toasts: {
      unknownApiError: 'Что-то пошло не так.',
      notImplemented: 'К сожалению, функция пока не добавлена',
    },
    generic: {
      buttons: {
        back: 'Назад',
        save: 'Сохранить',
        delete: 'Удалить',
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
        toasts: {
          noExercisesFound: 'Упражнения не найдены',
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
    exerciseBlock: {
      labels: {
        variations: 'Вариации',
        equipment: 'Оборудование:',
        primaryMuscles: 'Основные:',
        secondaryMuscles: 'Дополнительные:',
      },
      placeholders: {
        none: 'Нет',
        andMore: 'и еще...',
      },
    },
  },
  pages: {
    workoutPlans: {
      list: {
        heading: 'Планы тренировок',
        toasts: {
          noPlansFound: 'Вы пока не добавили планы тренировок. Попробуйте создать один!',
        },
      },
      create: {
        heading: 'Создать план тренировок',
        toasts: {
          success: 'Вы успешно добавили план тренировок',
        },
      },
      update: {
        heading: 'Обновить план тренировок',
        toasts: {
          success: 'Вы успешно обновили план тренировок',
          deletionSuccss: 'Вы успешно удалили план тренировок',
        },
      },
    },
    workoutTypes: {
      create: {
        heading: 'Создать тип тренировки',
        toasts: {
          success: 'Вы успешно добавили тип тренировки',
        },
      },
      update: {
        heading: 'Обновить тип тренировки',
        toasts: {
          success: 'Вы успешно обновили тип тренировки',
          deletionSuccss: 'Вы успешно удалили тип тренировки',
        },
      },
      list: {
        heading: 'Типы тренировок',
        toasts: {
          noPlansFound: 'У вас пока нет типов тренировок. Попробуйте добавить один!',
        },
        buttons: {
          add: 'Добавить тип тренировки',
        },
      },
    },
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
          addEntry: 'Добавить',
          plans: 'Планы Тренировок',
          types: 'Типы Тренировок',
        },
        objects: {
          workout: {
            type: 'Тренировка',
            calories: 'Калориии',
            duration: 'Длительность',
          },
          weight: {
            type: 'Вес',
          },
        },
        heading: 'Мои Записи',
        filter: {
          labels: {
            type: 'Тип Записи',
          },
        },
      },
      workouts: {
        add: {
          heading: 'Добавить тренировку',
        },
        update: {
          heading: 'Изменить тренировку',
        },
      },
      add: {
        heading: 'Добавить Запись',
        buttons: {
          addWorkout: 'Добавить Тренировку',
          addWeight: 'Добавить Вес',
        },
      },
      weight: {
        add: {
          heading: 'Добавить Вес',
          buttons: {
            save: 'Добавить',
            back: 'Назад',
          },
          toasts: {
            success: 'Вы успешно добавили вес',
          },
        },
        update: {
          heading: 'Обновить Вес',
          toasts: {
            success: 'Вы успешно обновили вес',
          },
          buttons: {
            save: 'Сохранить',
            back: 'Назад',
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
        toasts: {
          registrationSuccess: 'Вы успешно зарегистрировались',
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
          searchEquipment: 'Искать оборудование',
          noEquipmentFound: 'Не найдено',
          selectEquipment: 'Выбрать оборудование',
        },
      },
      toasts: {
        noExercisesFound: 'Упражнения не найдены',
      },
    },
  },
};
