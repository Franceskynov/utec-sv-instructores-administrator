export const environment = {
  production: true,
  CONTROL_URL_API: window.location.protocol + '//' + window.location.host + '/api/v1/',
  MESSAGES: {
    SERVICE_ERROR: 'Error al conectarse al servicio',
    SERVICE_WARN: '',
    WARN: 'Advertencia',
    SERVICE_OK: '',
    DELETION_OK: 'El registro se realizo exitosamente',
    UPDATED_OK: 'La actualizacion se realizo exitosamente',
    FILE_TRANSFORMED_OK: 'El archivo se convirtio correctamente',
    CREATED_OK: 'El registro se creo exitosamante',
    UPLOAD_SUCCESS: 'El archivo ha sido cargado',
    SERVER_ERROR: 'Error al conectarse al servidor',
    MULTIPLE_FILES_ERROR: 'At the moment multiple files can not be processed',
    FILES_ERROR: 'Ningun archivo ha sido cargado para procesar',
    DOCUMENT_FORMAT_ERROR : 'La tabla no cumple con el formato de columnas establecido'
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
