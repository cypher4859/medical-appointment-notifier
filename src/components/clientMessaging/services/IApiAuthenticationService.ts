
export default interface IApiAuthenticationService {
  submitApiKey (key: string) : Promise<boolean>
}
