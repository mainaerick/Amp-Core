<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'app' => [
                'name' => Setting::get('storeName', config('app.name')),
                'description' => Setting::get('storeDescription', 'Your premier destination for high-quality audio equipment since 2005.'),
                'logo' => Setting::get('site_logo'),
                'contact' => [
                    'email' => Setting::get('email'),
                    'phone' => Setting::get('phone'),
                    'address' => Setting::get('address'),
                ],
                'store_currency' => Setting::get('currency', 'USD'),
                'mapEmbed'=> Setting::get('mapEmbed'),
            ],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
