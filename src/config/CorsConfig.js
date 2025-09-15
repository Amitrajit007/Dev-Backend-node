const whiteList = ["https://www.youtube.com", "http://localhost:5000"];

export const corsOption = {
  origin: (origin, Callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      // allowed
      Callback(null, true);
    } else {
      // Blocked
      Callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
