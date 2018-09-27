using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : Controller
    {
        public ProductsContext db;

        public ProductsController(ProductsContext context)
        {
            this.db = context;
            if (!db.Products.Any())
            {
                db.Products.Add(new Product { Id = Guid.NewGuid().ToString(), Name = "Some name", Price = 20000 });
                db.Products.Add(new Product { Id = Guid.NewGuid().ToString(), Name = "Some name", Price = 20000 });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return db.Products.ToList();
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public IActionResult Post([FromBody]Product product)
        {
            product.Id = Guid.NewGuid().ToString();
            db.Products.Add(product);
            db.SaveChanges();
            return Ok(product);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Product product = db.Products.FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            db.Products.Remove(product);
            db.SaveChanges();
            return Ok(product);
        }
    }
}