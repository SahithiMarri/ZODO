import { Trash2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  _id: string;
  title: string;
  deadline: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      {incompleteTasks.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span>📝</span> To Do ({incompleteTasks.length})
          </h3>
          <AnimatePresence>
            {incompleteTasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white/50 backdrop-blur-lg rounded-2xl p-4 mb-3 border-2 border-purple-200 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Button
                      onClick={() => onComplete(task._id)}
                      variant="ghost"
                      size="icon"
                      className="text-purple-500 hover:text-green-500 hover:bg-green-100 rounded-full cursor-pointer"
                    >
                      <Circle className="h-6 w-6" />
                    </Button>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">{task.title}</p>
                      <p className="text-sm text-purple-600">📅 {formatDate(task.deadline)}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onDelete(task._id)}
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full cursor-pointer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-green-600 mb-3 flex items-center gap-2">
            <span>✅</span> Completed ({completedTasks.length})
          </h3>
          <AnimatePresence>
            {completedTasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-green-50/50 backdrop-blur-lg rounded-2xl p-4 mb-3 border-2 border-green-200 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-600 line-through">
                        {task.title}
                      </p>
                      <p className="text-sm text-green-600">📅 {formatDate(task.deadline)}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onDelete(task._id)}
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full cursor-pointer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-2xl text-purple-400">🎯</p>
          <p className="text-lg text-purple-600 mt-2">No tasks yet! Add one above.</p>
        </motion.div>
      )}
    </div>
  );
}
