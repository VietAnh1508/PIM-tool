import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const AlertType = {
    Success: 'Success',
    Error: 'Error',
    Info: 'Info',
    Warning: 'Warning'
};

export interface AlertOption {
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
}

export interface Alert {
    id?: string;
    message: string;
    type: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
}

function onAlert(id = defaultId) {
    return alertSubject
        .asObservable()
        .pipe(filter((x: any) => x && x.id === id));
}

function success(message: string, options?: AlertOption) {
    alert({ message, type: AlertType.Success, ...options });
}

function error(message: string, options?: AlertOption) {
    alert({ message, type: AlertType.Error, ...options });
}

function info(message: string, options?: AlertOption) {
    alert({ message, type: AlertType.Info, ...options });
}

function warn(message: string, options?: AlertOption) {
    alert({ message, type: AlertType.Warning, ...options });
}

function alert(alert: Alert) {
    alert.id = alert.id || defaultId;
    alert.autoClose = alert.autoClose ?? true;
    alertSubject.next(alert);
}

function clear(id = defaultId) {
    alertSubject.next({ id });
}

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
};
