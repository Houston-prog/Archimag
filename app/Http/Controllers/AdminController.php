<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function showaccount(): Response
    {
        $accounts = User::paginate(10);

        return Inertia::render('Administration/ListAccount', [
            'lists' => $accounts
        ]);
    }

    /**
     * Display a listing of users to manage passwords.
     */
    public function passwordRequests(Request $request): Response
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Administration/Securite/Password', [
            'users' => $users,
            'searchParams' => $request->all(),
        ]);
    }

    /**
     * Show the form for editing the specified user's password.
     */
    public function showPasswordForm(User $user): Response
    {
        return Inertia::render('Administration/Securite/EditPassword', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified user's password in storage.
     */
    public function updatePassword(Request $request, User $user)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        return redirect()->route('admin.password.requests')->with('success', 'Mot de passe mis à jour avec succès.');
    }

    /**
     * Display a listing of suspicious connections.
     * NOTE: In a real application, this data should be collected by listening
     * to the Illuminate\Auth\Events\Failed event and storing attempts in a database.
     * An external service would be needed to get location data from an IP address.
     */
    public function suspiciousConnections(Request $request): Response
    {
        // Fake data for demonstration purposes
        $suspiciousConnections = collect([
            [
                'ip_address' => '192.168.1.10',
                'hostname' => @gethostbyaddr('192.168.1.10'),
                'location' => 'Réseau Local',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'attempts' => 5,
                'last_attempt_at' => now()->subMinutes(10)->toDateTimeString(),
            ],
            [
                'ip_address' => '203.0.113.45',
                'hostname' => @gethostbyaddr('203.0.113.45'),
                'location' => 'Inconnue (Service externe requis)',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'attempts' => 12,
                'last_attempt_at' => now()->subHours(2)->toDateTimeString(),
            ],
        ]);

        // In a real app, you would paginate the results from the database:
        // $suspiciousConnections = SuspiciousConnection::latest()->paginate(15);

        return Inertia::render('Administration/Securite/Suspicious', [
            'suspiciousConnections' => $suspiciousConnections,
        ]);
    }
}
