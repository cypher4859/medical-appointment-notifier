
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'
import { inject, injectable } from 'inversify-props'

@injectable()
export default class ChildService extends Vue {
}
