const mongoose=require("mongoose")
const express= require ("express")
const cors= require("cors")
const app= express()
const Project=require("./models/projectModel")

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/Project",{
useNewUrlParser:true , useUnifiedTopology:true
})
.then(()=>console.log("mongoDB Connected"))
.catch((err)=>console.log(err))

//=====================================create===================================
app.post("/api/projects", async (req, res) => {
    try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).json(project);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get a single project by ID
  app.get("/api/projects/:id", getProject, (req, res) => {
    res.json(res.project);
  });
  
  // Update a project by ID
  app.patch("/api/projects/:id", getProject, async (req, res) => {
    try {
      Object.assign(res.project, req.body);
      await res.project.save();
      res.json(res.project);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a project by ID
  app.delete("/api/projects/:id", getProject, async (req, res) => {
    try {
      await Project.deleteOne({ _id: req.params.id });
      res.json({ message: "Project deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getProject(req, res, next) {
    try {
      const project = await Project.findById(req.params.id);
      if (project == null) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.project = project;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  
app.listen(5000, ()=>console.log(`Server is running on port${5000}`))