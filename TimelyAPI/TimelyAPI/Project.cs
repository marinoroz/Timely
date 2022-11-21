namespace TimelyAPI
{
    public class Project
    {
        public int ProjectId { get; set; } 
        public string ProjectName { get; set; } = string.Empty;
        public DateTime ProjectStart { get; set; }
        public DateTime? ProjectStop { get; set; }
        public TimeSpan? ProjectDuration { get; set; }
    }
}
