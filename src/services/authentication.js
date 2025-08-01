import { endPoints, requestType } from '../constants/index';
import Api from './index';

export const sendOtp = params => {
    return Api(endPoints.otp, params, requestType.POST);
};