import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { Project } from './models/project';
import { ProjectService } from './services/project.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Timely.UI';
  projects: Project[] = [];
  projectToStart?: Project;
  dateTime: Date;
  counting:Boolean = false;
  startDate:Date;
  fullDurationString: string[] = [];
  fileName= 'ExcelSheet.xlsx';

  constructor(private projectService: ProjectService) {
    this.dateTime = new Date();
    this.startDate = new Date();
  }

  ngOnInit() : void{
    this.projectService.getProjects().subscribe((result: Project[]) => {
      this.projects = result;
    },error => console.log(error));
  }

  updateProjectList(projects: Project[]){
    this.projects = projects;
  }

  initNewProject(){
    timer(0,1000).subscribe(() => {
      this.dateTime = new Date()
    })
    this.startDate = new Date();
    this.counting = true;
  }

  stopCounter(){
    this.projectToStart = new Project();
    this.projectToStart.projectStop = this.dateTime;
    this.projectToStart.projectStart = this.startDate;
    this.fullDurationString = this.SubtractDates(this.projectToStart.projectStart, this.projectToStart.projectStop).split(".");
    this.projectToStart.projectDuration = this.fullDurationString[0];
    this.counting = false;
    console.log(this.fullDurationString);
  }

  public SubtractDates(startDate: Date, endDate: Date): string {
    let dateDiff = (endDate.getTime() - startDate.getTime()) / 1000;

    var h = Math.floor(dateDiff / 3600);
    var m = Math.floor((dateDiff % 3600) / 60);
    var s = Math.floor((dateDiff % 3600) % 60);
    var ms = dateDiff
      .toString()
      .substring(dateDiff.toString().indexOf('.') + 1);

    var hDisplay = h > 0 ? h.toString().padStart(2, '0') + ':' : '00:';
    var mDisplay = m > 0 ? m.toString().padStart(2, '0') + ':' : '00:';
    var sDisplay = s > 0 ? s.toString().padStart(2, '0') + '.' : '00.';
    var msDisplay = ms;

    let dateString = hDisplay + mDisplay + sDisplay + msDisplay;
    return dateString;
  }

  editProject(project: Project){
    this.projectToStart = project;
  }

  exportExcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }


}
