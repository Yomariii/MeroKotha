using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using test.Hubs;
using test.Hubs.Clients;
using test.Models;

public class ChatHub : Hub<IChatClient>
{
    private readonly ChatContext _context;
    private static ConcurrentDictionary<string, string> ConnectedUsers = new ConcurrentDictionary<string, string>();

    public ChatHub(ChatContext context)
    {
        _context = context;
    }

    public async Task JoinChat(string userId)
    {
        // Add the user to the connected users dictionary
        ConnectedUsers[Context.ConnectionId] = userId;

        // Optionally notify all users about the updated user list
        await NotifyUsersUpdated();
    }

    public async Task SendMessage(string receiverId, string message)
    {
        // Get the connection ID of the receiver
        string receiverConnectionId = ConnectedUsers.FirstOrDefault(x => x.Value == receiverId).Key;

        if (receiverConnectionId != null)
        {
            // Send the message to the receiver
            string senderId = ConnectedUsers[Context.ConnectionId];

            // Save the message to the database
            var chatMessage = new ChatMessage
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Message = message,
                Timestamp = DateTime.Now
            };

            await _context.ChatMessages.InsertOneAsync(chatMessage);

            await Clients.Client(receiverConnectionId).ReceiveMessage(senderId, receiverId, message);
        }
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        // Remove the user from the connected users dictionary
        if (ConnectedUsers.TryRemove(Context.ConnectionId, out string userId))
        {
            // Notify other users that the user has left
            await NotifyUsersUpdated();
        }

        await base.OnDisconnectedAsync(exception);
    }

    private async Task NotifyUsersUpdated()
    {
        var users = ConnectedUsers.Values.ToArray();
        await Clients.All.ReceiveUsersInRoom(users);
    }
}