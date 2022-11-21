import { Output, EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit{
  @Input() project?: Project;
  @Output() projectsUpdated = new EventEmitter<Project[]>();

  constructor(private projectService: ProjectService){}
  
  ngOnInit(): void {
    
  }

  createProject(project:Project) {
    this.projectService.createProject(project).subscribe((projects: Project[]) => this.projectsUpdated.emit(projects));
  }

  updateProject(project:Project){
    this.projectService.updateProject(project).subscribe((projects: Project[]) => this.projectsUpdated.emit(projects));
  }

  deleteProject(project:Project){
    this.projectService.deleteProject(project).subscribe((projects: Project[]) => this.projectsUpdated.emit(projects));
  }

}
