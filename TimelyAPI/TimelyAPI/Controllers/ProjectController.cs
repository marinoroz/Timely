using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimelyAPI.Data;

namespace TimelyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly DataContext _context;

        public ProjectController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Project>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<List<Project>>> CreateProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync(); //save changes to db

            return Ok(await _context.Projects.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Project>>> UpdateProject(Project project)
        {
            var dbProject = await _context.Projects.FindAsync(project.ProjectId);
            if (dbProject == null)
            {
                return BadRequest("Project not found!");
            }
            dbProject.ProjectName = project.ProjectName;
            dbProject.ProjectStart = project.ProjectStart;
            dbProject.ProjectStop = project.ProjectStop;
            dbProject.ProjectDuration = project.ProjectDuration;

            await _context.SaveChangesAsync();
            return Ok(await _context.Projects.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Project>>> DeleteProject(int id)
        {
            var dbProject = await _context.Projects.FindAsync(id);
            if (dbProject == null)
            {
                return BadRequest("Project not found!");
            }
            _context.Projects.Remove(dbProject);
            await _context.SaveChangesAsync();

            return Ok(await _context.Projects.ToListAsync());
        }

    }
}
