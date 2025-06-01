import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      data => {
        console.log('Полученные задачи:', data);
        this.tasks = data;
      },
      error => {
        console.error('Ошибка при загрузке задач', error);
      }
    );
  }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      return;
    }

    const task = { title: this.newTaskTitle };

    this.taskService.addTask(task).subscribe(
      () => {
        this.newTaskTitle = '';
        this.loadTasks();
      },
      error => console.error('Ошибка при добавлении задачи', error)
    );
  }

  goToTask(id: number) {
    this.router.navigate(['/task', id]);
  }


  goToCreateTask() {
    this.router.navigate(['/main/create-task']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 1: return 'Низкий';
      case 2: return 'Средний';
      case 3: return 'Высокий';
      default: return 'Неизвестно';
    }
  }

  getStatusLabel(statusId: number): string {
    switch (statusId) {
      case 1: return 'В ожидании';
      case 2: return 'В процессе';
      case 3: return 'Завершена';
      default: return 'Неизвестно';
    }
  }

  getStatusClass(statusId: number): string {
    switch (statusId) {
      case 0: return 'text-danger';
      case 1: return 'text-warning';
      case 2: return 'text-success';
      default: return 'text-muted';
    }
  }
}
