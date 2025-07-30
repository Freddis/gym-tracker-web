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

### Vision

The project follows [Python Zen](https://peps.python.org/pep-0020/#abstract). 

In addition to that:
1. Project must be easily bootstrapable on localmachine
2. Project must be easily dockerized
3. IO is validated and typechecked. Services trust the data and doesn't need to make extra validation.
4. Functionality should be devided in isolated modules. Modules can depened on each other but not mutually. Dependence graph supposed to be a tree
5. 1 export = 1 file. That almost elliminates circular dependencies.
6. Verbose != bad
7. Ugly != bad
8. Elegant != good
9. Covered != well tested, yet better than nothing
10. Code should be copy/paste friendly. Copying is the way projects developed, it's unavoidable.

In this project frontend and backend are segregated even though they're running under the same framework. Only small amount of common utilities and enums should be shared.

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

Enums, types and interfaces are considered "types" and should be placed in the same folder. They contribute to abstruction, therefore there is not much difference between them. Validators should be placed in types as well if they're carrying a type and in "validators" folder if not.

For classes it would depend on the purpose: if it doesn't have methods and serves primarily as a type, it should be in types folder.

## Backend

On the backend everything is a service or utility.

### Services vs Utils
Utilities and services are similar, especially on the backend. 

Utilities are supposed to be lightweight and don't require inversion of control: they can be allocated anywhere without second thought. They can depend on other utilities but shouldn't depenend on other services. Generally it's better to keep utilities complitely independant.

Services do depend on each other and have initialization / destruction toutines. The solution for inversion of control for this project is factories. Factories are more robust than dependency injection but have more requirements for developer skill.

### MVC Pattern

It follows true MVC pattern where Model and Controllers are strictly divided. 

Model(singlular) is the layer containing business logic. Model has intenal and external representations. 

Internally model is stored in Postgres database or can be stored in external storage (AWS, Auth0, other services).

Internal representation should not leave the model service. For instance: Drizzle service has type for every table that serves as internal representation (i.e. WorkoutRow). WorkoutService uses DrizzleService inside and returns Workout object that has nested objects inside. Workout object is the external representation and in this particular case, externally it has only 1 id, the ID of workout.

The objective of controllers is to route requests to model and return View (json in this case) as response. Controllers should never have any business logic inside, only routing logic.

Controllers are in charge of data validation as well and aware about authentication and users. 

 > [!NOTE] Model should never interfere with with API or and controllers should never interfere with business logic. 

### Validators
 Normally I prefer to create validators and their types in the same file, like it's done in <b>DrizzleService</b>.
 
 API is an exception since model cannot touch API while controllers should not touch business logic.

 That's why validators are stored on the controller side, while Services operate with types, even though it would be easier to create those types from the same validators.

 Some validators contain transformers for path and request data. If they've been stored in the model services they would sooner or later become unusuable.

 ### Notable Services
 1. <b>DrizzleService</b><br/>
 Manages internal representation of the models stored in database, provides both types and validators for every table.
 2. <b>ApiService</b><br/>
 Manages OpenAPI and controllers. Validators and requests are stored here.
 3. <b>Model Services</b><br/>
 There are a lot of model services such as <b>WorkoutService</b> or <b>ExerciseService</b> that manage own piece of data and execute business logic on it.
 4. <b>AuthService</b><br/>
  Manages Authentication.

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
4. <b>Strap-On OpenAPI</b><br> 
Part of Strap-On OpenAPI package that generates client for OpenAPI schema.

The frontend serves as a thin client and should not rely on any types from backend folders (except common). Strap-On OpenAPI generates everything frontend would require: queries, mutations and types with comments.

### Tailwind & Design System
The frontend uses Tailwind in such fashion that everything should be described in TSX files. CSS file should only be used  if absolutely necessary.

Tailwind's color system is not good enough. It simply can't follow the domain logic of any modern website and cannot cover needs of a design system.

There are 2 problems:
1. Dark theme requires separate set of colors
2. Design system implies that each block type incapsulates certain logic (UX) while style of the block depends should be easily changeable(UI).

There 2 things are not achieveable with Tailwind out of the box.

It's ok to have the same margins and paddings throughout the project, tailwind can cover that with built-in classes, but it's getting stuck when it comes to color palettes.

To overcome this limitation I created a set of palletes that depend on each other. There are predefined design tokens for backgrounds and surfaces: <b>bg-main</b>,<b>text-on-main</b>,<b>bg-surface</b>,<b>text-on-surface</b>,<b>bg-cavity</b> and so on.

Each palette has <b>dark</b> and <b>light</b> representation. Sometimes they're the same (info, danger and warning toasts) and sometimes different.

There are 3 primary palettes: 
1. Neutral
2. Contast
3. Blend

Originally they were lighest and darkest but it gets confusing in opposite theme modes.

For each pallete a special class is generated in tailwind: 'palatte-neutral', 'palette-blend','palette-contrast'.

To change palette on a block simply change pallete on the top-most HTML element of this block.

> [!NOTE] 
> This approach guarantees that colors are ALWAYS perfectly aligned and you don't need to change any internal tailwind classes inside blocks if you need to change pallete for specific block

Palletes are always regenerated on any change of any file. It's managed  by a small custom plugin I wrote for Vite.

> 
> [!NOTE] Storybook has all the elements displayed in both light and dark mode. There is a page that demonstrates all the available palletes on a sample block

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
2. <s> Finish the interface for palettes in design system. Right now it's I think there is not enough tokens in palette. Need to have simplistic and complete way to describe colors for any given block / page.</s>
3. Switch to such development fashion that everything that the user / tester sees is working. No links that leads nowhere or buttons that don't work.
4. Add browser tests and GHA workflow for them
5. Add endless feed case

### Backend
1. <s>Figure out decorator system for DTOs. How many layers needed to eliminate any conflicts between db,services and api</s>
2. Do we need transaction opened for every request?
3. Figure out layers for primary
4. Connect email sever


### Project
1. <s>Start writing documentation to form the project vision</s>
2. <s>Move images to own storage</s>
3. Add simplistic CRM / CMS