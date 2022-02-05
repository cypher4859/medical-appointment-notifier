import IPatientClientDatabaseService from './IPatientClientDatabaseService'
import IPatientDatabaseJconnService from './IPatientDatabaseJconnService'
import IPatientDatabaseOdbcService from './IPatientDatabaseOdbcService'

export default interface IPatientDatabaseService extends IPatientClientDatabaseService {
  getDatabaseEnvironmentService () : IPatientDatabaseOdbcService|IPatientDatabaseJconnService|undefined
}
