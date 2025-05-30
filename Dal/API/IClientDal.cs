using Dal.models;

public interface IClientDal
{
    Client GetClientByEmail(string email);
    Client ClientExist(string clientId); // אולי לשנות ל־GetById?
}
