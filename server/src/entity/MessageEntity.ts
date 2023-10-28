import { Role, Status } from "../models";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("messages")
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  to: UserEntity;

  @Column({ type: 'text' })
  subject: string;

  @Column({ type: 'longtext' })
  description: string;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
