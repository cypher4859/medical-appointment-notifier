
export default interface IAuthenticationService {
  validateAndSetApiKey (key: string) : Promise<boolean>
  validateApiKey (key: string) : Promise<boolean>
  setApiKey (key: string) : Promise<void>
  loadApiKeyFromLocalStorage () : Promise<void>
  getApiKey () : Promise<string>
}
