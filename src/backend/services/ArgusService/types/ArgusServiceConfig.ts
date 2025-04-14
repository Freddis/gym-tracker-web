export interface ArgusServiceConfig {
  tempFolderPath: string,
  seededUser: {
    name: string,
    email: string,
    password: string,
    argusAuthToken: string,
  }
}
