import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IApiPatientService from '@/components/clientMessaging/services/IApiPatientService'

const patientDataMockData = require('@/assets/MockPatientData.json')

@injectable()
export default class ApiPatientService extends Vue implements IApiPatientService {
  async getListOfPatientsFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return patientDataMockData
      })
  }
}
