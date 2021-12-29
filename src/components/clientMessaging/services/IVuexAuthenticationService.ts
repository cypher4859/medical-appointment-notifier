
export default interface IVuexAuthenticationService {
  submitApiKey (key: string) : Promise<void>
  loadApiKeyFromLocalStorage () : Promise<void>
  getApiKey () : Promise<string>
}
