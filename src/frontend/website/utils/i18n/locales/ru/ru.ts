import {Translation} from '../../types/Translation';
import {countries} from './utils/countries';

export const dictionary: Translation = {
  utils: {
    time: {
      weekDays: {
        0: 'Воскресенье',
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
        7: 'Воскресенье',
      },
    },
    objects: {
      entry: {
        fields: {
          time: 'Время',
          note: 'Заметка',
          image: 'Изображение',
          visibility: 'Видимость',
        },
      },
      meal: {
        fields: {
          type: 'Тип',
        },
        types: {
          Breakfast: 'Завтрак',
          Lunch: 'Обед',
          Dinner: 'Ужин',
          Snack: 'Перекус',
          Other: 'Другое',
        },
      },
      food: {
        fields: {
          name: 'Имя',
          description: 'Описание',
          image: 'Изображение',
          calories: 'Калории',
          protein: 'Белки',
          carbs: 'Углеводы',
          fat: 'Жиры',
          servingSize: 'Размер порции',
          servingSizeUnit: 'Единица измерения порции',
          isMeal: 'Является блюдом',
          components: 'Компоненты',
          createdAt: 'Дата создания',
          updatedAt: 'Дата обновления',
          deletedAt: 'Дата удаления',
          id: 'ID',
        },
      },
      entryType: {
        Workout: 'Тренировка',
        Weight: 'Вес',
        Post: 'Запись',
        OutdoorRun: 'Бег на улице',
        OutdoorWalk: 'Прогулка',
        Meal: 'Еда',
        CalorieGoal: 'Цель по калориям',
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
      weight: {
        fields: {
          value: 'Вес',
        },
        errors: {
          value: {
            notNumber: 'Значение должно быть числом',
          },
        },
      },
      units: {
        kg: 'кг',
        km: 'км',
        m: 'м',
        g: 'г',
      },
      genders: {
        Male: 'Мужской',
        Female: 'Женский',
        Other: 'Другой',
      },
      foodUnits: {
        Gram: 'г',
      },
      weightUnits: {
        Kg: 'кг',
        Lbs: 'фунты',
      },
      temperatureUnits: {
        C: 'C',
        F: 'F',
      },
      distanceUnits: {
        Km: 'км',
        Mi: 'мили',
      },
      heightUnits: {
        Cm: 'см',
        Ft: 'футы',
      },
      entryVisibility: {
        Public: 'Публичный',
        Private: 'Скрытый',
      },
      countries: countries,
      workoutPlan: {
        fields: {
          id: 'ID',
          name: 'Имя',
          description: 'Описание',
          userId: 'Пользователь',
          createdAt: 'Дата Создания',
          updatedAt: 'Дата Обновления',
          deletedAt: 'Дата Удаления',
        },
      },
      workout: {
        fields: {
          id: 'ID',
          typeId: 'Тип',
          userId: 'Пользователь',
          calories: 'Калории',
          start: 'Начата',
          end: 'Завершена',
          createdAt: 'Дата Создания',
          updatedAt: 'Дата Обновления',
          deletedAt: 'Дата Удаления',
          exercises: 'Упражнения',
        },
      },
      exercise: {
        fields: {
          id: 'ID',
          name: 'Имя',
          description: 'Описание',
          difficulty: 'Сложность',
          equipment: 'Оборудование',
          images: 'Изображения',
          params: 'Параметры',
          userId: 'Пользователь',
          copiedFromId: 'Оригинальное Упражнение',
          parentExerciseId: 'Родительское Упражнение',
          createdAt: 'Дата Создания',
          updatedAt: 'Дата Обновления',
          deletedAt: 'Дата Удаления',
          muscles: 'Мышцы',
          variations: 'Вариации',
          isArchived: 'В архиве',
        },
      },
    },
    toasts: {
      unknownApiError: 'Что-то пошло не так.',
      notImplemented: 'К сожалению, функция пока не добавлена',
      invalidForm: 'Информация отсутствует или указана неверно',
    },
    generic: {
      images: {
        noImageLabel: 'Нет Изображения',
      },
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
      foodSelection: {
        heading: 'Выберите еду',
        labels: {
          food: 'Еда:',
          ownLibrary: 'Моя Библиотека',
          searchPlaceholder: 'Поиск...',
        },
        toasts: {
          noFoodFound: 'Еда не найдена',
        },
      },
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
        address: 'Грузия, Тбилиси, ул. Шардена, 12',
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
    workoutPlanBlock: {
      buttons: {
        addWorkout: 'Добавить Тренировку',
      },
    },
    newsBlock: {
      labels: {
        readMore: 'Читать Далее',
      },
    },
    entryBlock: {
      labels: {
        unkownEntry: 'Неизвестный тип записи',
      },
    },
    errorDisplay: {
      NotFound: 'Запрашиваемый объект не найден',
      Unauthorized: 'Вы должны быть авторизованы, чтобы просмотреть эту страницу',
      ValidationFailed: 'Ошибки валидации в запросе:',
      Unknown: 'Похоже, на сервере произошла непредвиденная ошибка. Пожалуйста, обратитесь в нашу службу поддержки, и мы её исправим.',
    },
  },
  pages: {
    calorieGoal: {
      create: {
        heading: 'Добавить Цель по Калориям',
        toasts: {
          success: 'Вы успешно добавили цель по калориям',
        },
      },
    },
    meals: {
      create: {
        heading: 'Добавить Еду',
        toasts: {
          success: 'Вы успешно добавили еду',
        },
      },
      update: {
        heading: 'Обновить Еду',
        toasts: {
          deletionSuccess: 'Вы успешно удалили еду',
          success: 'Вы успешно обновили еду',
        },
      },
    },
    settings: {
      toasts: {
        success: 'Настройки успешно обновлены',
      },
      changePassword: {
        heading: 'Изменить Пароль',
        labels: {
          oldPassword: 'Старый Пароль',
          newPassword: 'Новый Пароль',
          confirmPassword: 'Подтвердить Пароль',
        },
        toasts: {
          success: 'Пароль успешно изменен',
        },
      },
      view: {
        heading: 'Настройки',
        buttons: {
          edit: 'Редактировать',
          changePassword: 'Изменить Пароль',
        },
        labels: {
          about: 'О себе',
          general: 'Общие',
          goals: 'Цели',
          height: 'Рост',
          weight: 'Вес',
          country: 'Страна',
          distance: 'Дистанция',
          temperature: 'Температура',
          age: 'Возраст',
          units: 'Единицы Измерения',
          security: 'Безопасность',
          name: 'Имя',
          email: 'Почта',
          profilePicture: 'Изображение профиля',
          gender: 'Пол',
          dateOfBirth: 'Дата рождения',
          visibility: 'Видимость',
        },
      },
      update: {
        heading: 'Обновить Настройки',
        sections: {
          general: 'Общие',
          units: 'Единицы',
        },
        labels: {
          name: 'Имя',
        },
      },
    },
    profile: {
      heading: 'Профиль',
      buttons: {
        addGoal: 'Добавить Цель',
      },
      toasts: {
        noGoals: 'У вас пока нет целей. Попробуйте добавить одну!',
      },
      labels: {
        from: 'От',
        remainingToday: 'Осталось Сегодня',
        visibility: 'Видимость',
        about: 'О себе',
        age: 'Возраст',
        goals: 'Цели',
        height: 'Рост',
        weight: 'Вес',
        deviation: 'Ежедневное Отклонение: {deviation} ({percentage}%)',
      },
    },
    food: {
      update: {
        heading: 'Обновить Еду',
        toasts: {
          success: 'Вы успешно обновили еду',
          deletionSuccess: 'Вы успешно удалили еду',
          invalidForm: 'Некоторые данные отсутствуют или неверны',
        },
      },
      create: {
        heading: 'Добавить Еду',
        labels: {
          components: 'Компоненты',
          hasServingSize: 'Есть Порция',
          grams: 'Граммы',
          servings: 'Порций',
        },
        buttons: {
          crateFood: 'Добавить Еду',
          crateDish: 'Добавить Блюдо',
          addComponent: 'Добавить Компонент',
        },
        toasts: {
          success: 'Вы успешно добавили еду',
          noComponents: 'Вы должны добавить хотя бы одну еду',
        },
      },
      list: {
        heading: 'Моя Еда',
        labels: {
          calories: 'Калории',
          protein: 'Белки',
          carbs: 'Углеводы',
          fat: 'Жиры',
          servingSize: 'Размер порции',
          caloriesPerServing: 'В 1 порции',
          components: 'Компоненты',
        },
        buttons: {
          addFood: 'Добавить Еду',
          addDish: 'Добавить Блюдо',
        },
        filter: {
          clearFilters: 'Очистить',
          labels: {
            search: 'Поиск:',
            isDish: 'Только Блюда',
            noDishes: 'Убрать Блюда',
          },
        },
        toasts: {
          nothingFound: 'Еда не найдена',
        },
      },
    },
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
      form: {
        labels: {
          name: 'Имя',
          description: 'Описание',
        },
        buttons: {
          addExercise: 'Добавить Упражнение',
          addSet: 'Добавить',
          deleteSet: 'Удалить',
          deleteExercise: 'Удалить',
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
      notFound: {
        code: '404',
        title: 'Страница не найдена',
        description: 'Такой страницы не существует. Если это ошибка, пожалуйства дайте нам знать, и мы починим!',
      },
      error: {
        title: 'Упс... У нас ошибка',
        description: 'Произошло что-то страшное, и мы не знаем почему. Пожалуйства дайте нам знать, и мы починим!',
        link: 'На главную',
      },
    },
    activities: {
      posts: {
        add: {
          heading: 'Добавить Запись',
          toasts: {
            success: 'Вы успешно добавили запись',
          },
        },
        update: {
          heading: 'Изменить Изображение',
          toasts: {
            success: 'Вы успешно изменили запись',
          },
        },
      },
      list: {
        buttons: {
          addWorkout: 'Добавить',
          addEntry: 'Добавить',
          plans: 'Планы Тренировок',
          types: 'Типы Тренировок',
          food: 'Моя Еда',
        },
        objects: {
          calorieGoal: {
            type: 'Цель по Калориям',
          },
          meal: {
            type: 'Еда',
          },
          workout: {
            type: 'Тренировка',
            calories: 'Калориии',
            duration: 'Длительность',
          },
          weight: {
            type: 'Вес',
          },
          image: {
            type: 'Изображение',
          },
          outdoorWalk: {
            type: 'Прогулка',
            distance: 'Дистанция',
            duration: 'Длительность',
            calories: 'Калории',
            pace: 'Темп',
            elevationGain: 'Подъем',
            cadence: 'Каденс',
            maxPace: 'Макс. Темп',
            maxCadence: 'Max Каденс',
            start: 'Начало',
            end: 'Конец',
          },
          outdoorRun: {
            type: 'Бег',
            distance: 'Дистанция',
            duration: 'Длительность',
            calories: 'Калории',
            pace: 'Темп',
            cadence: 'Каденс',
            maxPace: 'Макс. Темп',
            maxCadence: 'Max Каденс',
            start: 'Начало',
            end: 'Конец',
            elevationGain: 'Подъем',
          },
          post: {
            type: 'Запись',
            note: 'Текст',
            image: 'Изображение',
            time: 'Время',
          },
        },
        heading: 'Мои Записи',
        filter: {
          labels: {
            type: 'Тип Записи',
            date: 'Дата:',
          },
          clearFilters: 'Очистить',
        },
        toasts: {
          nothingFound: 'Записи не найдены',
        },
      },
      workouts: {
        add: {
          heading: 'Добавить тренировку',
        },
        update: {
          heading: 'Изменить тренировку',
          buttons: {
            addSet: 'Добавить',
            addExercise: 'Добавить Упражнение',
            swapExercise: 'Поменять',
          },
          labels: {
            exercises: 'Упражнения: ',
            findWorkoutType: 'Поиск',
            selectWorkoutType: 'Выберите тип тренировки',
            noWorkoutTypesFound: 'Ничего не найдено',
          },
          toasts: {
            success: 'Тренировка успешно изменена',
          },
        },
      },
      create: {
        heading: 'Добавить Запись',
        buttons: {
          addWorkout: 'Добавить Тренировку',
          addWeight: 'Добавить Вес',
          addPost: 'Добавить Запись',
          addMeal: 'Добавить Еду',
        },
        toasts: {
          success: 'Тренировака успешно добавлена',
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
            updateSuccess: 'Вы успешно обновили вес',
            notFound: 'Запись не найдена',
            deleteSuccess: 'Вы успешно удалили вес',
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
            height: 'Рост',
            units: 'Единицы',
            gender: 'Пол',
            birthDate: 'Дата рождения',
            country: 'Страна',
          },
          placeholders: {
            gender: 'Выберите ваш пол',
            country: 'Выберите вашу страну',
          },
          errors: {
            name: 'Поле является обязательным',
            email: 'Поле является обязательным',
            password: 'Пароль является обязательным',
            passwordConfirmation: 'Поле является обязательным',
            height: 'Поле является обязательным',
            gender: 'Поле является обязательным',
            birthDate: 'Поле является обязательным',
            country: 'Поле является обязательным',
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
      passwordReset: {
        heading: 'Восстановление пароля',
        toasts: {
          resetSuccess: 'Письмо успешно отравлено',
        },
        form: {
          description: 'Укажите адрес своей электронной почты. Если ваш аккаунт существует мы отправим письмо с новым паролем.',
          labels: {
            email: 'Почта',
          },
          buttons: {
            reset: 'Отправить',
            signIn: 'Войти',
          },
        },
      },
      passwordResetComplete: {
        heading: 'Установить новый пароль',
        toasts: {
          resetSuccess: 'Пароль успешно изменен',
        },
        form: {
          description: 'Введите новый пароль ниже',
          labels: {
            password: 'Новый пароль',
            passwordConfirmation: 'Подтвердите пароль',
          },
          placeholders: {
            password: 'Введите новый пароль',
            passwordConfirmation: 'Подтвердите новый пароль',
          },
          errors: {
            passwordMismatch: 'Пароли не совпадают',
            passwordTooShort: 'Пароль должен содержать минимум 5 символов',
          },
          buttons: {
            reset: 'Изменить пароль',
            signIn: 'Войти',
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
      list: {
        heading: 'Мои Упражнения',
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
      update: {
        heading: 'Изменить Упражнение',
        toasts: {
          cannotUpdateBuiltIn: 'Нельзя изменять встроенные упражнения',
          success: 'Упражнение обновлено',
        },
      },
      create: {
        heading: 'Создать Упражнение',
      },
    },
    exercise: {
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
    argusCheckins: {
      labels: {
        entries: 'Записи из Argus',
        types: 'Типы:',
        sets: 'Подходы',
        calories: 'Калории:',
        duration: 'Длительность:',
      },
      buttons: {
        all: 'Все',
      },
    },
  },
};
