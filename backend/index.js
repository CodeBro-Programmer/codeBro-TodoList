let app = require("./app");
require("dotenv").config()
let PORT = process.env.PORT;

let fs = require("fs/promises");

app.post("/storeTask",async (req,res)=>{
    try {
        const data = await fs.readFile("./storage.json", "utf-8");
        const store = JSON.parse(data);
        store.push(req.body);


    await fs.writeFile("./storage.json",JSON.stringify(store,null,2));

    res.status(201).json({
        stat: "saved Sucessfully"
    });

    } catch (error) {
        console.error("saving error",error);
        res.status(500).json({
            stat: error.message
        })
    }
    
});

app.get("/readTask", async (req,res)=>{
    try {
     const items = await fs.readFile("./storage.json", "utf-8");
     let parsedItems = JSON.parse(items);

     res.status(200).json(parsedItems);

    } catch (error) {
        console.log("getting data error",error);
        
    }
     
});

app.put("/completeTask", async (req,res)=>{
    try {
     let {index} = req.body;
     const item = await fs.readFile("./storage.json", "utf-8");
     let parsedItem = JSON.parse(item);

     parsedItem[Number(index)].completed = true;

     await fs.writeFile("./storage.json",JSON.stringify(parsedItem,null,2));
    } catch (error) {
        console.error("editing error",error);
        res.json({
            message: error.message
        })
    }
   });

   app.delete("/deleteTask", async (req,res)=>{
    try {
     let {index} = req.body;
     const allItem = await fs.readFile("./storage.json", "utf-8");
     let parsedAllItem = JSON.parse(allItem);

     parsedAllItem.splice(Number(index),1);

     await fs.writeFile("./storage.json",JSON.stringify(parsedAllItem,null,2));

    } catch (error) {
        console.error("deleting error",error);
        res.json({
            message: error.message
        })
    }
   });


app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT} `)
})