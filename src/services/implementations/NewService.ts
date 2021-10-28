import INewInterface from '@/types/INewType'
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NewService extends Vue implements INewInterface {
}
