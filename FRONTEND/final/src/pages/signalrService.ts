import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:7154/chat") // Update this URL as per your backend URL
    .withAutomaticReconnect()
    .build();

export default connection;
