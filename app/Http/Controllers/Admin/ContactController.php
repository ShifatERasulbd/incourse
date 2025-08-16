<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::latest()->get();

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $contacts
            ]);
        }

        // Return view for web requests
        return view('admin.contacts.index', compact('contacts'));
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

        return view('admin.contacts.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:500',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'working_hours' => 'required|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'map_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'is_active' => 'boolean'
        ]);

        // Handle banner image upload
        if ($request->hasFile('banner_image')) {
            $imagePath = $request->file('banner_image')->store('contact-banners', 'public');
            $validated['banner_image'] = $imagePath;
        }

        // If this contact is set to active, deactivate all others
        if ($validated['is_active'] ?? false) {
            Contact::where('is_active', true)->update(['is_active' => false]);
        }

        $contact = Contact::create($validated);

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Contact information created successfully.',
                'data' => $contact
            ], 201);
        }

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact information created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $contact
            ]);
        }

        return view('admin.contacts.show', compact('contact'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $contact
            ]);
        }

        return view('admin.contacts.edit', compact('contact'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:500',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'working_hours' => 'required|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'map_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'is_active' => 'boolean'
        ]);

        // Handle banner image upload
        if ($request->hasFile('banner_image')) {
            // Delete old image if exists
            if ($contact->banner_image && Storage::disk('public')->exists($contact->banner_image)) {
                Storage::disk('public')->delete($contact->banner_image);
            }

            $imagePath = $request->file('banner_image')->store('contact-banners', 'public');
            $validated['banner_image'] = $imagePath;
        }

        // If this contact is set to active, deactivate all others
        if ($validated['is_active'] ?? false) {
            Contact::where('id', '!=', $contact->id)
                   ->where('is_active', true)
                   ->update(['is_active' => false]);
        }

        $contact->update($validated);

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Contact information updated successfully.',
                'data' => $contact->fresh()
            ]);
        }

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact information updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        // Delete banner image if exists
        if ($contact->banner_image && Storage::disk('public')->exists($contact->banner_image)) {
            Storage::disk('public')->delete($contact->banner_image);
        }

        $contact->delete();

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Contact information deleted successfully.'
            ]);
        }

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact information deleted successfully.');
    }

    /**
     * Toggle active status
     */
    public function toggleActive(Contact $contact)
    {
        if (!$contact->is_active) {
            // Deactivate all other contacts
            Contact::where('id', '!=', $contact->id)->update(['is_active' => false]);
            $contact->update(['is_active' => true]);
            $message = 'Contact information activated successfully.';
        } else {
            $contact->update(['is_active' => false]);
            $message = 'Contact information deactivated successfully.';
        }

        // Return JSON for API requests
        if (request()->expectsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $contact->fresh()
            ]);
        }

        return redirect()->route('admin.contacts.index')
            ->with('success', $message);
    }
}
