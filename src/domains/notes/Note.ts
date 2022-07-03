export interface Note {
  body: string;
  createdAt: number;
  id: string;
  title: string;
  updatedAt: number;
}

export function createNote(init?: Partial<Note>): Note {
  return {
    ...init,
    body: init?.body ?? '',
    createdAt: init?.createdAt ?? 0,
    id: init?.id ?? '',
    title: init?.title ?? '',
    updatedAt: init?.updatedAt ?? 0,
  };
}
