import {NotificationManager} from "react-notifications";

class GlobalSetting {
    constructor() {

        //setting global URL

        this.url = 'http://10.0.28.126:90/api/';

    }

    // Call for Notification
    createNotification = (type,msg) => {

        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('Success message', msg);
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                NotificationManager.error('Error message', 'Click me!', 5000, () => {
                    alert('callback');
                });
                break;
        }
        // return true;

    };
}
export default (new GlobalSetting);