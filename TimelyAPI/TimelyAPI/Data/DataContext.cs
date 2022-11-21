using Microsoft.EntityFrameworkCore;

namespace TimelyAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Project> Projects => Set<Project>();

    }
}
