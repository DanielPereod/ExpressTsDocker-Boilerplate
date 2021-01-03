import App from "./app";
const PORT = process.env.SERVER_PORT;

App.app.listen(PORT, () => {
  console.log(` Server listening on port: http://localhost:${PORT}`);
});
