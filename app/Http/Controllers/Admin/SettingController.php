<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = Setting::orderBy('group')->orderBy('sort_order')->get();

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $settings
            ]);
        }

        // Return view for web requests
        return view('admin.settings.index', compact('settings'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Create form data'
            ]);
        }

        return view('admin.settings.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string|max:255|unique:settings,key',
            'value' => 'nullable|string',
            'type' => 'required|in:text,textarea,number,boolean,image,json',
            'group' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            if (request()->expectsJson() || request()->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();
        $validated['is_active'] = $request->has('is_active');

        $setting = Setting::create($validated);

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Setting created successfully.',
                'data' => $setting
            ], 201);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Setting created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $setting
            ]);
        }

        return view('admin.settings.show', compact('setting'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $setting
            ]);
        }

        return view('admin.settings.edit', compact('setting'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Setting $setting)
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string|max:255|unique:settings,key,' . $setting->id,
            'value' => 'nullable|string',
            'type' => 'required|in:text,textarea,number,boolean,image,json',
            'group' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            if (request()->expectsJson() || request()->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();
        $validated['is_active'] = $request->has('is_active');

        $setting->update($validated);

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Setting updated successfully.',
                'data' => $setting->fresh()
            ]);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Setting updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        $setting->delete();

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Setting deleted successfully.'
            ]);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Setting deleted successfully.');
    }

    /**
     * Toggle active status
     */
    public function toggleActive(Setting $setting): JsonResponse
    {
        $setting->is_active = !$setting->is_active;
        $setting->save();

        $message = $setting->is_active ? 'Setting activated successfully.' : 'Setting deactivated successfully.';

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $setting->fresh()
            ]);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', $message);
    }

    /**
     * Get all settings for public access (admin panel without auth)
     */
    public function publicIndex()
    {
        try {
            $settings = Setting::orderBy('group')
                              ->orderBy('sort_order')
                              ->get();

            return response()->json([
                'success' => true,
                'data' => $settings,
                'message' => 'Settings loaded successfully from public endpoint'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => [],
                'message' => 'Failed to load settings: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new setting (public access)
     */
    public function publicStore(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'key' => 'required|string|max:255|unique:settings,key',
                'value' => 'nullable|string',
                'type' => 'required|in:text,textarea,number,boolean,image,json',
                'group' => 'required|string|max:255',
                'label' => 'required|string|max:255',
                'description' => 'nullable|string',
                'sort_order' => 'nullable|integer',
                'is_active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $setting = Setting::create($request->all());

            return response()->json([
                'success' => true,
                'data' => $setting,
                'message' => 'Setting created successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create setting: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a setting (public access)
     */
    public function publicUpdate(Request $request, Setting $setting)
    {
        try {
            $validator = Validator::make($request->all(), [
                'key' => 'required|string|max:255|unique:settings,key,' . $setting->id,
                'value' => 'nullable|string',
                'type' => 'required|in:text,textarea,number,boolean,image,json',
                'group' => 'required|string|max:255',
                'label' => 'required|string|max:255',
                'description' => 'nullable|string',
                'sort_order' => 'nullable|integer',
                'is_active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $setting->update($request->all());

            return response()->json([
                'success' => true,
                'data' => $setting->fresh(),
                'message' => 'Setting updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update setting: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a setting (public access)
     */
    public function publicDestroy(Setting $setting)
    {
        try {
            $setting->delete();

            return response()->json([
                'success' => true,
                'message' => 'Setting deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete setting: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle setting active status (public access)
     */
    public function publicToggle(Setting $setting)
    {
        try {
            $setting->is_active = !$setting->is_active;
            $setting->save();

            $message = $setting->is_active ? 'Setting activated successfully' : 'Setting deactivated successfully';

            return response()->json([
                'success' => true,
                'data' => $setting->fresh(),
                'message' => $message
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle setting: ' . $e->getMessage()
            ], 500);
        }
    }
}
