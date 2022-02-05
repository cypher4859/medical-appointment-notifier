import type IAppointment from '../types/IAppointment'
import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import IPatientClientDatabaseService from './IPatientClientDatabaseService'
import IPatientDatabaseService from './IPatientDatabaseService'

export default interface IPatientDatabaseOdbcService extends IPatientClientDatabaseService {
}
