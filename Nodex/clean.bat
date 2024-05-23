@echo off

rem Ruta de la carpeta a borrar
set "folder_path=.webjs_auth"

rem Verificar si la carpeta existe
if exist "%folder_path%" (
    rem Borrar la carpeta
    rmdir /s /q "%folder_path%"
    echo Carpeta .webjs_auth eliminada con éxito.
) else (
    echo La carpeta .webjs_auth no existe.
)
