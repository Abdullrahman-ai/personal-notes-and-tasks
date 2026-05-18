'use client';

import { useState } from 'react';
import { Note } from '@/lib/db';
import { addNote, updateNote, deleteNote } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function NotesList({ initialNotes }: { initialNotes: Note[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addNote(title, content);
    setTitle('');
    setContent('');
    setIsAddOpen(false);
  };

  const handleEdit = async () => {
    if (!currentNote || !title.trim()) return;
    await updateNote(currentNote.id, title, content);
    setCurrentNote(null);
    setTitle('');
    setContent('');
    setIsEditOpen(false);
  };

  const openEdit = (note: Note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">ملاحظاتي</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="ml-2 h-4 w-4" /> ملاحظة جديدة</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة ملاحظة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input placeholder="العنوان" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="المحتوى" value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
              <Button onClick={handleAdd} className="w-full">حفظ الملاحظة</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {initialNotes.length === 0 && <p className="text-muted-foreground col-span-full text-center py-4">لا توجد ملاحظات حالياً.</p>}
        {initialNotes.map((note) => (
          <Card key={note.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm whitespace-pre-wrap text-muted-foreground">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => openEdit(note)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteNote(note.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if(!open) setCurrentNote(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل الملاحظة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input placeholder="العنوان" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="المحتوى" value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
            <Button onClick={handleEdit} className="w-full">تحديث الملاحظة</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
