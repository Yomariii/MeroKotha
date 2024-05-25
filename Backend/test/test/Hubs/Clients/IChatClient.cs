namespace test.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(string sender, string receiver, string message);
        Task ReceiveUsersInRoom(string[] users); // You might want to rename this to be more appropriate for direct messaging
    }
}
