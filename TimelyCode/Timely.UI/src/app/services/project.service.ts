import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = "Project";
  constructor(private http: HttpClient) { }

  public getProjects() : Observable<Project[]>{

    return this.http.get<Project[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createProject(project: Project) : Observable<Project[]>{

    return this.http.post<Project[]>(`${environment.apiUrl}/${this.url}`,project);
  }

  public updateProject(project: Project) : Observable<Project[]>{

    return this.http.put<Project[]>(`${environment.apiUrl}/${this.url}`,project);
  }

  public deleteProject(project: Project) : Observable<Project[]>{

    return this.http.delete<Project[]>(`${environment.apiUrl}/${this.url}/${project.projectId}`);
  }
}
