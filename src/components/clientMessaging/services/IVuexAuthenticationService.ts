
export default interface IVuexAuthenticationService {
  validateApiKey (key: string) : Promise<boolean>
  setValidApiKey (key: string) : Promise<void>
  loadApiKeyFromLocalStorage () : Promise<void>
  getApiKey () : Promise<string>
}
