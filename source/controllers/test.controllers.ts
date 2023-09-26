import { Request, Response, NextFunction } from  'express';
import axios, { AxiosResponse, AxiosStatic } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
   try{
        let result: AxiosResponse = await axios.get("https://jsonplaceholder.typicode.com/posts");
        let posts: [Post] = result.data;

       res.status(200).json( posts )
   }catch(err){
        res.status(400).json({ error: err });
   }
}

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let id: string = req.params.id;
        let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        let post: [Post] = result.data;
        
        return res.status(200).json({ message: post })
    }catch(err){
        res.status(400).json({ error: err})
    }
}

const updatePost = async(req: Request, res: Response, next: NextFunction) => {
    try{
        let id: String = req.params.id;
        let title: String = req.body.title;
        let body: String = req.body.body;

        let data = {title, body};

        let result: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{ data });
        res.status(200).json({value:result.data, message:"Updated successfully!"})
    }catch(err){    
        res.status(400).json({ error: err, message:"Could not update!"});
    }
}

const addPost = async(req: Request, res: Response, next: NextFunction) => {
    try{
        let title: String = req.body.title;
        let body: String = req.body.body;
        let data = {title, body};
        
        let result: AxiosResponse = await axios.post("https://jsonplaceholder.typicode.com/posts",{
            data
        });
        res.status(200).json({value: result.data, message: "Added Successfully!"});
    }catch(err){
        res.status(400).json({error: err, message:"Could not add post!"});
    }
}

const deletePost = async(req: Request, res: Response, next: NextFunction) => {
    try{
        let id: String = req.params.id;
        let result: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

        res.status(200).json({value: result.data, message: "Delete Successfully!"});    
    }catch(err){
        res.status(400).json({error: err, message:"Not deleted!"});
    }
}

export default { getPosts, getPost, updatePost, addPost, deletePost }; 