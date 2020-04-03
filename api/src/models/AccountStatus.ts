enum AccountStatus {
  /**Patient made a request or clinic admin added a new doctor */
  PENDING,
  /** Clinic center admin approved patient request */
  APPROVED,
  /** Clinic center admin rejected patient request */
  REJECTED,
  /** Patient clicked on activation link or Doctor changed his password  */
  ACTIVATED
}

export default AccountStatus;
