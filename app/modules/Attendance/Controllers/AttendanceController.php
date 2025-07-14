<?php

namespace Modules\Attendance\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Modules\Attendance\Models\Attendance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attendances = Attendance::with('user');

        $attendances = match ($request->filter) {
            'user' => $attendances->whereHas('user', function ($query) use ($request) {
                if (!is_null($request->search)) {
                    $query->where('name', 'like', "%$request->search%");
                }
            }),
            // 'clocked_in' => $attendances->where('clock_in_time', function ($query) use ($request) {
            //     $query->where('name', 'like', "%$request->search%");
            // }),
            default => $attendances,
        };

        $attendances = $attendances->orderBy('updated_at', 'desc')
            ->with('user')
            ->paginate(50)
            ->withQueryString()
            ->onEachSide(2);

        return Inertia::render('attendance/list', compact('attendances'));
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'attendee' => 'required',
        ]);

        $user = User::whereMemberId($validated['attendee'])->first();

        if (!$user) {
            return back()->withErrors(['attendee' => 'Incorrect Member ID']);
        }

        $attendance = $user->attendances()->whereClockOutTime(null)->latest()->first();

        if (!$attendance) {
            $attendance = $user->attendances()->create(
                [
                    ...collect($validated)->except('attendee'),
                    "clock_in_time" => now()
                ]
            );

            $message = 'Success! You have clocked in';
            $clockStatus = 'in';
        } else {
            $attendance->update(["clock_out_time" => now()]);
            $message = 'Success! You have clocked out';
            $clockStatus = 'out';
        }


        if (!$attendance) {
            return back()->withErrors("attendance", "error creating attendance");
        }

        return Inertia::render('attendance/cico', compact('message', 'clockStatus'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        $validated = $request->validate([
            'attendee' => 'required',
            'clock_in_time' => 'date',
            'clock_out_time' => 'date',
        ]);

        $attendance = $attendance->update($validated);

        if (!$attendance) {
            return response()->json([
                'message' => 'error updating attendance',
                'status' => 'error',
            ], 500);
        }

        return response()->json([
            'message' => 'attendance updated successfully',
            'status' => 'success',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}
