@echo off
echo Preparing application for Heroku deployment...

REM Ensure data directory exists
mkdir data 2>nul
mkdir dist\data 2>nul

REM Copy JSONL data files to the data directories
echo Copying JSONL data files...
copy attached_assets\*.jsonl data\
copy attached_assets\*.jsonl dist\data\

REM Create Heroku specific files if they don't exist
if not exist Procfile (
  echo Creating Procfile...
  echo web: node heroku-server.cjs > Procfile
)

if not exist .node-version (
  echo Creating .node-version file...
  echo 20.x > .node-version
)

echo Creating Heroku-specific files...
REM Create a .npmrc file to include dev dependencies during install
echo include=dev > .npmrc

echo Preparation complete! Your application is ready for Heroku deployment.
echo.
echo Next steps:
echo 1. Create a Heroku app: heroku create
echo 2. Add buildpack: heroku buildpacks:set heroku/nodejs
echo 3. Deploy to Heroku: git push heroku main
echo 4. Open your app: heroku open