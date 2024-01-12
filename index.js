import express from "express";

const portNum = 3000;

const blogs = [];

const app = express();

function createBlog(title, body) {
  try {
    if (title && body) {
      const blog = {
        title: title,
        body: body,
      };
      blogs.push(blog);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// logger middleware
app.use((req, res, next) => {
  console.log(
    ` > client made a "${req.method}" request on '${req.originalUrl}"`
  );
  next();
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/blogs", (req, res) => {
  res.render("blogs.ejs", { blogs: blogs });
});
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  createBlog(req.body.blogtitle, req.body.blogbody);

  res.redirect("/blogs");
});

app.listen(portNum, (error) => {
  if (error) throw error;
  else
    console.log(
      `\n # server online and listening on http://localhost:${portNum}`
    );
});
