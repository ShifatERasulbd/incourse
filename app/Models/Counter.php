<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Counter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'label',
        'value',
        'suffix',
        'icon',
        'icon_type',
        'icon_color',
        'order',
        'is_active',
        'animation_duration',
        'animation_delay',
        'animation_easing',
        'category',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'value' => 'integer',
        'order' => 'integer',
        'animation_duration' => 'integer',
        'animation_delay' => 'integer',
    ];

    /**
     * Scope for active counters
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for ordered counters
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    /**
     * Scope for filtering by category
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Get available categories
     */
    public static function getCategories()
    {
        return self::whereNotNull('category')
                   ->distinct()
                   ->pluck('category')
                   ->filter()
                   ->sort()
                   ->values();
    }
}
