import express from "express";

const app = express();
const port = 4001;

app.use(express.json());

function validateAssignment(req, res, next) {
  const { title, description, category, email } = req.body;
  if (!title){
    return res.status(400).json({ message: "Title is required" });
  };
  if (!description || description.length < 50 || description.length > 100 ) {
    return res.status(400).json({ message: "Description is required and must be between 500 and 1000 characters" });
  };
  if (!category || !["Math", "English", "Biology"].includes(category)) {
    return res.status(400).json({ message: "Category is required and must be one of Math, English, Biology"});
  };
  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ message: "A valid email is required" });
  };

  next();
}

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.post("/assignments",validateAssignment, (req, res) => {
  // สมมุติว่าตรงนี้มีโค้ดที่เขียน Query เชื่อมต่อกับฐานข้อมูล
  // เพื่อสร้าง Assignment เขียนเอาไว้แล้ว
  return res.status(201).json({ message: "Create assignment successfully" });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});