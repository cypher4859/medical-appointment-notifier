import ApiReturnStatusStates from '../services/ApiReturnStatusStates'

export default interface IApiStatus {
  status: ApiReturnStatusStates
  message: string
  object: object
}
