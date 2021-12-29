
export default interface IAuthenticationService {
  submitApiKey (key: string) : Promise<void>
  loadApiKeyFromLocalStorage () : Promise<void>
  getApiKey () : Promise<string>
}
