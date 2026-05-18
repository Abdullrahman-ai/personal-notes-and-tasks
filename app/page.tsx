import { getTasks, getNotes } from '@/app/actions';
import TasksList from '@/components/TasksList';
import NotesList from '@/components/NotesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function Home() {
  const tasks = await getTasks();
  const notes = await getNotes();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2 py-8">
          <h1 className="text-4xl font-bold text-primary">المهام والملاحظات</h1>
          <p className="text-muted-foreground">تطبيقك الشخصي لإدارة يومك بكل سهولة</p>
        </header>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="tasks">المهام</TabsTrigger>
            <TabsTrigger value="notes">الملاحظات</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="bg-background rounded-xl p-6 shadow-sm border">
            <TasksList initialTasks={tasks} />
          </TabsContent>
          <TabsContent value="notes" className="bg-background rounded-xl p-6 shadow-sm border">
            <NotesList initialNotes={notes} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
