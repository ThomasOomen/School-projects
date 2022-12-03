<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function employee_index() {
        $users = User::all();

        return view('employee_crud/employee_index', ['users' => $users]);
    }

    public function employee_create() {
        $roles = Role::all();

        return view('employee_crud/employee_create', ['roles' => $roles]);
    }

    public function employee_store(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role_id = $request->role;

        $user->save();

        return redirect(url('employee-index'));
    }

    public function employee_edit($id) {
        $user = User::where('id', $id)->first();
        $roles = Role::all();

        return view('employee_crud/employee_edit', ['user' => $user, 'roles' => $roles]);
    }

    public function employee_update(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);

        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $request->role;

        $user->save();

        return redirect(url('employee-index'));
    }

    public function employee_destroy($id) {
        User::destroy($id);
        return redirect(url('employee-index'));
    }
}
