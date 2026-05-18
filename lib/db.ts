import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type Database = {
  tasks: Task[];
  notes: Note[];
};

export function getDb(): Database {
  try {
    if (!fs.existsSync(dbPath)) {
      const initialDb: Database = { tasks: [], notes: [] };
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
      fs.writeFileSync(dbPath, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data) as Database;
  } catch (error) {
    console.error('Error reading db:', error);
    return { tasks: [], notes: [] };
  }
}

export function saveDb(db: Database): void {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing db:', error);
  }
}
