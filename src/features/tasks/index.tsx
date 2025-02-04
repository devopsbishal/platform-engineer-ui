import { ProfileDropdown } from '@/components/ProfileDropdown'
import { Search } from '@/components/Search'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Header } from '@/components/layout/Header'
import { Main } from '@/components/layout/Main'
import { columns } from './components/Columns'
import { DataTable } from './components/DataTable'
import { TasksDialogs } from './components/TasksDialogs'
import { TasksPrimaryButtons } from './components/TasksPrimaryButtons'
import TasksProvider from './context/TasksContext'
import { tasks } from './data/tasks'

export default function Tasks() {
  return (
    <TasksProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}
