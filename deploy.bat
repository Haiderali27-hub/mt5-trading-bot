@echo off
echo Building Trading Bot Website...
call npm run build

echo.
echo Build completed! 
echo.
echo Deployment Options:
echo 1. Drag and drop the 'dist' folder to netlify.com
echo 2. Or run: npx netlify-cli deploy --prod --dir=dist
echo.
echo Local preview running at: http://localhost:4173/
echo.
pause