export const FILTERS = {
    ALL: 'all',
    COMPLETED: 'completed',
    PENDING: 'pending'
  }
  
  export const filterTasks = (tasks, filter) => {
    switch (filter) {
      case FILTERS.COMPLETED:
        return tasks.filter(task => task.completed)
      case FILTERS.PENDING:
        return tasks.filter(task => !task.completed)
      case FILTERS.ALL:
      default:
        return tasks
    }
  }
  
  export const searchTasks = (tasks, searchQuery) => {
    if (searchQuery.length > 3) {
      return tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return tasks
  }