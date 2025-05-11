import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      data => this.tasks = data,
      error => console.error('Error fetching tasks', error)
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
      error => console.error('Error adding task', error)
    );
  }
}

