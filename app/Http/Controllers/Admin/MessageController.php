<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::latest()->get();
        return response()->json(['success' => true, 'data' => $messages]);
    }

    public function show($id)
    {
        $message = Message::findOrFail($id);
        return response()->json(['success' => true, 'data' => $message]);
    }

    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();
        return response()->json(['success' => true, 'message' => 'Message deleted successfully.']);
    }
}
