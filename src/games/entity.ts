import {Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm'
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Winner from './winner/entity'
import Loser from './loser/entity'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @OneToOne(type => Winner, {
    eager: true
  })
  @JoinColumn()
  winner: Winner

  @OneToOne(type => Loser, {
    eager: true
  })
  @JoinColumn()
  loser: Loser

}