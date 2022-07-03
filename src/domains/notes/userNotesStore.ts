import { writable } from 'svelte/store';
import type { Note } from './Note';
import { getUserNotes } from './noteDb';

export const userNotesStore = writable<Note[]>([]);

export async function loadUserNotes() {
  const notes = await getUserNotes();
  userNotesStore.set(notes);
}
