<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AboutUs extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'about_us';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'banner_image_path',
        'main_text',
        'main_image_path',
        'section_title',
        'show_banner',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'show_banner' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Get the active about us content
     */
    public static function getActive()
    {
        return self::where('is_active', true)->first();
    }
}
