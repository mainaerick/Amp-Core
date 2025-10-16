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

    public static function getSection(string $section): array
    {
        return self::where('section', $section)
            ->pluck('value', 'key')
            ->toArray();
    }

    public static function setSection(string $section, array $data): void
    {
        foreach ($data as $key => $value) {
            self::updateOrCreate(
                ['section' => $section, 'key' => $key],
                ['value' => $value]
            );
        }
    }

    public static function resetSection(string $section): void
    {
        self::where('section', $section)->delete();
    }
    public static function get(string $key, $default = null)
    {
        return Cache::rememberForever("setting_{$key}", function () use ($key, $default) {
            return self::where('key', $key)->value('value') ?? $default;
        });
    }
}
