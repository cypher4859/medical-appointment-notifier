
export default interface IVuexAuthenticationService {
  validateApiKey (key: string) : Promise<boolean>
  loadApiKeyFromLocalStorage () : Promise<void>
  getApiKey () : Promise<string>
}
