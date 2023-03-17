<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(){
        $posts = Post::all();

        return response()->json([
            'posts'=>$posts,
        ]);

    }
    public function store(Request $request){
        $request->validate([
            'title'=>'required','min:5','max:50',
            'body'=>'required','min:20'
        ]);

        $post=Post::create($request->all());
        return response()->json([
            'post'=>$post,
            'success'=>'the post added with success'
        ]);
    }
}
