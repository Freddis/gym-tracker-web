## General Project Structure
Common components and types should be on the top level.
Each component should be placed in a folder, which would serve as the top level for its subcomponents.
Subcomponents should not be imported by other subcomponents, only by the top-level components.
Subcomponents can be imported by their top-level components or siblings. Importing subcomponents/types from siblings or another should be avoided.

Enums, types, and interfaces are considered "types" and should be placed in the same folder. They contribute to abstraction, therefore there is not much difference between them. Validators should be placed in types as well if they're carrying a type and in the "validators" folder if not.

Typical folders: types, validators, services, utils. Utils are small and independant, while services might require a factory and other services to be instantiated.

If done correctly, in any given folder it would be easy to estimate what types those components are using and how big they are.

Typical folder structure can be:

UserService
  types
    User.ts
    UserWithPosts.ts
    UserFilter.ts
  services
    UserSubscriptionService
      types
        UserSubscription.ts
      UserSubscriptionService.ts
    UserBillingService  
      UserBillingService.ts
  UserService.ts
WorkoutService
  types
    Workout.ts
    WorkoutType.ts
    WorkoutStatus.ts
  WorkoutService.ts

## Test
Never use conditionals in tests. Don't use IF statements in tests.
Never add function in the tests.
Each test should be self contained. Ideal test should be easily scannable by eye and shouldn't require user to scroll up to check initialization or checking different files.

It's ok to add utilitiy functions into TestUtils, but they supposed to be universal and what they do should be understandeable from the name.

When we check values with expects, especially data we should check primarily against inline constant values. It's ok to check again variables in case if the value isn't known at the start of the test, like user id.

If the values are being asserted via expect are part of the seeds, they should be explicitly set in the begining of the test. Even if the default seed behavior uses the same values.
