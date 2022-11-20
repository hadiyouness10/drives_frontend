export default (
  userId,
  refetchStopRequestsDriver,
  refetchStopRequestsRider
) => {
  var ws = new WebSocket("ws://192.168.90.187:8080");
  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "IDENTIFICATION", content: userId }));
  };
  ws.onmessage = (data) => {
    const json = JSON.parse(data.data);
    if (json.type === "UPDATE_STOP_REQUESTS_DRIVER") {
      refetchStopRequestsDriver();
    } else if (json.type === "UPDATE_STOP_REQUESTS") {
      refetchStopRequestsRider();
    }
  };
};
