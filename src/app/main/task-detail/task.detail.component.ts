import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-details',
  templateUrl: './task.detail.component.html',
  styleUrls: ['./task.detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTaskById(+id).subscribe(data => {
        this.task = data;
      });
    }
  }
  saveChanges() {
    this.taskService.updateTask(this.task.id, this.task).subscribe({
      next: () => {
        alert('Задача успешно обновлена');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Ошибка при обновлении задачи', err);
        alert('Не удалось обновить задачу');
      }
    });
  }

}
