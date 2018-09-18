using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ProductsContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public ProductsContext(DbContextOptions<ProductsContext> options)
        {
            Database.EnsureCreated();
        }
    }
}
