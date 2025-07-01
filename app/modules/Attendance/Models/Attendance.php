<?php

namespace Modules\Attendance\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    /** @use HasFactory<\Database\Factories\AttendanceFactory> */
    use HasFactory;

    protected $fillable = [
        'attendee',
        'clock_in_time',
        'clock_out_time',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'attendee');
    }
}
