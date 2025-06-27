<?php

namespace Modules\Attendance\Traits;

use Modules\Attendance\Models\Attendance;

trait HasAttendance
{
    /**
     * Get all attendance records associated with the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany A collection of Attendance model instances.
     */
    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'attendee');
    }
}
