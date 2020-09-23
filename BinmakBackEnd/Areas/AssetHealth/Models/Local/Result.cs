namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    public class Result<T>
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public T Data { get; set; }

        public Result() { }

        public Result(string message) => Message = message;

        public Result(bool success, string message) : this(message) => Success = success;

        public Result(bool success, string message, T data) : this(success, message) => Data = data;

        public static Result<T> FromFailureObject(T obj) => new Result<T>(false, "", obj);

        public static Result<T> FromSuccessObject(T obj) => new Result<T>(true, "", obj);

    }
}
