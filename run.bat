@echo off
set "ROOT=%~dp0"

REM Start Docker containers (detached)
cd /d "%ROOT%backend"
docker compose up -d

REM First-run installs (only runs if node_modules is missing)
if not exist "%ROOT%frontend\user\node_modules" (
    echo Installing frontend-user dependencies...
    pushd "%ROOT%frontend\user"
    call npm install
    popd
)

if not exist "%ROOT%frontend\admin\node_modules" (
    echo Installing frontend-admin dependencies...
    pushd "%ROOT%frontend\admin"
    call npm install
    popd
)

REM Launch each long-running process in its own window
start "Backend" cmd /k "cd /d "%ROOT%backend" && .\mvnw spring-boot:run"
start "Frontend - User" cmd /k "cd /d "%ROOT%frontend\user" && npm run dev"
start "Frontend - Admin" cmd /k "cd /d "%ROOT%frontend\admin" && npm run dev"