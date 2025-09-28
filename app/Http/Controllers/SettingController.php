<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => [
                'general' => Setting::getSection('general'),
                'store'   => Setting::getSection('store'),
                'contact' => Setting::getSection('contact'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingRequest $request)
    {
        $section = $request->query('section');

        $validated = $request->validate([
            'data' => 'required|array',
        ]);

        Setting::setSection($section, $validated['data']);

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $section)
    { // Grab only the section being updated
        $data = $request->input($section, []);
        // Update key/value settings for that section
        Setting::setSection($section, $data);

        return redirect()->back()->with('success', ucfirst($section) . ' settings updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
    public function reset(Request $request, string $section)
    {
        Setting::resetSection($section);
        return redirect()->back()->with('success', "Settings for '{$section}' reset.");
    }
}
