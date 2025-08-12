<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'title',
        'description',
        'address',
        'phone',
        'email',
        'working_hours',
        'banner_image',
        'map_url',
        'facebook_url',
        'twitter_url',
        'linkedin_url',
        'instagram_url',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Scope to get only active contact info
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the active contact information
     */
    public static function getActive()
    {
        return self::active()->first();
    }
}
