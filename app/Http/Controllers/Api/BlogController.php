<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    /**
     * Display a listing of blogs.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Blog::query();

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%');
        }

        if ($request->has('featured') && $request->featured === 'true') {
            $query->featured();
        }

        $blogs = $query->orderBy('published_date', 'desc')->get();
        return response()->json($blogs);
    }

    /**
     * Get published blogs for frontend.
     */
    public function getPublished(Request $request): JsonResponse
    {
        $query = Blog::published();

        if ($request->has('limit')) {
            $query->limit($request->limit);
        }

        $blogs = $query->orderBy('published_date', 'desc')->get();
        return response()->json($blogs);
    }

    /**
     * Store a newly created blog.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'published_date' => 'required|date',
            'author' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'is_featured' => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('Frontend/slider'), $imageName);
            $data['image_path'] = 'Frontend/slider/' . $imageName;
        }

        unset($data['image']);

        // Handle boolean conversion
        $data['is_featured'] = $request->input('is_featured') === '1' || $request->input('is_featured') === true;
        $data['is_published'] = $request->input('is_published') === '1' || $request->input('is_published') === true;

        // Set default author if not provided
        if (empty($data['author'])) {
            $data['author'] = 'Admin';
        }

        $blog = Blog::create($data);

        return response()->json([
            'message' => 'Blog created successfully',
            'blog' => $blog
        ], 201);
    }

    /**
     * Display the specified blog.
     */
    public function show(Blog $blog): JsonResponse
    {
        return response()->json($blog);
    }

    /**
     * Update the specified blog.
     */
    public function update(Request $request, Blog $blog): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'published_date' => 'required|date',
            'author' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'is_featured' => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($blog->image_path && file_exists(public_path($blog->image_path))) {
                unlink(public_path($blog->image_path));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('Frontend/slider'), $imageName);
            $data['image_path'] = 'Frontend/slider/' . $imageName;
        }

        unset($data['image']);

        // Handle boolean conversion
        $data['is_featured'] = $request->input('is_featured') === '1' || $request->input('is_featured') === true;
        $data['is_published'] = $request->input('is_published') === '1' || $request->input('is_published') === true;

        // Set default author if not provided
        if (empty($data['author'])) {
            $data['author'] = 'Admin';
        }

        $blog->update($data);

        return response()->json([
            'message' => 'Blog updated successfully',
            'blog' => $blog
        ]);
    }

    /**
     * Remove the specified blog.
     */
    public function destroy(Blog $blog): JsonResponse
    {
        // Delete associated image
        if ($blog->image_path && file_exists(public_path($blog->image_path))) {
            unlink(public_path($blog->image_path));
        }

        $blog->delete();

        return response()->json([
            'message' => 'Blog deleted successfully'
        ]);
    }
}
