import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from 'typeorm'
import { BaseEntity } from "typeorm/repository/BaseEntity";
import User from "../../users/entity";

@Entity()
export default class Winner extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @OneToOne(type => User)
  @JoinColumn()
  user: User

  @Column('text', {nullable:false})
  class: string

}