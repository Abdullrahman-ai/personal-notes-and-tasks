'use server';

import { revalidatePath } from 'next/cache';
import { getDb, saveDb, Task, Note } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// -- Tasks Actions --

export async function getTasks(): Promise<Task[]> {
  const db = getDb();
  return db.tasks;
}

export async function addTask(title: string) {
  const db = getDb();
  const newTask: Task = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  db.tasks.push(newTask);
  saveDb(db);
  revalidatePath('/');
}

export async function toggleTask(id: string) {
  const db = getDb();
  const task = db.tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveDb(db);
    revalidatePath('/');
  }
}

export async function deleteTask(id: string) {
  const db = getDb();
  db.tasks = db.tasks.filter((t) => t.id !== id);
  saveDb(db);
  revalidatePath('/');
}

// -- Notes Actions --

export async function getNotes(): Promise<Note[]> {
  const db = getDb();
  return db.notes;
}

export async function addNote(title: string, content: string) {
  const db = getDb();
  const newNote: Note = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  db.notes.push(newNote);
  saveDb(db);
  revalidatePath('/');
}

export async function updateNote(id: string, title: string, content: string) {
  const db = getDb();
  const note = db.notes.find((n) => n.id === id);
  if (note) {
    note.title = title;
    note.content = content;
    saveDb(db);
    revalidatePath('/');
  }
}

export async function deleteNote(id: string) {
  const db = getDb();
  db.notes = db.notes.filter((n) => n.id !== id);
  saveDb(db);
  revalidatePath('/');
}
