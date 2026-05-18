'use client';

import { useState } from 'react';
import { Task } from '@/lib/db';
import { addTask, toggleTask, deleteTask } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

export default function TasksList({ initialTasks }: { initialTasks: Task[] }) {
  const [title, setTitle] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask(title);
    setTitle('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input 
          placeholder="مهمة جديدة..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd}>إضافة</Button>
      </div>

      <div className="space-y-2 mt-4">
        {initialTasks.length === 0 && <p className="text-muted-foreground text-center py-4">لا توجد مهام حالياً.</p>}
        {initialTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={task.completed} 
                  onCheckedChange={() => toggleTask(task.id)} 
                />
                <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                  {task.title}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
