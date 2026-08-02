

export function formatTask(task) {
  return task.trim();
}

export function isTaskValid(task) {
  return task.trim().length > 0;
}
