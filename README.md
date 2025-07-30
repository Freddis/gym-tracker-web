# Discipline Backend

This is the backend for the Discipline project. It's a gym tracker similar to Havy and Strong apps. Ideally, it should become like Argus, which is less known due to poor quality but allows you to track anything an athlete would desire: gym workouts, outdoor workouts, food, weight, measurements, and so on.

[Frameworks](#frameworks)

[Tests](#tests)

[Backend](#backend)

[Frontend](#frontend)

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
1. Re-generates the OpenAPI schema
2. Runs the Vite project in dev mode, with the --host option to allow access from the local network
3. Runs Storybook

Dev mode will also bind dev routes such as /stoplight to output documentation and a playground for the API.

## Architecture

### Vision

The project follows [Python Zen](https://peps.python.org/pep-0020/#abstract). 

In addition to that:
1. The project must be easily bootstrappable on a local machine
2. The project must be easily dockerized
3. IO is validated and typechecked. Services trust the data and don't need to make extra validation.
4. Functionality should be divided into isolated modules. Modules can depend on each other but not mutually. The dependency graph is supposed to be a tree.
5. 1 export = 1 file. That almost eliminates circular dependencies.
6. Verbose != bad
7. Ugly != bad
8. Elegant != good
9. Covered != well tested, yet better than nothing
10. Code should be copy/paste friendly. Copying is the way projects are developed; it's unavoidable.

In this project, frontend and backend are segregated even though they're running under the same framework. Only a small amount of common utilities and enums should be shared.

### Frameworks
The project uses Tanstack Start as the frontend framework, which is similar to <b>NextJS</b>. The Backend API is built upon <b>Strap-On OpenAPI</b> which is framework agnostic.

Unlike NextJS, Tanstack Start easily allows you to turn it into a single page application (SPA). Combined with the fact that Strap-On OpenAPI is framework agnostic, it allows for quick scaling when the time comes.

### Folder structure

The toplevel of (<b>src</b> folder) follows the common Tanstack Start structure: router.tsx client.tsx, routeTree.tsx, routes dir. You should quickly find your way around those if you're familiar with the framework. <b>backend</b> and <b>frontend</b> folders differ and follow more sophisticated approach described below.

Both backend and frontend should follow the same approach: 
1. Common components and types should be on the top level.
2. Each component should be placed in a folder, which would serve as the top level for its subcomponents.
3. Subcomponents should not be imported by other subcomponents, only by the top-level components.

Subcomponents can be imported by their top-level components or siblings. Importing subcomponents/types from siblings or another should be avoided.

> [!NOTE]
> If done correctly, in any given folder it would be easy to estimate what types those components are using and how big they are.

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
Following the logic described above: SubscriptionService should freely access UserBillingService and UserService, while accessing WorkoutService should be avoided, since they're not siblings and not in the same composition.

Enums, types, and interfaces are considered "types" and should be placed in the same folder. They contribute to abstraction, therefore there is not much difference between them. Validators should be placed in types as well if they're carrying a type and in the "validators" folder if not.

For classes, it would depend on the purpose: if it doesn't have methods and serves primarily as a type, it should be in the types folder.

## Backend

On the backend, everything is a service or utility.

### Services vs Utils
Utilities and services are similar, especially on the backend. 

Utilities are supposed to be lightweight and don't require inversion of control: they can be allocated anywhere without a second thought. They can depend on other utilities but shouldn't depend on other services. Generally, it's better to keep utilities completely independent.

Services do depend on each other and have initialization/destruction routines. The solution for inversion of control for this project is factories. Factories are more robust than dependency injection but have more requirements for developer skill.

### MVC Pattern

It follows the true MVC pattern where Model and Controllers are strictly divided. 

Model (singular) is the layer containing business logic. The model has internal and external representations. 

Internally, the model is stored in a Postgres database or can be stored in external storage (AWS, Auth0, other services).

Internal representation should not leave the model service. For instance: Drizzle service has a type for every table that serves as internal representation (i.e. WorkoutRow). WorkoutService uses DrizzleService inside and returns a Workout object that has nested objects inside. The Workout object is the external representation and in this particular case, externally it has only 1 id, the ID of the workout.

The objective of controllers is to route requests to the model and return a View (json in this case) as a response. Controllers should never have any business logic inside, only routing logic.

Controllers are in charge of data validation as well and are aware of authentication and users. 

 > [!NOTE] 
 > The model should never interfere with the API and controllers should never interfere with business logic. 

### Validators
 Normally I prefer to create validators and their types in the same file, like it's done in <b>DrizzleService</b>.
 
 API is an exception since the model cannot touch the API while controllers should not touch business logic.

 That's why validators are stored on the controller side, while Services operate with types, even though it would be easier to create those types from the same validators.

 Some validators contain transformers for path and request data. If they'd been stored in the model services they would sooner or later become unusable.

 ### Notable Services
 1. <b>DrizzleService</b><br/>
 Manages internal representation of the models stored in the database, provides both types and validators for every table.
 2. <b>ApiService</b><br/>
 Manages OpenAPI and controllers. Validators and requests are stored here.
 3. <b>Model Services</b><br/>
 There are a lot of model services such as <b>WorkoutService</b> or <b>ExerciseService</b> that manage their own piece of data and execute business logic on it.
 4. <b>AuthService</b><br/>
  Manages Authentication.

## Frontend
The project utilizes a design system, built using:
1. <b>React</b><br>
As the de facto industry standard. As much as I love Solid, its performance perks cannot solve all the problems related to reactive frontends.<br>
1. <b>Tailwind</b><br>
Solution for CSS. Picked mostly because it seems like it's the standard right now in 2025.
2. <b>Shadcn</b>
This is the ideal solution for projects that use a design system. Components are fully customizable and unstyled by default.
3. <b>Storybook</b><br> 
Serves as a preview for the design system and its building blocks. Allows for development of new blocks right inside.
4. <b>Strap-On OpenAPI</b><br> 
Part of the Strap-On OpenAPI package that generates a client for the OpenAPI schema.

The frontend serves as a thin client and should not rely on any types from backend folders (except common). Strap-On OpenAPI generates everything the frontend would require: queries, mutations, and types with comments.

### Tailwind & Design System
The frontend uses Tailwind in such a fashion that everything should be described in TSX files. The CSS file should only be used if absolutely necessary.

Tailwind's color system is not good enough. It simply can't follow the domain logic of any modern website and cannot cover the needs of a design system.

There are 2 problems:
1. Dark theme requires a separate set of colors
2. A design system implies that each block type encapsulates certain logic (UX) while the style of the block should be easily changeable (UI).

These 2 things are not achievable with Tailwind out of the box.

It's ok to have the same margins and paddings throughout the project, Tailwind can cover that with built-in classes, but it gets stuck when it comes to color palettes.

To overcome this limitation, I created a set of palettes that depend on each other. There are predefined design tokens for backgrounds and surfaces: <b>bg-main</b>, <b>text-on-main</b>, <b>bg-surface</b>, <b>text-on-surface</b>, <b>bg-cavity</b>, and so on.

Each palette has <b>dark</b> and <b>light</b> representation. Sometimes they're the same (info, danger, and warning toasts) and sometimes different.

There are 3 primary palettes: 
1. Neutral
2. Contrast
3. Blend

Originally they were lightest and darkest but it gets confusing in opposite theme modes.

For each palette, a special class is generated in Tailwind: 'palette-neutral', 'palette-blend', 'palette-contrast'.

To change the palette on a block, simply change the palette on the top-most HTML element of this block.

> [!NOTE] 
> This approach guarantees that colors are ALWAYS perfectly aligned and you don't need to change any internal Tailwind classes inside blocks if you need to change the palette for a specific block

Palettes are always regenerated on any change of any file. It's managed by a small custom plugin I wrote for Vite.

> [!NOTE] 
> Storybook has all the elements displayed in both light and dark mode. There is a page that demonstrates all the available palettes on a sample block

### Tests

#### Vision
Tests are based on Vitest right now. Test suites should be placed next to the files they're testing.

Utility functions used in tests should be placed:
1. In the test file if this function is only useful in this particular suite.
2. In one of the components of the <b>TestUtils</b> static class. <b>TestUtils</b>

#### TestUtils

Test Utilities is a static class that aggregates other test utilities and serves as the entry point for every utility in tests.

Utilities are categorized by purpose and can call each other internally. In case they do, they shouldn't make such calls through <b>TestUtils</b> - it will lead to circular dependencies. Such calls should be done directly.

1. Business Utilities. Utilities related to the business logic or architecture of the project. In other words, things specific to this project. Example: ```TestUtils.business.getFactory()``` returns the service factory.
2. Common. Utilities related to the testing process, such as awaiting values changed in the database. 
3. Seed. Utilities allowing you to quickly seed data for your tests.

Coverage and reporting are already set up for the tests.

When a pull request is created to the main branch or 

### Deployment
In order to deploy, you just need to push to the <b>production</b> branch. This branch solely exists for the purpose of deployments, so it's absolutely fine to delete the production branch and force push a new one.

Since automated testing happens during PR and merge, only the main branch should be pushed to the production branch.

### Package.json Scripts

#### db:backup / db:restore
Creates a backup of the local DB or restores it using bundled postgres scripts. Useful while the local DB still serves as the primary DB.

#### db:generate
Creates a new migration according to new changes in the schema. These migrations should not be deleted by hand, since Drizzle only tracks the schema.
Usage: ```npm run db:generate --name=MyMigration```

#### db:drop
It's the proper way of deleting migrations, this will delete both the migration and the record from the Drizzle journal.

#### db:clean
Wipes out everything from the local database.

#### db:seed
Seeds the database with some predefined data useful for local development. This data should always be kept meaningful, don't put rubbish in seeds.

#### test:coverage
Runs tests and opens test results in the browser. The coverage report can be accessed from the browser or by opening it in the html folder.

#### test:gha
Runs tests for Github Actions. Uses a more appropriate text-based coverage report.

#### test:typecheck
Checks the type consistency using the <b>tsc</b> Typescript compiler. This has to be done prior to every commit, otherwise it risks failing automated tests on github.

#### lint
Lints the project according to the eslint rules. Linting is a process of putting all code into the same style. This has to be done prior to every commit, otherwise it risks failing automated tests on github.

### TODO

#### Frontend
1. Figure out error display on the frontend.
2. <s> Finish the interface for palettes in the design system. Right now I think there are not enough tokens in the palette. Need to have a simplistic and complete way to describe colors for any given block/page.</s>
3. Switch to such development fashion that everything that the user/tester sees is working. No links that lead nowhere or buttons that don't work.
4. Add browser tests and GHA workflow for them
5. Add endless feed case

### Backend
1. <s>Figure out decorator system for DTOs. How many layers needed to eliminate any conflicts between db, services and api</s>
2. Do we need a transaction opened for every request?
3. Figure out layers for primary
4. Connect email server


### Project
1. <s>Start writing documentation to form the project vision</s>
2. <s>Move images to own storage</s>
3. Add simplistic CRM / CMS