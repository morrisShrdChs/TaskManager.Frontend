import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5135/api/task';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials: true });
  }

  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task, {
      withCredentials: true
    });
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5135/api/user/users', {
      withCredentials: true
    });
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task, {
      withCredentials: true
    });
  }

}
