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
        static readonly List<Product> data;
        static ProductsController()
        {
            data = new List<Product>
            {
                new Product {Id = Guid.NewGuid().ToString(), Name = "iPhone 7", Price = 52000},
                new Product {Id = Guid.NewGuid().ToString(), Name = "iPhone 7", Price = 52000}
            };
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return data;
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
            data.Add(product);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Product product = data.FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            data.Remove(product);
            return Ok(product);
        }
    }
}