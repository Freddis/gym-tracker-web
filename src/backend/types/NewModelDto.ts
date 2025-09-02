
export type NewModelDto<T> = Omit<T, 'id'|'updatedAt'|'createdAt'|'deletedAt'|'userId'>
