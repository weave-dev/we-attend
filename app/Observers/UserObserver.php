<?php

namespace App\Observers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;

class UserObserver implements ShouldHandleEventsAfterCommit
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        //
        // Format: {year}-{day}-00{id}
        // Carbon::now()->format('Y') gets the current year (e.g., 2025)
        // Carbon::now()->dayOfYear gets the day of the year (1-366)
        // str_pad adds leading zeros to the ID
        $year = Carbon::now()->format('y');
        $month = Carbon::now()->monthOfYear; // Day of the year (1 to 365/366)

        // Pad day to 3 digits if needed, though for dayOfYear it's fine
        // If you meant day of month, use ->format('d') and pad to 2
        // updated to 4 digits
        $formattedMonth = str_pad($month, 2, '0', STR_PAD_LEFT); // e.g., 001, 010, 100

        // Format the ID part to 3 digits (e.g., 001, 010, 100)
        // You might adjust the '3' based on your expected max users
        $formattedId = str_pad($user->id, 4, '0', STR_PAD_LEFT);

        $user->member_id = "{$year}-{$formattedMonth}-{$formattedId}";
        $user->save(); // Save the model again to update the member_id
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
