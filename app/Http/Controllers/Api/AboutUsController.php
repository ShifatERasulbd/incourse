<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AboutUsController extends Controller
{
    /**
     * Display the about us content.
     */
    public function index(): JsonResponse
    {
        $aboutUs = AboutUs::first();
        return response()->json($aboutUs);
    }

    /**
     * Get active about us content for frontend.
     */
    public function getActive(): JsonResponse
    {
        $aboutUs = AboutUs::getActive();
        return response()->json($aboutUs);
    }

    /**
     * Store or update about us content.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'main_text' => 'required|string',
            'section_title' => 'required|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'show_banner' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle banner image upload
        if ($request->hasFile('banner_image')) {
            $bannerImage = $request->file('banner_image');
            $bannerName = 'banner_' . time() . '_' . $bannerImage->getClientOriginalName();
            $bannerImage->move(public_path('Frontend/about'), $bannerName);
            $data['banner_image_path'] = 'Frontend/about/' . $bannerName;
        }

        // Handle main image upload
        if ($request->hasFile('main_image')) {
            $mainImage = $request->file('main_image');
            $mainName = 'main_' . time() . '_' . $mainImage->getClientOriginalName();
            $mainImage->move(public_path('Frontend/about'), $mainName);
            $data['main_image_path'] = 'Frontend/about/' . $mainName;
        }

        // Remove image files from data as we've processed them
        unset($data['banner_image'], $data['main_image']);

        // Handle boolean conversion
        $data['show_banner'] = $request->input('show_banner') === '1' || $request->input('show_banner') === true;
        $data['is_active'] = $request->input('is_active') === '1' || $request->input('is_active') === true;

        // Check if record exists
        $aboutUs = AboutUs::first();

        if ($aboutUs) {
            // Delete old images if new ones are uploaded
            if (isset($data['banner_image_path']) && $aboutUs->banner_image_path && file_exists(public_path($aboutUs->banner_image_path))) {
                unlink(public_path($aboutUs->banner_image_path));
            }
            if (isset($data['main_image_path']) && $aboutUs->main_image_path && file_exists(public_path($aboutUs->main_image_path))) {
                unlink(public_path($aboutUs->main_image_path));
            }

            $aboutUs->update($data);
            $message = 'About Us content updated successfully';
        } else {
            $aboutUs = AboutUs::create($data);
            $message = 'About Us content created successfully';
        }

        return response()->json([
            'message' => $message,
            'aboutUs' => $aboutUs
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AboutUs $aboutUs): JsonResponse
    {
        return response()->json($aboutUs);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AboutUs $aboutUs): JsonResponse
    {
        return $this->store($request); // Use same logic as store
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AboutUs $aboutUs): JsonResponse
    {
        // Delete associated images
        if ($aboutUs->banner_image_path && file_exists(public_path($aboutUs->banner_image_path))) {
            unlink(public_path($aboutUs->banner_image_path));
        }
        if ($aboutUs->main_image_path && file_exists(public_path($aboutUs->main_image_path))) {
            unlink(public_path($aboutUs->main_image_path));
        }

        $aboutUs->delete();

        return response()->json([
            'message' => 'About Us content deleted successfully'
        ]);
    }
}
