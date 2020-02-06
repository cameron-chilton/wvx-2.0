import axios from "axios";
// import queryString from "qs";
//import * as errors from "../constants/ErrorTypes";

export const instance = axios.create({
  baseURL: window.apiUrl ? window.apiUrl : "/cprs-api/v1",
});

/**
 * Decision Support Tool's main API for communicating with
 * the back-end services.
 *
 * In order to provide the desired UX this API will serve as the
 * orchestrator of the various calls to the resources DST will need
 * to obtain information from.
 *
 * -------------------------------------------------------------------
 * Whereas in a traditional setup we would typically call out to the
 * back-end, wait for it to handle calling each service separately,
 * aggregate the data, and finally respond to us. All the while the UI
 * would be showing the user a nice loading indicator of some sort.
 *
 * Instead, now, we need to show a separate loading spinner for each
 * external service the back-end will be doing the actual talking with.
 * So, to that end this API will serve as the orchestrator to kick off
 * each of these back-end calls. Each individual getter below will then
 * be able to track the loading status independently and correctly show
 * the loading spinners as is desired.
 */
class LiveApi {

  /**
   * Starts the initial data load for the UI and recieves the
   * consult/veteran data needed for the getVetIcn call.
   *
   * @param {string} gameID DST's internal identifier for this consult
   */
  static startDataLoad(gameID) {
    return new Promise( (resolve, reject) => {
      if (gameID && gameID.length > 1) {
        instance.get(`/getDstConsultInfo/${gameID}`)
          .then( (response) => {
            if (response.data) {
              resolve(response.data);
            } else {
              reject();
            }
          })
          .catch( (error) => {
            reject(error);
          });
      }
    });
  }

  /**
   * Take the veteran's data from the consult information retrieved
   * previously and request their ICN.
   *
   * @param {object} vetInfo An object made up of the indentifying information
   *                  of the veteran in question
   *  e.g.
   *      { name: {first, middle, last, suffix}, dob, ssn, gender }
   */
  static getVetIcn(vetInfo, gameID) {
    return new Promise( (resolve, reject) => {
      instance.defaults.headers["dstID"] = gameID;
      instance.post("/getDstPatientIdentifier", vetInfo)
        .then( (response) => {
          // parse out response
          if (response.data) {
            resolve(response.data);
          } else {
            reject(errors.GET_BLANK_HTTP_RESPONSE);
          }
        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

  /**
   * Obtain the veteran's residential address and eligibility
   * information for community care.
   *
   * @param {string} icn The veteran's unique ID
   */
  static getAddrAndElig(icn, gameID) {
    return new Promise( (resolve, reject) => {
      instance.defaults.headers["dstID"] = gameID;
      instance.get(`/getDstPatientDemographics/${icn}`)
        .then( (response) => {
          // parse out response
          if (response.data) {
            // validate response first

            resolve(response.data);
          } else {
            reject(errors.GET_BLANK_HTTP_RESPONSE);
          }
        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

  /**
   * Obtain a listing of facilities and providers near the veteran.
   * Data is pulled from PPMS and CDW.
   *
   * @param {object} vetAddress Veteran address object.
   *  (Shape: { address: line1, city, state, zipcode, lat, lng })
   * @param {string} gameID DST Consult ID this query is for
   * @param {string} svcName Clinical service name to filter by
   * @param {string} stopCode Stop code for the clinical service
   */
  static getFacilityInfo(vetAddress, gameID, svcName=null, stopCode=null) {
    return new Promise( (resolve, reject) => {
      const addrObj = {
        address: vetAddress,
        svcName,
        stopCode,
      };
      // const addrObj = queryString.stringify(vetAddress);
      instance.defaults.headers["dstID"] = gameID;
      instance.post("/getFacilities", addrObj)
        .then( (response) => {
          if (response.data) {
            resolve(response.data);
          }
        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

  static getConsultServices() {
    return new Promise( (resolve, reject) => {
      instance.get("/dstClinicalServiceList")
        .then( (response) => {
          if (response.data) {
            resolve(response.data);
          }
        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

  /**
   * Gets a subset of all SEOCs based upon the given service name.
   *
   * @param {string} svcName The Service Name for this Consult
   *                 (from consultInfo.clinicalSvc.svcName)
   */
  static getSeocsForService(svcName) {
    return new Promise( (resolve, reject) => {
      if (svcName && svcName.length > 0) {
        const urlSafeName = encodeURIComponent(svcName);
        instance.get(`getDstSeocs/${urlSafeName}`)
          .then( (response) => {
            if (response.data) {
              resolve(response.data);
            }
          })
          .catch( (error) => {
            reject(error);
          });
      }
    });
  }

  /**
   * Gets all previously saved DST-specific fields in order to restore
   * the form to it's previous state.
   *
   * @param {string} id DST ID to look for to reload from DB
   */
  static restoreDecision(id) {
    return new Promise( (resolve, reject) => {
      if (id) {
        instance.get(`loadDst/${id}`)
          .then( response => {
            if (response.data) {
              resolve(response.data);
            }
          })
          .catch( error => {
            reject(error);
          });
      }
    });
  }

  /**
   * Send out the completed form to CTB/DST database
   */
  static saveDecision(bundle) {
    return new Promise( (resolve, reject) => {
      if (bundle) {
        instance.post("/saveDst", bundle)
          .then( response => {
            if (response.status === 200) {
              resolve();
            } else {
              reject("Non-Success response from API. Considering as ERROR!");
            }
          })
          .catch( error => {
            reject(error);
          });
      } else {
        const rejectObj = {
          bundle,
          errorMsg: "Invalid/Null save bundle recieved! Check save data.",
        };
        reject(rejectObj);
      }
    });
  }
}

export default LiveApi;
