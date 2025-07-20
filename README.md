# Discipline Backend

This is the backend for Discipline project. It's a gym tracker similar to Havy, Strong apps. Ideally it should become like Argus, which is less known due to poor quality but allows to track anything an athlete would desire: gym workouts, outdoor workouts, food, weight, measurements and so on.

[Frameworks](#frameworks)

[Tests](#tests)

[Deployment](#deployment)

[Package.json](#packagejson-scripts)

[Todo / Roadmap](#todo)

## Related projects

[Strap-On OpenAPI](https://github.com/Freddis/strap-on-openapi)

[AWS Deployment Infrastructure](https://github.com/Freddis/cdk)

[Mobile App](https://github.com/Freddis/gym-tracker-mobile)


## Quick Start

```sh
git clone https://github.com/Freddis/gym-tracker-web
cd gym-tracker-web
npm install
docker-compose up -d db 
npm run db:migrate
npm run dev
```
Running the project in dev mode automatically does this:
1. Re-generates OpenAPI schema
2. Runs Vite project in dev mode, with --host option to allow access from local network
3. Runs Storybook

Dev mode also will bind dev routes such as /stoplight to output documentation and playground for the API.

## Architecture

### Frameworks
The project uses Tanstack Start as the frontend framework, which is similar to <b>NextJS</b>. The Backend API is built upon <b>Strap-On OpenAPI</b> which is framework agnostict.

Unlike NextJS, Tanstack Start easily allows to turn it into single page application (SPA). Combined with the fact that Strap-On OpenAPI is framework agnostic it would allow for quick scaling when the time comes.

### Folder stucture
Both backend and fronted should follow the same approach: 
1. Common components and types should be on the top level.
2. Each component should be placed in a folder, which would serve as top level for it's subcomponents.
3. Subcomponents should not be imported by other subcomponents, only by the top Level components.

Subcomponents can be imported by their top level components or siblings. Importing subcomponents / types from siblings or another should be avoided.

> [!NOTE]
> If done correctly in any given folder it would be easy to estimate what types those components are using and how big they're.

Typical folder structure can be:
```
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
```
Following the logic described above: SubscriptionService should freely access UserBillingService and UserService, while acessing WorkoutService should be avoided, since they're not siblings and not in the same composition.

Enums, types and interfaces are considered "types" and should be placed in the same folder. They contribute to abstruction, therefore there is not much difference between them. Validators should be placed in types as well.

For classes it would depend on the purpose: if it doesn't have methods and serves primarily as a type, it should be in types folder.

## Frontend
The project utilizes design system, built using:
1. <b>React</b><br>
As defacto industry standard. As much I love Solid, it's preformance perks cannot solve all the problems related to reactive frontends.<br>
1. <b>Tailwind</b><br>
Solution for CSS. Picked mostly because it seems like it's the standard right now in 2025.
2. <b>Shadcn</b>
This is ideal solution for projects that use design system. Components are fully customizable and unstyled by default.
3. <b>Storybook</b><br> 
Serves as preview for design system and it's building blocks. Allows for development of new blocks right inside.

### Tests

#### Vision
Tests based on Vitest right now. Tests suits should be placed next to files they're testing.

Utility functions used in tests should be placed:
1. In the test file if this function only useful in this particular suit.
2. In one of the components of <b>TestUtils</b> static class. <b>TestUtils</b>

#### TestUtils

Test Utilities is static class that aggregates other tests utilities and serves as entry point for every utility in tests.

Utilities are categorizied by purpose and can call each other internally. If case when they do it, they shouldn't make such calls through <b>TestUtils</b> - it will lead to circular dependencies. Such calls should be done directly.

1. Business Utilities. Utilities related to the business logic or architecture of the project. In other words, things specific to this project. Example: ```TestUtils.business.getFactory()``` returns service factory.
2. Common. Utilities related to the testing process, such as awaiting for values changed in the database. 
3. Seed. Utilities allowing to quickly seed data for your tests.

Coverage and reporting is already setup for the tests.

When pull requests is created to the main branch or 

### Deployment
In order to deploy you just need to push to the <b>production</b> branch. This brack solely exists for the purpose of deployments, so it's absolutely fine to delete production branch and force push new one.

Since automated testing happens during PR and merge, only the main branch should be pushed to production branch.

### Package.json Scripts

#### db:backup / db:restore
Creates backup of local DB or restores it using bundled postgres scripts. Useful while local DB still serves as primary DB

#### db:generate
Creates new migration according to new changes in schema. This migrations should not be deleted by hand, since Drizzle only tracks schema.
Usage: ```npm run db:generate --name=MyMigration```

#### db:drop
It's the proper way of deleting migrations, this will delete both migration and record from Drizzle journal.

#### db:drop
It's the proper way of deleting migrations, this will delete both migration and record from Drizzle journal.

#### db:clean
Wipes out everything from the local database.

#### db:seed
Seeds database with some predefined data useful for local development. This data should be always keeped meaningful, don't put rubbish in seeds.

#### test:coverage
Runs tests and opens tests results in the browser. Coverage report can be accessed from the browser or by opening it in html folder.

#### test:gha
Runs tests for GithubActions. Uses more appopriate text-based coverage report.

#### test:typecheck
Checks the types consistency using <b>tsc</b> Typescript compiler. This has to be done prior to every commit, otherwise it risks to fail automated tests on github.

#### lint
Lints the project according to the eslint rules. Linting is a process of putting all code into the same style. This has to be done prior to every commit, otherwise it risks to fail automated tests on github.

### TODO

#### Frontend
1. Figure out error display on the frontend.
2. Finish the interface for palettes. Right now it's I think there is not enough tokens in palette. Need to have simplistic and complete way to describe colors for any given block / page.
3. Switch to such development fashion that everything that the user / tester sees is working. No links that leads nowhere or buttons that don't work.

### Backend
1. Figure out decorator system for DTOs.


### Project
1. <s>Start writing documentation to form the project vision</s>
2. <s>Move images to own storage</s>