<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>InCourses Admin Panel</title>
    @vite(['resources/css/app.css', 'resources/js/admin-entry.jsx'])
</head>
<body>
    <div id="admin-root"></div>
</body>
</html>
