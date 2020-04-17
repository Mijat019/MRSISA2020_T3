enum RequestStatus {
    /**Patient made a request or clinic admin added a new doctor */
    PENDING,
    /** Clinic center admin approved patient request */
    APPROVED,
    /** Clinic center admin rejected patient request */
    REJECTED,
  }
  
  export default RequestStatus;