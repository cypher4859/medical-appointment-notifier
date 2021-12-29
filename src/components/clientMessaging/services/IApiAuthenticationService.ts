
export default interface IApiAuthenticationService {
  validateApiKey (key: string) : Promise<boolean>
}
