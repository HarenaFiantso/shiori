import { Check, CheckCircle2, FileText, Flag, LayoutDashboard, Sparkles } from 'lucide-react';

export function AppPreview() {
  return (
    <div className="bg-card border-border/60 shadow-card overflow-hidden rounded-3xl border">
      <div className="border-border/40 bg-secondary/30 flex items-center gap-2 border-b px-4 py-3">
        <div className="bg-destructive/60 h-3 w-3 rounded-full" />
        <div className="h-3 w-3 rounded-full bg-amber-400/60" />
        <div className="h-3 w-3 rounded-full bg-emerald-400/60" />
        <span className="text-muted-foreground ml-4 text-xs">Shiori Dashboard</span>
      </div>
      <div className="flex">
        <div className="border-border/40 hidden w-48 border-r p-4 sm:block">
          <div className="mb-6 flex items-center gap-2">
            <div className="bg-primary/10 flex h-7 w-7 items-center justify-center rounded-lg">
              <span className="text-primary text-xs font-bold">栞</span>
            </div>
            <span className="text-sm font-medium">Shiori</span>
          </div>
          <div className="space-y-1">
            <div className="bg-primary/10 text-primary flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Tasks
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-xs">
              <FileText className="h-3.5 w-3.5" />
              Notes
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Habits
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <div className="mb-4">
            <p className="text-muted-foreground text-[10px]">Saturday, January 10</p>
            <h3 className="text-sm font-semibold">
              Good morning, <span className="gradient-text">welcome back</span>
            </h3>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: 'Tasks Done', value: '12', suffix: 'today' },
              { label: 'Notes', value: '24', suffix: 'total' },
              { label: 'Best Streak', value: '15', suffix: 'days' },
              { label: 'Focus Time', value: '3.5', suffix: 'hrs' },
            ].map((stat) => (
              <div key={stat.label} className="bg-secondary/40 rounded-xl p-3">
                <p className="text-muted-foreground text-[10px]">{stat.label}</p>
                <p className="text-sm font-semibold">
                  {stat.value} <span className="text-muted-foreground text-[10px] font-normal">{stat.suffix}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="bg-secondary/30 rounded-xl p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-xs font-semibold">Today's Tasks</h4>
              <span className="text-primary text-[10px] font-medium">+ Add Task</span>
            </div>
            <div className="bg-secondary mb-3 h-1 overflow-hidden rounded-full">
              <div className="bg-primary h-full w-1/4 rounded-full" />
            </div>
            <div className="space-y-2">
              {[
                { title: 'Review project proposal', time: '10:00 AM', done: false },
                { title: 'Update weekly notes', time: '2:00 PM', done: false },
                { title: 'Research new frameworks', time: 'Done', done: true },
              ].map((task) => (
                <div key={task.title} className="hover:bg-secondary/50 flex items-center gap-2 rounded-lg p-2">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${task.done ? 'bg-primary/20' : 'border-muted-foreground/30 border'}`}
                  >
                    {task.done && <Check className="text-primary h-2.5 w-2.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-[11px] ${task.done ? 'text-muted-foreground line-through' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-muted-foreground text-[9px]">{task.time}</p>
                  </div>
                  <Flag className="text-muted-foreground/30 h-3 w-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
