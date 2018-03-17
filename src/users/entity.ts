import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import Game from "../games/entity";

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(3)
  @Column('text', {nullable:false})
  username: string

  @IsEmail()
  @Column('text', {nullable:false})
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', {nullable:false})
  @Exclude({toPlainOnly:true})
  password: string

  @ManyToMany(type => Game)
  @JoinTable()
  games: Game[]

  async setPassword(rawPassword: string) {
    this.password = await bcrypt.hash(rawPassword, 10)
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}