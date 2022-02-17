import axios, {setAuthToken} from './axios';
import EndPoint,{APPMODULEID} from '../const/config';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import {measureConnectionSpeed} from 'react-native-network-bandwith-speed';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

var tok = null;

AsyncStorage.getItem("userToken").then((res)=>{
  tok = JSON.parse(res)
})

const getNetworkBandwidth = async () => {
  try {
    const NetworkBandwidthTestResults = await measureConnectionSpeed();
    // let data = JSON.stringify(NetworkBandwidthTestResults);
    //  console.log("Speeed ===>>" + NetworkBandwidthTestResults);
    return NetworkBandwidthTestResults;
  } catch (err) {
    console.log(err);
  }
};
const netinfo = () =>
  NetInfo.fetch().then(state => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    return {isConnected: state.isConnected, type: state.type};
  });
// export const makeAPICall = (endPoint, param, UserID , token) => {
  export const makeAPICall = async(endPoint, param, UserID) => {
    let a = await AsyncStorage.getItem('ApiBlocked');
    let allowCall= JSON.parse(a);
    const iInfo = await netinfo();

  if (iInfo.isConnected == false) {
    console.log('No Connection');
  
    Toast.show({
      text1: 'No Internet',
      type: 'error',
      visibilityTime: 2000,
      autoHide: false,
      position: 'bottom'

    });

    
  } else {
   
     Toast.hide();

    // console.log('connected');
    const testSpeed = await getNetworkBandwidth();
    // console.log(testSpeed.speed);
    if (testSpeed.speed < 1) {
      console.log('Bandwidth too slow');
      Toast.show({
        type: 'info',
        text1: 'Check Your Internet Connection',
        position: 'bottom'
      });
    } else {
           Toast.hide();
    let headers={
      headers:{
        "AppModuleID":APPMODULEID,
        "AppVersion":DeviceInfo.getVersion(),
        "Token":tok,
        "UserID":UserID,
        "DeviceID":DeviceInfo.getUniqueId()
      }
    }
    if(allowCall == false){ 
    const finalPromise = new Promise((res, rej) => {
      axios
        .post(endPoint, param,headers)
        .then(response => {
          //console.log('[magic func]: success case', response.data);
          //checking if we have 200 response
          if (response.data.StatusCode == 200) {
            // console.log('[magic func] req resolve response 200 =======>');
            res(response);
          }
          else if (response.data.StatusCode == 500) {
            // console.log('[magic func] req resolve response 500 =======>');
            res(response);
          }
          else if (response.data.StatusCode == 601) {
            // console.log('[magic func] req resolve response 601 =======>');
            res(response);
          }  
           else if (response.data.StatusCode == 401) {
            console.log('[magic func] ====> token expire');
            getNewToken(UserID)
              .then(() => {
                console.log(
                  '[magic func] =====> recive new token and making http call again',
                );
  
                //making the call again
                retryCall(endPoint, param,headers).then(retryResponse => {
                  console.log(
                    '[magic function] return response ===>',
                    retryResponse,
                  );
                  res(retryResponse);
                });
              })
              .catch(error => {
                rej(error);
              });
          } else {
            //TODO 401 and more shit promise reject
          }
        })
        .catch(error => {
          //TODO  finalPromise main promise reject krna he
          rej(error);
        });
    });
  
    return finalPromise;
  } 
  else console.log(allowCall, "no hit dataaa")
  };
  }
}
  const getNewToken = UserID => {
    let config = {
      headers: {
        UserID: UserID,
      },
    };
  
    let data = {}
    const makeNewTokenPromise = new Promise((resolve, reject) => {
      axios
        .post(EndPoint.UPDATE_TOKEN, data, config)
        .then(res => {
          console.log('[magic func] new token ====>function' , res.data.Token);
          AsyncStorage.setItem("userToken",JSON.stringify(res.data.Token));
          setAuthToken(res.data.Token, UserID);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  
    return makeNewTokenPromise;
  };
  
  const retryCall = (endPoint, param) => {
    const retryCallPromise = new Promise((resolve, reject) => {
      axios
        .post(endPoint, param)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  
    return retryCallPromise;
  };
