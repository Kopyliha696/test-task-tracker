import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { TaskComponent } from './pages/task/task.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'task/:id',
    component: TaskComponent,
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
