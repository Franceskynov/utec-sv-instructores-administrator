// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  CONTROL_URL_API: 'http://localhost/api/v1/',
  // CONTROL_URL_API: window.location.protocol + '//' + window.location.host + '/',
  MESSAGES: {
    SERVICE_ERROR: 'Error al conectarse al servicio',
    SERVICE_WARN: '',
    WARN: 'Advertencia',
    SERVICE_OK: '',
    DELETION_OK: 'El registro se realizo exitosamente',
    UPDATED_OK: 'La actualizacion se realizo exitosamente',
    FILE_TRANSFORMED_OK: 'El archivo se convirtio correctamente',
    CREATED_OK: 'El registro se creo exitosamante',
    MODIFIED_OK: 'El registro se modifico exitosamante',
    UPLOAD_SUCCESS: 'El archivo ha sido cargado',
    SERVER_ERROR: 'Error al conectarse al servidor',
    MULTIPLE_FILES_ERROR: 'At the moment multiple files can not be processed',
    FILES_ERROR: 'Ningun archivo ha sido cargado para procesar',
    DOCUMENT_FORMAT_ERROR : 'La tabla no cumple con el formato de columnas establecido',
    ERROR: 'Error',
    OK: 'Ok'
  },
  MAX_RESULTS_PER_PAGE: 6,
  TOASTER_TIMEOUT: 2000,
  PREVENT_DUPLICATES: true,
  MAX_ROWS_PER_PAGE: 10,
  IDLE_SETTINGS: {
    IDLE: 3 * 60,
    TIMEOUT: 10,
    PING: 5,
  },
  copy: '\u0046\u0072\u0061\u006e\u0063\u0065\u0073\u006b\u0079\u006e\u006f\u0076'
};
