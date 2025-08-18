<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WhyChooseUs;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class WhyChooseUsController extends Controller
{
    /**
     * Display a listing of why choose us items.
     */
    public function index(): JsonResponse
    {
        $items = WhyChooseUs::ordered()->get();
        return response()->json($items);
    }

    /**
     * Get active why choose us items for frontend.
     */
    public function getActive(): JsonResponse
    {
        $items = WhyChooseUs::active()->ordered()->get();
        return response()->json($items);
    }

    /**
     * Store a newly created why choose us item.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'icon_type' => 'required|in:class,image',
            'icon_color' => 'nullable|string|max:7',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'icon_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:1024',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle icon image upload
        if ($request->hasFile('icon_image')) {
            $iconImage = $request->file('icon_image');
            $iconName = time() . '_' . $iconImage->getClientOriginalName();
            $iconImage->move(public_path('Frontend/icons'), $iconName);
            $data['icon'] = 'Frontend/icons/' . $iconName;
            $data['icon_type'] = 'image';
        }

        unset($data['icon_image']);

        // Handle boolean conversion
        $data['is_active'] = $request->input('is_active') === '1' || $request->input('is_active') === true;

        // Set default order if not provided
        if (!isset($data['order']) || $data['order'] === '') {
            $maxOrder = WhyChooseUs::max('order') ?? 0;
            $data['order'] = $maxOrder + 1;
        }

        // Set default icon color
        if (empty($data['icon_color'])) {
            $data['icon_color'] = '#c41c13';
        }

        $item = WhyChooseUs::create($data);

        return response()->json([
            'message' => 'Why Choose Us item created successfully',
            'item' => $item
        ], 201);
    }

    /**
     * Display the specified why choose us item.
     */
    public function show(WhyChooseUs $whyChooseUs): JsonResponse
    {
        return response()->json($whyChooseUs);
    }

    /**
     * Update the specified why choose us item.
     */
    public function update(Request $request, WhyChooseUs $whyChooseUs): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'icon_type' => 'required|in:class,image',
            'icon_color' => 'nullable|string|max:7',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'icon_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:1024',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle icon image upload
        if ($request->hasFile('icon_image')) {
            // Delete old icon image if it exists
            if ($whyChooseUs->icon_type === 'image' && $whyChooseUs->icon && file_exists(public_path($whyChooseUs->icon))) {
                unlink(public_path($whyChooseUs->icon));
            }

            $iconImage = $request->file('icon_image');
            $iconName = time() . '_' . $iconImage->getClientOriginalName();
            $iconImage->move(public_path('Frontend/icons'), $iconName);
            $data['icon'] = 'Frontend/icons/' . $iconName;
            $data['icon_type'] = 'image';
        }

        unset($data['icon_image']);

        // Handle boolean conversion
        $data['is_active'] = $request->input('is_active') === '1' || $request->input('is_active') === true;

        // Set default icon color
        if (empty($data['icon_color'])) {
            $data['icon_color'] = '#c41c13';
        }

        $whyChooseUs->update($data);

        return response()->json([
            'message' => 'Why Choose Us item updated successfully',
            'item' => $whyChooseUs
        ]);
    }

    /**
     * Remove the specified why choose us item.
     */
    public function destroy(WhyChooseUs $whyChooseUs): JsonResponse
    {
        // Delete associated icon image if it exists
        if ($whyChooseUs->icon_type === 'image' && $whyChooseUs->icon && file_exists(public_path($whyChooseUs->icon))) {
            unlink(public_path($whyChooseUs->icon));
        }

        $whyChooseUs->delete();

        return response()->json([
            'message' => 'Why Choose Us item deleted successfully'
        ]);
    }

    /**
     * Update the order of why choose us items.
     */
    public function updateOrder(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array',
            'items.*.id' => 'required|exists:why_choose_us,id',
            'items.*.order' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->items as $item) {
            WhyChooseUs::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json([
            'message' => 'Order updated successfully'
        ]);
    }
}
