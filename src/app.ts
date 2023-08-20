import express from "express";

const app = express();

app.get("/ping", (_req: any, res: { send: (arg0: string) => any }) =>
  res.send(`pong`)
);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
