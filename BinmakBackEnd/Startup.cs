using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BinmakAPI.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BinmakAPI.Entities;
using Microsoft.EntityFrameworkCore;
using DinkToPdf.Contracts;
using DinkToPdf;
using BinmakBackEnd.Assessblies;
using System.IO;

namespace BinmakBackEnd
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;


        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

            services.AddIdentity<ApplicationUser, IdentityRole>(cfg =>
            {
                cfg.User.RequireUniqueEmail = true;
                cfg.Password.RequireDigit = false;
                cfg.Password.RequiredLength = 5;
                cfg.Password.RequireLowercase = false;
                cfg.Password.RequireNonAlphanumeric = false;
                cfg.Password.RequireUppercase = false;
            }).
            AddEntityFrameworkStores<BinmakDbContext>().
            AddDefaultTokenProviders();

            services.AddAuthentication().
                AddJwtBearer(cfg => {
                    cfg.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                    {
                        ValidateAudience = true,
                        ValidateIssuer = true,
                        ValidIssuer = "http://binmakdev.dedicated.co.za:81",
                        ValidAudience = "http://binmakdev.dedicated.co.za:80",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysupersedkjhulfgyuerfw344cret"))
                    };

                });

            //var connection = @"Server=DPSA32213;Initial Catalog=HundumoDatabase;Trusted_Connection=True;MultipleActiveResultSets=true";
            //var connection = @"Server=tcp:binmakdev.dedicated.co.za;Initial Catalog=HundumoDatabase;User ID=sa;Password=Binmak@2020; MultipleActiveResultSets=true;";
            var connection = @"Server=tcp:binmakdev.dedicated.co.za;Initial Catalog=HundumoBinmakDB;User ID=sa;Password=Binmak@2020; MultipleActiveResultSets=true;";
            //var connection = @"Server=tcp:binmakdev.dedicated.co.za;Initial Catalog=BinmakDb;User ID=sa;Password=Binmak@2020; MultipleActiveResultSets=true;";
            //var connection = @"Server=tcp:binmak.com;Initial Catalog=BinmakDb;User ID=sa;Password=Binmak@2020; MultipleActiveResultSets=true;";
            services.AddDbContext<BinmakDbContext>
             (options => options.UseSqlServer(connection));  //Configuration.GetConnectionString("HundumoDbContext")
                                                   //(options => options.UseSqlServer(connection));

            services.AddDirectoryBrowser();

            services.AddCors(cfg => {

                cfg.AddPolicy(name: "CorsPolicy",
                    builder => builder
                    //.WithOrigins("http://binmakdev.dedicated.co.za:80", "http://localhost:4200")
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader().Build()
                    );
            });

            services.AddCors();
            services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            //services.AddControllers();
            var processSuffix = "32bit";
            if (Environment.Is64BitProcess && IntPtr.Size == 8)
            {
                processSuffix = "64bit";
            }
            var context = new CustomAssemblyLoadContext();
            context.LoadUnmanagedLibrary(Path.Combine(Directory.GetCurrentDirectory(), $"PDFNative\\{processSuffix}\\libwkhtmltox.dll"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
