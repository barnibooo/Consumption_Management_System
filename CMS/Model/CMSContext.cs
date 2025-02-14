using Microsoft.EntityFrameworkCore;

namespace CMS.Model
{
    public class CMSContext : DbContext
    {

        public CMSContext(DbContextOptions<CMSContext> options) : base(options)
        {

        }
        public DbSet<MenuItem> MenuItems { get; set; } = null!;
        public DbSet<MenuItemOrder> MenuItemOrders { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MenuItem>()
                .HasMany(e => e.Orders)
                .WithMany(e => e.MenuItems)
                .UsingEntity<MenuItemOrder>();
        }





    }
}
