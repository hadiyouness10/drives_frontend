export default () => {
  var ws = new WebSocket("ws://192.168.90.187:8080");
  ws.onopen = () => {
    ws.send("heyy");
  };
};
