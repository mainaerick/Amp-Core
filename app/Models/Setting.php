<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    /** @use HasFactory<\Database\Factories\SettingFactory> */
    use HasFactory;

    protected $fillable = ['section', 'key', 'value'];

    protected $casts = [
        'value' => 'array', // store as JSON
    ];

    public $timestamps = false;

    /**
     * Boot the model and clear cache on save/delete
     */
    protected static function boot()
    {
        parent::boot();

        static::saved(function ($setting) {
            // Clear cache for the specific key that was updated
            Cache::forget("setting_{$setting->key}");
            // Also clear the section cache if you add section caching
            Cache::forget("settings_section_{$setting->section}");
        });

        static::deleted(function ($setting) {
            Cache::forget("setting_{$setting->key}");
            Cache::forget("settings_section_{$setting->section}");
        });
    }

    public static function getSection(string $section): array
    {
        return Cache::rememberForever("settings_section_{$section}", function () use ($section) {
            return self::where('section', $section)
                ->pluck('value', 'key')
                ->toArray();
        });
    }

    public static function setSection(string $section, array $data): void
    {
        foreach ($data as $key => $value) {
            self::updateOrCreate(
                ['section' => $section, 'key' => $key],
                ['value' => $value]
            );
        }

        // Clear section cache after bulk update
        Cache::forget("settings_section_{$section}");
    }

    public static function resetSection(string $section): void
    {
        self::where('section', $section)->delete();
        Cache::forget("settings_section_{$section}");
    }

    public static function get(string $key, $default = null)
    {
        return Cache::rememberForever("setting_{$key}", function () use ($key, $default) {
            return self::where('key', $key)->value('value') ?? $default;
        });
    }

    /**
     * Clear all settings cache
     */
    public static function clearCache(): void
    {
        // Clear all setting caches by pattern
        $keys = self::pluck('key')->toArray();
        foreach ($keys as $key) {
            Cache::forget("setting_{$key}");
        }

        // Clear all section caches
        $sections = self::distinct()->pluck('section')->toArray();
        foreach ($sections as $section) {
            Cache::forget("settings_section_{$section}");
        }
    }
}
