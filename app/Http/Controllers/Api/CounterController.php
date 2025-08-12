<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Counter;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class CounterController extends Controller
{
    /**
     * Display a listing of counters.
     */
    public function index(): JsonResponse
    {
        $counters = Counter::ordered()->get();
        return response()->json($counters);
    }

    /**
     * Get active counters for frontend.
     */
    public function getActive(): JsonResponse
    {
        $counters = Counter::active()->ordered()->get();
        return response()->json($counters);
    }

    /**
     * Store a newly created counter.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'label' => 'required|string|max:255',
            'value' => 'required|integer|min:0',
            'suffix' => 'nullable|string|max:50',
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
            $maxOrder = Counter::max('order') ?? 0;
            $data['order'] = $maxOrder + 1;
        }

        // Set default icon color
        if (empty($data['icon_color'])) {
            $data['icon_color'] = '#272863';
        }

        $counter = Counter::create($data);

        return response()->json([
            'message' => 'Counter created successfully',
            'counter' => $counter
        ], 201);
    }

    /**
     * Display the specified counter.
     */
    public function show(Counter $counter): JsonResponse
    {
        return response()->json($counter);
    }

    /**
     * Update the specified counter.
     */
    public function update(Request $request, Counter $counter): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'label' => 'required|string|max:255',
            'value' => 'required|integer|min:0',
            'suffix' => 'nullable|string|max:50',
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
            if ($counter->icon_type === 'image' && $counter->icon && file_exists(public_path($counter->icon))) {
                unlink(public_path($counter->icon));
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
            $data['icon_color'] = '#272863';
        }

        $counter->update($data);

        return response()->json([
            'message' => 'Counter updated successfully',
            'counter' => $counter
        ]);
    }

    /**
     * Remove the specified counter.
     */
    public function destroy(Counter $counter): JsonResponse
    {
        // Delete associated icon image if it exists
        if ($counter->icon_type === 'image' && $counter->icon && file_exists(public_path($counter->icon))) {
            unlink(public_path($counter->icon));
        }

        $counter->delete();

        return response()->json([
            'message' => 'Counter deleted successfully'
        ]);
    }

    /**
     * Update the order of counters.
     */
    public function updateOrder(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'counters' => 'required|array',
            'counters.*.id' => 'required|exists:counters,id',
            'counters.*.order' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->counters as $counter) {
            Counter::where('id', $counter['id'])->update(['order' => $counter['order']]);
        }

        return response()->json([
            'message' => 'Order updated successfully'
        ]);
    }
}
