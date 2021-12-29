
export default interface IAuthenticationService {
  validateApiKey (key: string) : Promise<boolean>
  loadApiKeyFromLocalStorage () : Promise<void>
  getApiKey () : Promise<string>
}
