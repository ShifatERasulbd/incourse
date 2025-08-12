<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Slider;
use App\Models\AboutUs;
use App\Models\Product;
use App\Models\Category;
use App\Models\Blog;
use App\Models\WhyChooseUs;
use App\Models\Counter;

class FrontendController extends Controller
{
    /**
     * Get all frontend data in one request
     */
    public function getAllData(): JsonResponse
    {
        try {
            $data = [
                'sliders' => Slider::active()->ordered()->get(),
                'aboutUs' => AboutUs::getActive(),
                'categories' => Category::active()->ordered()->get(),
                'products' => Product::active()->with('category')->take(8)->get(),
                'blogs' => Blog::published()->take(6)->orderBy('published_date', 'desc')->get(),
                'whyChooseUs' => WhyChooseUs::active()->ordered()->get(),
                'counters' => Counter::active()->ordered()->get(),
            ];

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch frontend data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get homepage data
     */
    public function getHomepageData(): JsonResponse
    {
        try {
            $data = [
                'sliders' => Slider::active()->ordered()->get(),
                'featuredProducts' => Product::active()->featured()->with('category')->take(6)->get(),
                'featuredBlogs' => Blog::published()->featured()->take(3)->orderBy('published_date', 'desc')->get(),
                'aboutUs' => AboutUs::getActive(),
                'whyChooseUs' => WhyChooseUs::active()->ordered()->get(),
                'counters' => Counter::active()->ordered()->get(),
            ];

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch homepage data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get sliders data
     */
    public function getSliders(): JsonResponse
    {
        try {
            $sliders = Slider::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $sliders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch sliders',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get about us data
     */
    public function getAboutUs(): JsonResponse
    {
        try {
            $aboutUs = AboutUs::getActive();

            return response()->json([
                'success' => true,
                'data' => $aboutUs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch about us data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get products data
     */
    public function getProducts(Request $request): JsonResponse
    {
        try {
            $query = Product::active()->with('category');

            // Filter by category if provided
            if ($request->has('category') && $request->category !== 'All') {
                $query->whereHas('category', function($q) use ($request) {
                    $q->where('name', $request->category);
                });
            }

            // Search functionality
            if ($request->has('search') && !empty($request->search)) {
                $query->where(function($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('description', 'like', '%' . $request->search . '%');
                });
            }

            // Pagination
            $perPage = $request->get('per_page', 12);
            $products = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get categories data
     */
    public function getCategories(): JsonResponse
    {
        try {
            $categories = Category::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $categories
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get blogs data
     */
    public function getBlogs(Request $request): JsonResponse
    {
        try {
            $query = Blog::published();

            // Filter by featured if requested
            if ($request->has('featured') && $request->featured === 'true') {
                $query->featured();
            }

            // Search functionality
            if ($request->has('search') && !empty($request->search)) {
                $query->where(function($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->search . '%')
                      ->orWhere('excerpt', 'like', '%' . $request->search . '%');
                });
            }

            // Limit results
            if ($request->has('limit')) {
                $query->limit($request->limit);
            }

            $blogs = $query->orderBy('published_date', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $blogs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch blogs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get why choose us data
     */
    public function getWhyChooseUs(): JsonResponse
    {
        try {
            $items = WhyChooseUs::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $items
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch why choose us items',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get counters data
     */
    public function getCounters(): JsonResponse
    {
        try {
            $counters = Counter::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $counters
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch counters',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single blog details
     */
    public function getBlogDetails($id): JsonResponse
    {
        try {
            // First, let's try to find the blog regardless of published status for debugging
            $blog = Blog::find($id);

            if (!$blog) {
                return response()->json([
                    'success' => false,
                    'message' => 'Blog not found',
                    'error' => "No blog found with ID: {$id}"
                ], 404);
            }

            // Check if blog is published
            if (!$blog->is_published) {
                return response()->json([
                    'success' => false,
                    'message' => 'Blog not published',
                    'error' => "Blog with ID {$id} exists but is not published. Published status: " . ($blog->is_published ? 'true' : 'false')
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $blog
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching blog',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Debug endpoint to check all blogs
     */
    public function debugBlogs(): JsonResponse
    {
        try {
            $allBlogs = Blog::select('id', 'title', 'is_published', 'created_at')->get();
            $publishedBlogs = Blog::published()->select('id', 'title', 'is_published', 'created_at')->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_blogs' => $allBlogs->count(),
                    'published_blogs' => $publishedBlogs->count(),
                    'all_blogs' => $allBlogs,
                    'published_blogs_list' => $publishedBlogs
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching debug info',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
