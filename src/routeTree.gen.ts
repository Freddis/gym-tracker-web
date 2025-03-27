/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ExercisesImport } from './routes/exercises'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ExercisesRoute = ExercisesImport.update({
  id: '/exercises',
  path: '/exercises',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/exercises': {
      id: '/exercises'
      path: '/exercises'
      fullPath: '/exercises'
      preLoaderRoute: typeof ExercisesImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/exercises': typeof ExercisesRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/exercises': typeof ExercisesRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/exercises': typeof ExercisesRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/exercises'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/exercises'
  id: '__root__' | '/' | '/exercises'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ExercisesRoute: typeof ExercisesRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ExercisesRoute: ExercisesRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/exercises"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/exercises": {
      "filePath": "exercises.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
