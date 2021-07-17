import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import {
    alertService,
    Alert as IAlert,
    AlertType
} from '../service/alertService';

export interface Props {
    id?: string;
    fade?: boolean;
}

const Alert: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService
            .onAlert(props.id)
            .subscribe((alert: IAlert) => {
                if (alert.message) {
                    // add alert to array
                    setAlerts((alerts) => [...alerts, alert]);

                    // auto close alert if required
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                } else {
                    // clear alerts when an empty alert is received
                    setAlerts((alerts) => {
                        const filteredAlerts = alerts.filter(
                            (x: IAlert) => x.keepAfterRouteChange
                        );

                        filteredAlerts.forEach(
                            (x: IAlert) => delete x.keepAfterRouteChange
                        );
                        return filteredAlerts;
                    });
                }
            });

        // clear alerts on location change
        const historyUnlisten = history.listen(() => {
            alertService.clear(props.id);
        });

        return () => {
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    const removeAlert = (alert: IAlert) => {
        if (props.fade) {
            const alertWithFade = { ...alert, fade: true };
            setAlerts((alerts) =>
                alerts.map((x) => (x === alert ? alertWithFade : x))
            );

            // remove alert after fade out
            setTimeout(() => {
                setAlerts((alerts) =>
                    alerts.filter((x) => x !== alertWithFade)
                );
            }, 250);
        } else {
            // remove alert
            setAlerts((alerts) => alerts.filter((x) => x !== alert));
        }
    };

    const getCssClasses = (alert: IAlert) => {
        if (!alert) {
            return;
        }

        const classes = ['alert', 'alert-dismissible'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        };

        classes.push(alertTypeClass[alert.type]);

        if (props.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    };

    return (
        <div className='container'>
            <div className='m-3'>
                {alerts.map((alert, index) => (
                    <div
                        key={index}
                        className={getCssClasses(alert)}
                        role='alert'
                    >
                        <span
                            dangerouslySetInnerHTML={{ __html: alert.message }}
                        ></span>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='alert'
                            aria-label='Close'
                            onClick={() => removeAlert(alert)}
                        ></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Alert;
