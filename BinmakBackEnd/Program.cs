using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace BinmakBackEnd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseSerilog((context, config) => {
                        config.WriteTo.File("wwwroot\\Logs\\log.txt",
                            rollingInterval: RollingInterval.Day,                            
                            restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning);
                    });
                });
    }
}
