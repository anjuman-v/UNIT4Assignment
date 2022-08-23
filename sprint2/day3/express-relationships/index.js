const express = require("express")
const mongoose = require("mongoose")
app.use(express.json())
const connect =() =>{
    return mongoose.connect("mongodb+srv://anjumam:anjuman1999@cluster0.jo06w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
};

// AUTHOR SCHEMA AND MODEL
const authorSchema = new mangoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true},
    age :{type:Number,required:false}
},{
 versionKey:false,
 timestamps:true
})

const Author = mongoose.model("author",authorSchema)



// BOOK SHCEMA AND MODEL
const bookSchema = new mongoose.Schema({
    bookname: { type: String, required: true },
    body: { type: String, required: true},
    sectionId:{ type:mongoose.Schema.Types.ObjectId,ref:"section" }
    }, {
        versionKey: false,
        timestamps: true,
    
    });

    const Book = mongoose.model("book",bookSchema);

    
    
    // SECTION SCHEMA AND MODEL
    
    const sectionSchema = new mongoose.Schema({
        sectionName:{ type: String, require:true},
    },{
        versionKey:false,
        timestamps:true
    })
    const Section = mongoose.model("section",sectionSchema)

    const app = express();

    app.use(express.json());



   //CRUD SECTION
   app.post("/section", async(req, res)=>{

    try {

        const section = await Section.create(req.body)

        return res.status(201).send(section);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }


})

app.get("/section", async(req,res)=>{


    try {

        const sections = await Section.find().lean().exec();

        return res.status(200).send(sections);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})



   //CRUD AUTHOR
   app.post("/author",async(req,res)=>{
       try{
           const author = await Author.create(req.body);
           return res.status(201).send(author);

       }
       catch(err){
       return res.status(500).send(err.massage);
       }
   })


   app.get("/author", async(req, res)=>{

    try {
        const authors = await Author.find().lean().exec();

        return res.status(200).send(authors);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})


//CRUD BOOK
app.post("/book", async(req, res)=>{

    try {

        const book = await Book.create(req.body);

        return res.status(200).send(book);
        
    } catch (e) {
        return res.status(500).res(e.message);
    }
})

app.get("/book", async(req, res)=>{


    try {

        const books = await Book.find().populate({path:"authorIds", select:{firstName:1, lastName:1}}).populate({path:"sectionId", select:{sectionName:1}}).lean().exec();

        return res.status(200).send(books);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

app.delete("/book/:id", async(req, res)=>{

    try {

        const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

        return res.send(200).send(book);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

app.patch("/book/:id", async(req, res)=>{
  try {      
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        return res.status(200).send(book);

    } catch (e) {
        return res.status(500).send(e.message);
    }
})

//FINF BOOK THAT ARE CHECHKEDUOT

app.get("/checkOutBooks", async(req, res)=>{


    try {
        
        const checkOutBooks = await Book.find({checked: { $eq:true}}).lean().populate({path:"authorIds", select:{firstName:1, lastName:1, _id:0}}).populate({path:"sectionId", select:{sectionName:1, _id:0}}).exec()


        return res.status(200).send(checkOutBooks)
    } catch (e) {
        return res.status(500).send(e.message);
    }

})


//FIND ALL BOOK


app.get("/allBooksOfAnAuthor/:id", async(req, res)=>{

    try {
        
        const allBooksOfAnAuthor = await Book.find({authorIds: { $eq: req.params.id}}).populate({path:"authorIds", select:{firstName:1, lastName:1} }).populate({path:"sectionId", select:{sectionName:1}}).lean().exec();

        return res.status(200).send(allBooksOfAnAuthor);

    } catch (e) {
        return res.status(500).send(e.message);
    }

})
//FIND IN BOOK SENCTION

app.get("/books/:id", async(req, res)=>{

    try {

            const books = await Book.find({sectionId: { $eq: req.params.id}}).lean().exec();

            return res.status(200).send(books);
        
        
    } catch (e) {
        return res.status(500).send(e.message);
    }


})


//find books in a section that are not checked out
 app.get("/notCheckoutBooks", async(req, res)=>{
    try {
        
        const presentBooks = await Book.find({checked: { $eq: false}}).lean().exec();

        return res.status(200).send(presentBooks);
    } catch (e) {
        return res.status(500).send(e.message);
    }


})



//find books of 1 author inside a section


app.get("/booksOfAnAuthor/:id1/:id2", async(req, res)=>{

    try {
        
        const books = await Book.find({ $and: [{ sectionId: { $eq: req.params.id1}}, { authorIds: { $eq: req.params.id2}} ]}).lean().exec();


        return res.status(200).send(books);


    } catch (e) {
        return res.status(500).send(e.message);
    }

})

app.listen(2345, async()=>{


    try {

        await connect();

        console.log("listening on port 2345");
        
    } catch (error) {
        console.log(error.message);
    }

})

