<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $sliders = Slider::ordered()->get();
        return response()->json($sliders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
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

        // Remove image from data as we've processed it
        unset($data['image']);

        // Handle boolean conversion
        $data['is_active'] = $request->input('is_active') === '1' || $request->input('is_active') === true;

        // Set default order if not provided
        if (!isset($data['order']) || $data['order'] === '') {
            $maxOrder = Slider::max('order') ?? 0;
            $data['order'] = $maxOrder + 1;
        }

        $slider = Slider::create($data);

        return response()->json([
            'message' => 'Slider created successfully',
            'slider' => $slider
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Slider $slider): JsonResponse
    {
        return response()->json($slider);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Slider $slider): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
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
            // Delete old image if it exists
            if ($slider->image_path && file_exists(public_path($slider->image_path))) {
                unlink(public_path($slider->image_path));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('Frontend/slider'), $imageName);
            $data['image_path'] = 'Frontend/slider/' . $imageName;
        }

        // Remove image from data as we've processed it
        unset($data['image']);

        // Handle boolean conversion
        $data['is_active'] = $request->input('is_active') === '1' || $request->input('is_active') === true;

        $slider->update($data);

        return response()->json([
            'message' => 'Slider updated successfully',
            'slider' => $slider->fresh()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slider $slider): JsonResponse
    {
        // Delete associated image
        if ($slider->image_path && file_exists(public_path($slider->image_path))) {
            unlink(public_path($slider->image_path));
        }

        $slider->delete();

        return response()->json([
            'message' => 'Slider deleted successfully'
        ]);
    }

    /**
     * Get active sliders for frontend display
     */
    public function active(): JsonResponse
    {
        $sliders = Slider::active()->ordered()->get();
        return response()->json($sliders);
    }

    /**
     * Update slider order
     */
    public function updateOrder(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'sliders' => 'required|array',
            'sliders.*.id' => 'required|exists:sliders,id',
            'sliders.*.order' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->sliders as $sliderData) {
            Slider::where('id', $sliderData['id'])->update(['order' => $sliderData['order']]);
        }

        return response()->json([
            'message' => 'Slider order updated successfully'
        ]);
    }
}
