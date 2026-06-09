import {
  Food,
  FoodAmountUnit,
  ServingSizeUnit,
} from '../../../src/frontend/common/utils/openapi-client';

export class StorybookFoodUtils {

  static getFood(type: 'omelette' | 'salad' | 'pasta' | 'apple' | 'coffee' = 'omelette'): Food {
    const map: Record<typeof type, Food> = {
      omelette: this.getOmelette(),
      salad: this.getSalad(),
      pasta: this.getPasta(),
      apple: this.getApple(),
      coffee: this.getCoffee(),
    };
    return map[type];
  }

  static getOmelette(): Food {
    const omelette:Food = {
      id: 'd85aa9d1-33c9-4a67-9f44-c73585634e58',
      name: 'Omelette',
      calories: 100,
      protein: 10,
      carbs: 10,
      fat: 10,
      description: null,
      image: {
        id: '321e4562-e89b-12d3-a456-426614174000',
        url: '/images/food/omelette.jpg',
      },
      servingSize: null,
      servingSizeUnit: ServingSizeUnit.GRAM,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isMeal: true,
      components: [
        {
          food: this.getEgg(),
          amount: 3,
          unit: FoodAmountUnit.SERVING,
        },
        {
          food: this.getMilk(),
          amount: 100,
          unit: FoodAmountUnit.GRAM,
        },
      ],
      visibility: 'Public',
      barcode: null,
      copiedFromId: null,
    };
    return omelette;
  }

  static getEgg(): Food {
    const egg:Food = {
      id: 'd85aa9d1-33c9-4a67-9f44-c73585634e58',
      name: 'Egg',
      description: null,
      image: {
        id: '321e4562-e89b-12d3-a456-426614174000',
        url: '/images/food/egg.jpg',
      },
      calories: 0,
      protein: 7,
      carbs: 0.5,
      fat: 5.2,
      servingSize: 68,
      servingSizeUnit: ServingSizeUnit.GRAM,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isMeal: false,
      components: [],
      visibility: 'Public',
      barcode: null,
      copiedFromId: null,
    };
    return egg;
  }

  static getSalad(): Food {
    const salad:Food = {
      id: 'd85aa9d1-33c9-4a67-9f44-c73585634e58',
      name: 'Salad',
      calories: 100,
      protein: 10,
      carbs: 10,
      fat: 10,
      description: null,
      image: {
        id: '321e4562-e89b-12d3-a456-426614174000',
        url: '/images/food/salad.jpg',
      },
      servingSize: null,
      servingSizeUnit: ServingSizeUnit.GRAM,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isMeal: false,
      components: [],
      visibility: 'Public',
      barcode: null,
      copiedFromId: null,
    };
    return salad;
  }

  static getPasta(): Food {
    const pasta:Food = {
      id: 'd85aa9d1-33c9-4a67-9f44-c73585634e58',
      name: 'Pasta',
      calories: 100,
      protein: 7,
      carbs: 75,
      fat: 1.0,
      description: null,
      image: {
        id: '321e4562-e89b-12d3-a456-426614174000',
        url: '/images/food/pasta.jpg',
      },
      servingSize: null,
      servingSizeUnit: ServingSizeUnit.GRAM,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isMeal: false,
      components: [],
      visibility: 'Public',
      barcode: null,
      copiedFromId: null,
    };
    return pasta;
  }

  static getCoffee(): Food {
    const coffee:Food = {
      id: 'd85aa9d1-33c9-4a67-9f44-c73585634e58',
      name: 'Coffee with milk',
      calories: 100,
      protein: 10,
      carbs: 10,
      fat: 10,
      description: null,
      image: {
        id: '321e4562-e89b-12d3-a456-426614174000',
        url: '/images/food/coffee.jpg',
      },
      servingSize: null,
      servingSizeUnit: ServingSizeUnit.GRAM,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isMeal: true,
      components: [
        {
          food: this.getMilk(),
          amount: 100,
          unit: FoodAmountUnit.GRAM,
        },
        {
          food: this.getSugar(),
          amount: 10,
          unit: FoodAmountUnit.GRAM,
        },
      ],
      visibility: 'Public',
      barcode: null,
      copiedFromId: null,
    };
    return coffee;
  }

  static getMilk(): Food {
    const milk:Food = {
      id: 'd85aa9d1-33c9-4a67-9f44-c735856234e58',
      name: 'Milk 1.5%',
      description: null,
      image: {
        id: '321e4562-e89b-12d3-a456-426614174000',
        url: '/images/food/milk.jpg',
      },
      calories: 45,
      protein: 3.1,
      carbs: 4.7,
      fat: 1.5,
      servingSize: null,
      servingSizeUnit: ServingSizeUnit.GRAM,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isMeal: false,
      components: [],
      visibility: 'Public',
      barcode: null,
      copiedFromId: null,
    };
    return milk;
  }
  static getSugar(): Food {
    const sugar:Food = {
      id: 'd85aa9d1-33c9-4a67-9f44-c735856234e58',
      name: 'Sugar',
      description: null,
      image: null,
      calories: 0,
      protein: 0,
      carbs: 98.7,
      fat: 0,
      servingSize: null,
      servingSizeUnit: 'Gram',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isMeal: false,
      components: [],
      visibility: 'Public',
      barcode: null,
      copiedFromId: null,
    };
    return sugar;
  }

  static getApple(): Food {
    const apple:Food = {
      id: 'd85aa9d1-33c9-4a67-9f44-c73585634e58',
      name: 'Apple',
      calories: 100,
      protein: 0.5,
      carbs: 25.1,
      fat: 0.3,
      description: null,
      image: {
        id: '321e4562-e89b-12d3-a456-426614174000',
        url: '/images/food/apples.jpg',
      },
      servingSize: 50,
      servingSizeUnit: ServingSizeUnit.GRAM,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isMeal: false,
      components: [],
      visibility: 'Public',
      barcode: null,
      copiedFromId: null,
    };
    return apple;

  }

}
