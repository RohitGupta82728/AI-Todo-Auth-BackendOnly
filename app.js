const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoute');
const {errorMiddleware} = require('./middlewares/error');
const cors = require('cors');


config({
   path:'.env',
});


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credential:true,
    
}));


app.use("/api/v1/users",userRoutes);
app.use("/api/v1/task",taskRoutes);

app.use(errorMiddleware);



app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})