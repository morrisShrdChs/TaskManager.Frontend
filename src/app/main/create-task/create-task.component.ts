import { Component } from '@angular/core';
import { TaskService } from './../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  name: string = '';
  description: string = '';
  startDate: string = '';
  expDate: string = '';
  priority: number = 1;
  statusId: number = 1;
  userId: string = '';

  users: any[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.taskService.getAllUsers().subscribe({
      next: data => {
        console.log('Users loaded', data);
        this.users = data;
      },
      error: err => {
        console.error('Failed to load users', err);
      }
    });
  }

  createTask() {
    const newTask = {
      name: this.name,
      description: this.description,
      startDate: new Date(this.startDate).toISOString(),
      expDate: new Date(this.expDate).toISOString(),
      priority: this.priority,
      statusId: this.statusId,
      userId: this.userId

    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.router.navigate(['/main']);
    });
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.nameid || payload.sub || '';
  }
}


