export default (userId, queryClient) => {
  var ws = new WebSocket("ws://192.168.90.187:8080");
  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "IDENTIFICATION", content: userId }));
  };
  ws.onmessage = (data) => {
    const json = JSON.parse(data.data);
    if (json.type === "UPDATE_STOP_REQUESTS_DRIVER")
      queryClient.refetchQueries([
        "stopRequests",
        { studentId: userId, isDriver: true },
      ]);
    else if (json.type === "UPDATE_STOP_REQUESTS")
      queryClient.refetchQueries(["stopRequests", { studentId: userId }]);
    else if (json.type === "UPDATE_CHATS") {
      queryClient.refetchQueries("chatQuery");
      queryClient.refetchQueries(["chatsQuery", userId, true]);
    }
  };
};
